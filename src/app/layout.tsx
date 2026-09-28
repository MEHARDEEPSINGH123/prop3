import type { Metadata } from 'next'
import { Bebas_Neue, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HAUTE TERRES · Architecture & Domaines | Editorial Luxury Real Estate',
  description: 'An editorial portfolio of rare architectural masterpieces, waterfront sanctuaries, and super penthouses curated for discerning patrons of architecture.',
  keywords: ['Luxury Real Estate', 'Singapore Penthouses', 'Waterfront Villas', 'Architecture Magazine', 'Architectural Digest', 'High Net Worth Properties'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${cormorantGaramond.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-canvas text-primary font-sans antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  )
}
