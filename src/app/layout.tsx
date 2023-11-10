import type { Metadata } from 'next'
import { Fredoka } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({ weight: ['400'],  subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Blitz matchy',
  description: 'A selection game where you run against the clock',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fredoka.className}>{children}</body>
    </html>
  )
}
