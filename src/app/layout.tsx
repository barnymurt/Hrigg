import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hazelrigg Enterprises | Premium Aircraft & Industrial Equipment',
  description: 'Expertly sourced pre-owned aircraft and industrial plant equipment. Quality assurance, global sourcing, and professional guidance.',
  keywords: 'aircraft sales, pre-owned aircraft, industrial equipment, cranes, generators, plant equipment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}