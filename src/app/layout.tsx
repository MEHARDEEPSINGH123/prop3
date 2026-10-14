import type { Metadata } from 'next'
import { Bebas_Neue, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Chatbot from '../components/Chatbot'

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
  title: 'Dagsis Property 3 Dummy · Architecture & Domaines | Editorial Luxury Real Estate',
  description: 'An editorial portfolio of rare architectural masterpieces, waterfront sanctuaries, and super penthouses curated by Dagsis Property 3 Dummy.',
  keywords: ['Luxury Real Estate', 'Singapore Penthouses', 'Waterfront Villas', 'Architecture Magazine', 'Architectural Digest', 'High Net Worth Properties', 'Dagsis Property 3 Dummy'],
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
        <Chatbot />
      </body>
    </html>
  )
}
