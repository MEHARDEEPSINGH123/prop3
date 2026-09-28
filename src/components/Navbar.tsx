'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, ArrowUpRight, Compass, ShieldCheck, Phone } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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

  // Architectural drawer navigation organized into 3 refined wings
  const drawerWings = [
    {
      wing: 'Wing 01 · Architectural Collection',
      items: [
        { label: 'Architectural Masthead', href: '/#hero', index: '01', desc: 'Curated Singapore Enclaves' },
        { label: 'Curated Portfolio', href: '/#top-picks', index: '04', desc: 'Super Penthouses & Palatial Estates' },
        { label: 'Architectural Amenities', href: '/#facilities', index: '05', desc: 'Subterranean Bays & Private Spas' },
        { label: 'Visual Anthology & Monograph', href: '/#gallery', index: '09', desc: 'High-Resolution Architectural Imagery' },
      ],
    },
    {
      wing: 'Wing 02 · Market Intelligence & Advisory',
      items: [
        { label: 'The Atelier Manifesto', href: '/#our-story', index: '02', desc: 'Heritage, Philosophy & Curatorial Vision' },
        { label: 'Benchmark Statistics', href: '/#statistics', index: '03', desc: 'Ultra-Prime Market Yields & Appreciation' },
        { label: 'Capital Advisory', href: '/#financing', index: '06', desc: 'Structured Debt, Cross-Border & Family Offices' },
        { label: 'Analytical Architecture', href: '/#comparison', index: '07', desc: 'Granular Side-by-Side Estate Evaluation' },
      ],
    },
    {
      wing: 'Wing 03 · Private Client Desk & Sanctuary',
      items: [
        { label: 'Private Viewing Appointments', href: '/#appointments', index: '08', desc: 'Chauffeur Arrival & Vintage Tastings' },
        { label: 'Patronage Testimonials', href: '/#testimonials', index: '10', desc: 'Verbatim Family Office Endorsements' },
        { label: 'Enclave Cartography', href: '/#locations', index: '11', desc: 'Marina Bay, Nassim Hill & Sentosa Cove' },
        { label: 'Private Concierge & Epilogue', href: '/#contact', index: '12', desc: 'Direct Line to Managing Partners' },
      ],
    },
  ]

  return (
    <>
      {/* Floating Architectural Glass Capsule */}
      <header
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1440px] transition-all duration-500 rounded-full ${
          scrolled
            ? 'bg-[#090A0F]/90 backdrop-blur-2xl py-2.5 px-5 sm:px-7 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
            : 'bg-[#090A0F]/70 backdrop-blur-xl py-3 px-5 sm:px-8 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Left: Brandmark with Architectural Crest Monogram */}
          <Link href="/" className="group flex items-center space-x-3 focus:outline-none">
            <div className="w-8 h-8 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent/20 transition-all duration-300">
              <span className="font-serif text-accent text-xs font-semibold tracking-tighter">HT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-hero text-xl sm:text-2xl tracking-[0.24em] text-white group-hover:text-accent transition-colors leading-none">
                HAUTE TERRES
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.38em] text-neutral-400 uppercase font-mono mt-0.5">
                Atelier & Domaines
              </span>
            </div>
          </Link>

          {/* Center: Bespoke Architectural Curator Indicator (Replaces standard template link clutter) */}
          <div className="hidden lg:flex items-center space-x-6 text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-400">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-[10px] text-accent/90 font-medium">Curated Enclaves</span>
            </div>
            <span className="text-white/20">/</span>
            <a
              href="/#top-picks"
              className="hover:text-accent transition-colors relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
            >
              Residences
            </a>
            <a
              href="/#our-story"
              className="hover:text-accent transition-colors relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
            >
              Manifesto
            </a>
            <a
              href="/#financing"
              className="hover:text-accent transition-colors relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
            >
              Advisory
            </a>
          </div>

          {/* Right: Unique Frosted Actions & Architectural Index Trigger */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Private Viewing Salon Frosted Button */}
            <Link
              href="/book-viewing"
              className="group relative overflow-hidden bg-gradient-to-r from-accent/20 via-accent/10 to-transparent hover:from-accent hover:to-accent-light text-accent-light hover:text-[#090A0F] border border-accent/40 hover:border-accent text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase px-4 sm:px-5 py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(223,183,118,0.15)] hover:shadow-[0_0_25px_rgba(223,183,118,0.4)] flex items-center space-x-2 font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-accent group-hover:text-[#090A0F] transition-colors" />
              <span className="hidden sm:inline">Private Salon</span>
              <ArrowUpRight className="w-3 h-3 text-accent/70 group-hover:text-[#090A0F] transition-colors" />
            </Link>

            {/* Architectural Index Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="group flex items-center space-x-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-accent border border-white/15 hover:border-accent/40 transition-all focus:outline-none cursor-pointer"
              aria-label="Open Monograph Index"
            >
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-300 group-hover:text-white transition-colors">
                Index
              </span>
              <div className="flex flex-col space-y-1 w-3.5 items-end">
                <span className="w-3.5 h-[1.5px] bg-accent group-hover:bg-white transition-all" />
                <span className="w-2.5 h-[1.5px] bg-white group-hover:w-3.5 group-hover:bg-accent transition-all" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Architectural Navigation Drawer (Scriptorium & Index) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: '#090A0F' }}
            className="fixed inset-0 z-50 bg-[#090A0F] text-white flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto no-scrollbar"
          >
            {/* Top Bar of Drawer */}
            <div className="flex items-center justify-between pb-8 border-b border-white/15 max-w-7xl mx-auto w-full">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="font-serif text-accent text-base font-semibold">HT</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-hero text-2xl sm:text-4xl tracking-[0.25em] text-white">
                    HAUTE TERRES
                  </span>
                  <span className="text-[9px] sm:text-[10px] tracking-[0.4em] text-accent uppercase font-mono font-semibold mt-1">
                    Architectural Monograph Index
                  </span>
                </div>
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

            {/* Main Links Structured by Architectural Wings */}
            <div className="py-8 sm:py-12 max-w-7xl mx-auto w-full space-y-10 sm:space-y-12">
              {drawerWings.map((wingGroup) => (
                <div key={wingGroup.wing} className="space-y-4">
                  <div className="flex items-center space-x-3 text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-accent/80 pb-2 border-b border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{wingGroup.wing}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {wingGroup.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                        className="group p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-accent/60 hover:bg-white/[0.07] transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1 cursor-pointer min-h-[140px]"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono tracking-widest text-accent font-bold">
                            INDEX // {item.index}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <div>
                          <span className="font-serif text-xl sm:text-2xl text-white group-hover:text-accent font-normal block leading-tight transition-colors mb-1.5">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-neutral-400 font-sans line-clamp-1">
                            {item.desc}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Footer of Drawer */}
            <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-300 gap-4 max-w-7xl mx-auto w-full">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="font-medium text-neutral-300">
                  Private Client Advisory · Level 52, Marina Bay Financial Centre, Singapore
                </span>
              </div>

              <div className="flex items-center space-x-5">
                <span className="font-mono text-white tracking-wider flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>+65 6890 2888</span>
                </span>
                <Link
                  href="/book-viewing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-accent hover:bg-accent-light text-primary-dark px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-md"
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
