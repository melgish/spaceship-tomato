import type { Metadata } from 'next'

import './globals.scss'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    template: '%s - Spaceship Tomato',
    default: 'Home - Spaceship Tomato',
  },
}

const link = 'border-b-2 border-b-slate-400 rounded-sm px-2 pt-1 hover:border-b-red-800'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-x-1">
          <Link className={link} href="/">
            Home
          </Link>
          <Link className={link} href="/plants">
            Plants
          </Link>
          <Link className={link} href="/buckets">
            Buckets
          </Link>
          <Link className={link} href="/readings">
            Readings
          </Link>
        </nav>
        <main>
          {children}
          <Toaster position="top-center" />
        </main>
      </body>
    </html>
  )
}
