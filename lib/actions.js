'use server'

import { redirect } from 'next/navigation'
import { saveMeal } from './meals'

const isInvalidText = (text) => {
  return !(text || text.trim() !== '')
}

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('creator'),
    creator_email: formData.get('creator_email')
  }

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.image || !meal.image.size
  ) {
    return {
      message: 'Invalid input!'
    }
  }

  await saveMeal(meal)
  
  redirect('/meals')
}
