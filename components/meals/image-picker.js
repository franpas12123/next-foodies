'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import classes from './image-picker.module.css'

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState(null)
  const imageInput = useRef()
  const handleImageClick = () => {
    imageInput.current.click()
  }
  const handleImageInputChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setPickedImage(fileReader.result)
    }
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        {pickedImage && (
          <div className={classes.preview}>
            <Image src={pickedImage} alt='The image selected by the user.' fill />
          </div>
        )}
        <input
          className={classes.input}
          ref={imageInput}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          onChange={handleImageInputChange}
          required
        />
        <button className={classes.button} type='button' onClick={handleImageClick}>
          Pick an image
        </button>
      </div>
    </div>
  )
}
