import Link from 'next/link'
import Image from 'next/image'

import classes from './meal-item.module.css'

export default function MealItem({ title, slug, image, summary, creator }) {
  const { meal, headerText, content, actions } = classes
  return (
    <article className={meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={content}>
        <p className={classes.summary}>{summary}</p>
        <div className={actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  )
}
