'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, ArrowUpRight, Compass } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock background body scroll and listen for Escape key when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const primaryNavLinks = [
    { label: 'Our Story', href: '/#our-story' },
    { label: 'Statistics', href: '/#statistics' },
    { label: 'Top Picks', href: '/#top-picks' },
    { label: 'Facilities', href: '/#facilities' },
    { label: 'Financing', href: '/#financing' },
    { label: 'Compare', href: '/#comparison' },
    { label: 'Appointments', href: '/#appointments' },
  ]

  const fullDrawerLinks = [
    { label: 'Architectural Masthead', href: '/#hero', index: '01' },
    { label: 'The Atelier Manifesto', href: '/#our-story', index: '02' },
    { label: 'Benchmark Statistics', href: '/#statistics', index: '03' },
    { label: 'Curated Portfolio', href: '/#top-picks', index: '04' },
    { label: 'Architectural Amenities', href: '/#facilities', index: '05' },
    { label: 'Capital Advisory', href: '/#financing', index: '06' },
    { label: 'Analytical Architecture', href: '/#comparison', index: '07' },
    { label: 'Private Viewing Appointments', href: '/#appointments', index: '08' },
    { label: 'Visual Anthology & Monograph', href: '/#gallery', index: '09' },
    { label: 'Patronage Testimonials', href: '/#testimonials', index: '10' },
    { label: 'Enclave Cartography', href: '/#locations', index: '11' },
    { label: 'Private Concierge & Epilogue', href: '/#contact', index: '12' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#111111]/95 backdrop-blur-xl py-3.5 border-b border-white/10 shadow-2xl'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-6'
        }`}
      >
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* Left: Brand Identity with Dedicated Luxury Spacing */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex flex-col focus:outline-none"
            >
              <span className="font-hero text-2xl sm:text-3xl tracking-[0.22em] text-white group-hover:text-accent transition-colors leading-none">
                HAUTE TERRES
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.38em] text-neutral-400 uppercase font-sans mt-1">
                Architecture & Domaines
              </span>
            </Link>
          </div>

          {/* Center: Curated Editorial Navigation with Generous Spacing */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8 text-[11px] tracking-[0.16em] uppercase font-semibold text-neutral-300">
            {primaryNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-accent transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Actions with Clear Separation & Direct Link to Dedicated Booking Page */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Dedicated Page Link: Book Viewing */}
            <Link
              href="/book-viewing"
              className="bg-accent hover:bg-accent-light text-primary font-bold text-xs tracking-[0.16em] uppercase px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 shadow-md flex items-center space-x-2 hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>Book Viewing</span>
            </Link>

            {/* Menu Trigger for Full Editorial Drawer */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-accent border border-white/15 transition-colors focus:outline-none"
              aria-label="Open Curated Navigation Drawer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Full Editorial Navigation Drawer (All 12 Sections) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: '#0d0d0d' }}
            className="fixed inset-0 z-50 bg-[#0d0d0d] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto no-scrollbar"
          >
            {/* Top Bar of Drawer */}
            <div className="flex items-center justify-between pb-8 border-b border-white/15 max-w-7xl mx-auto w-full">
              <div className="flex flex-col">
                <span className="font-hero text-3xl sm:text-4xl tracking-[0.25em] text-white">
                  HAUTE TERRES
                </span>
                <span className="text-[10px] tracking-[0.4em] text-accent uppercase font-mono font-semibold mt-1">
                  Editorial Scriptorium & Index
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:border-accent hover:bg-white/10 flex items-center justify-center text-white hover:text-accent transition-all shadow-md cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Links Grid in Drawer */}
            <div className="py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto w-full">
              {fullDrawerLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ backgroundColor: '#181818' }}
                  className="group p-6 rounded-2xl bg-[#181818] border border-white/10 hover:border-accent hover:bg-[#222222] transition-all duration-300 shadow-xl flex items-start justify-between hover:-translate-y-1 cursor-pointer"
                >
                  <div className="pr-4">
                    <span className="text-[11px] font-mono tracking-widest text-accent font-bold block mb-2">
                      CHAPTER {item.index}
                    </span>
                    <span className="font-serif text-2xl sm:text-3xl text-white group-hover:text-accent font-normal block leading-tight transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 mt-1" />
                </a>
              ))}
            </div>

            {/* Bottom Footer of Drawer */}
            <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-300 gap-4 max-w-7xl mx-auto w-full">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="font-medium">Private Client Advisory · Level 52, Marina Bay Financial Centre</span>
              </div>

              <div className="flex items-center space-x-5">
                <span className="font-mono text-white tracking-wider">+65 6890 2888</span>
                <Link
                  href="/book-viewing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-accent hover:bg-accent-light text-primary px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-md"
                >
                  Enter Viewing Salon
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
