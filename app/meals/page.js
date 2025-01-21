import MealsGrid from '@/components/meals/meals-grid'
import classes from './page.module.css'
import Link from 'next/link'

import { getMeals } from '@/lib/meals'
import { Suspense } from 'react'
import MealsLoadingPage from './loading'

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.'
}

const Meals = async () => {
  const meals = await getMeals()
  return <MealsGrid meals={meals} />
}

export default async function MealsPage() {
  const { header, highlight, main, cta } = classes
  return (
    <>
      <header className={header}>
        <h1>
          Delicious meals, created <span className={highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
        <p className={cta}>
          <Link href='/meals/share'>Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={main}>
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  )
}
