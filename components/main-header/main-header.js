import Link from 'next/link'
import Image from 'next/image'

import classes from './main-header.module.css'
import logoImg from '@/assets/logo.png'

import MainHeaderBackground from './main-header-background'
import NavLink from './nav-link'

export default function MainHeader() {
  const { header, logo, nav } = classes

  return (
    <>
      <MainHeaderBackground />
      <header className={header}>
        <Link href='/' className={logo}>
          <Image src={logoImg} alt='A plate with food on it' priority />
          Next Level Food
        </Link>

        <nav className={nav}>
          <ul>
            <li>
              <NavLink href='/meals'>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
