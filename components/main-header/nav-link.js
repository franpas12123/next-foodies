'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import classes from './nav-link.module.css'

export default function NavLink({ children, href }) {
  const { link, active } = classes
  const path = usePathname()

  return (
    <Link href={href} className={path.startsWith(href) ? `${link} ${active}` : link}>
      {children}
    </Link>
  )
}
