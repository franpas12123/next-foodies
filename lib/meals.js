import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import { createWriteStream } from 'node:fs'

const db = sql('meals.db')

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const query = 'SELECT * FROM meals'
  return db.prepare(query).all()
}

export const getMeal = async (slug) => {
  const query = 'SELECT * FROM meals WHERE slug = ?'
  return await db.prepare(query).get(slug)
}

export const saveMeal = async (meal) => {
  const sanitizedMealData = { ...meal }
  sanitizedMealData.slug = slugify(sanitizedMealData.title, { lower: true })
  sanitizedMealData.instructions = xss(sanitizedMealData.instructions)

  const extension = sanitizedMealData.image.name.split('.').pop()
  const fileName = `${sanitizedMealData.slug}.${extension}`
  const path = `/images/${fileName}`

  const stream = createWriteStream(`public${path}`)
  const bufferedImage = await sanitizedMealData.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!')
    }
  })

  sanitizedMealData.image = path

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(sanitizedMealData)
}
