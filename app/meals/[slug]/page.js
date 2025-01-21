import { getMeal } from '@/lib/meals'
import classes from './page.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({ params }) => {
  const { slug } = await params
  const meal = await getMeal(slug)

  if (!meal) notFound()

  return {
    title: meal.title,
    description: meal.summary
  }
}
export default async function MealsSlug({ params }) {
  const { slug } = await params
  const meal = await getMeal(slug)

  if (!meal) notFound()

  const { image, creator, summary, instructions, title, creator_email } = meal

  const mealInstructions = instructions.replace(/\n/g, '<br />')
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: mealInstructions
          }}
        ></p>
      </main>
    </>
  )
}
