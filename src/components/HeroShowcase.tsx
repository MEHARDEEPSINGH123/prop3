'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Calendar,
  Layers,
  Building,
  Maximize2,
  DollarSign,
  ArrowDown,
  Compass
} from 'lucide-react'
import type { HeroProject } from '../types/database'
import LuxuryDropdown from './LuxuryDropdown'

const locationOptions = [
  { value: 'All', label: 'All Singapore Enclaves' },
  { value: 'Sentosa Cove', label: 'Sentosa Cove (D04)' },
  { value: 'Marina Bay', label: 'Marina Bay (D01)' },
  { value: 'Nassim Hill', label: 'Nassim Hill (D10)' },
  { value: 'Orchard Boulevard', label: 'Orchard Boulevard (D09)' },
  { value: 'Keppel Bay', label: 'Keppel Bay (D04)' },
  { value: 'Bukit Timah', label: 'Bukit Timah (D11)' },
  { value: 'Paterson Hill', label: 'Paterson Hill (D09)' },
]

const propertyTypeOptions = [
  { value: 'All', label: 'All Architectural Types' },
  { value: 'Super Penthouse', label: 'Super Penthouse' },
  { value: 'Waterfront Villa', label: 'Waterfront Villa' },
  { value: 'Architectural Estate', label: 'Architectural Estate' },
  { value: 'Triplex Penthouse', label: 'Triplex Penthouse' },
  { value: 'Designer Duplex', label: 'Designer Duplex' },
  { value: 'Sky Suite', label: 'Sky Suite' },
]

const priceOptions = [
  { value: 'All', label: 'Any Price Tier' },
  { value: 'under-10m', label: 'Under S$ 10,000,000' },
  { value: '10m-25m', label: 'S$ 10,000,000 - S$ 25,000,000' },
  { value: 'above-25m', label: 'S$ 25,000,000 + (Ultra-Prime)' },
]

const bedroomOptions = [
  { value: 'All', label: 'Any Bedroom Count' },
  { value: '3', label: '3+ Grand Suites' },
  { value: '4', label: '4+ Grand Suites' },
  { value: '5', label: '5+ Palatial Suites' },
  { value: '6', label: '6+ Palatial Wings' },
]

interface HeroShowcaseProps {
  heroProjects: HeroProject[]
  onSearchFilter?: (filters: {
    location: string
    propertyType: string
    priceRange: string
    bedrooms: string
  }) => void
}

export default function HeroShowcase({
  heroProjects,
  onSearchFilter,
}: HeroShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchLocation, setSearchLocation] = useState('All')
  const [searchType, setSearchType] = useState('All')
  const [searchPrice, setSearchPrice] = useState('All')
  const [searchBedrooms, setSearchBedrooms] = useState('All')

  // Guard if data is empty
  const activeProject = heroProjects[currentIndex] || heroProjects[0]

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isNavigatingRef = useRef(false)

  // Reset and restart the auto-advance interval with increased duration (12 seconds)
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!heroProjects || heroProjects.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProjects.length)
    }, 12000) // Increased to 12 seconds for comfortable reading
  }, [heroProjects])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const handlePrev = useCallback(() => {
    if (isNavigatingRef.current) return
    isNavigatingRef.current = true
    setCurrentIndex((prev) => (prev === 0 ? heroProjects.length - 1 : prev - 1))
    startTimer() // Restart full 12s countdown on manual click
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 450)
  }, [heroProjects, startTimer])

  const handleNext = useCallback(() => {
    if (isNavigatingRef.current) return
    isNavigatingRef.current = true
    setCurrentIndex((prev) => (prev + 1) % heroProjects.length)
    startTimer() // Restart full 12s countdown on manual click
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 450)
  }, [heroProjects, startTimer])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearchFilter) {
      onSearchFilter({
        location: searchLocation,
        propertyType: searchType,
        priceRange: searchPrice,
        bedrooms: searchBedrooms,
      })
    }
    const target = document.getElementById('top-picks')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!activeProject) return null

  return (
    <>
      {/* 100vh Full-Screen Cinematic Hero Screen (Matching Picture 1 layout & proportions) */}
      <section id="hero" className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-primary text-white flex flex-col justify-between overflow-hidden">
        {/* Background Image Carousel with Absolute Full Coverage */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${activeProject.hero_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80'})`,
              }}
            >
              {/* Multi-layered cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-black/35" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content Container - Proportioned to comfortably fit 100vh below the fixed Navbar */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between h-full pt-28 sm:pt-32 pb-8 sm:pb-10">
          {/* Top Status & Project Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 sm:pt-2">
            <motion.div
              key={`badge-${activeProject.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-accent-light shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>{activeProject.availability || 'Signature Portfolio'}</span>
              </span>

              <span className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{activeProject.location}</span>
              </span>

              <span className="hidden lg:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 text-neutral-300">
                <span className="text-accent font-semibold">01</span>
                <span>// Architectural Masthead</span>
              </span>
            </motion.div>

            {/* Slide Indicator & Navigation Controls */}
            <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm">
              <span className="text-xs font-mono tracking-widest text-accent font-bold">
                0{currentIndex + 1}
              </span>
              <span className="text-xs text-neutral-500">/</span>
              <span className="text-xs font-mono text-neutral-400">
                0{heroProjects.length}
              </span>
              <div className="h-3 w-[1px] bg-white/20 mx-1" />
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 hover:text-accent transition-colors focus:outline-none"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 hover:text-accent transition-colors focus:outline-none"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Editorial Typography Headline */}
          <div className="my-auto py-2 sm:py-3">
            <div className="max-w-4xl">
              <motion.p
                key={`sub-${activeProject.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xs md:text-sm uppercase tracking-[0.22em] text-accent font-semibold mb-2"
              >
                {activeProject.subtitle || 'Monumental Architecture · Private Collection'}
              </motion.p>

              <motion.h1
                key={`title-${activeProject.id}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-hero text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] tracking-wider leading-[0.92] uppercase text-white drop-shadow-md"
              >
                {activeProject.name}
              </motion.h1>

              <motion.p
                key={`tag-${activeProject.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-neutral-300 font-serif italic max-w-2xl leading-relaxed"
              >
                &ldquo;{activeProject.tagline || 'Sculpted into the horizon of Singapore with private harbor vistas.'}&rdquo;
              </motion.p>
            </div>

            {/* Floating Glass Spec Cards */}
            <motion.div
              key={`specs-${activeProject.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-5 sm:mt-6 max-w-3xl"
            >
              <div className="glass-dark p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-sm">
                <span className="text-[9px] tracking-wider uppercase text-neutral-400 block font-mono">
                  Starting Acquisition
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-accent">
                  {activeProject.price_formatted || (activeProject.starting_price_sgd ? `S$ ${(activeProject.starting_price_sgd / 1000000).toFixed(1)}M` : 'S$ 18.5M')}
                </span>
              </div>

              <div className="glass-dark p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-sm">
                <span className="text-[9px] tracking-wider uppercase text-neutral-400 block font-mono">
                  Typology & Suites
                </span>
                <span className="text-xs sm:text-sm font-medium text-white truncate block">
                  {activeProject.bedrooms || '4 - 6 Suites'}
                </span>
              </div>

              <div className="glass-dark p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-sm">
                <span className="text-[9px] tracking-wider uppercase text-neutral-400 block font-mono">
                  Floor Area
                </span>
                <span className="text-xs sm:text-sm font-medium text-white block">
                  {activeProject.area_sqft || '7,450 sq ft'}
                </span>
              </div>

              <div className="glass-dark p-3 sm:p-3.5 rounded-2xl border border-white/10 shadow-sm">
                <span className="text-[9px] tracking-wider uppercase text-neutral-400 block font-mono">
                  Architectural Lead
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-200 truncate block">
                  {activeProject.architect || 'WOHA & Partners'}
                </span>
              </div>
            </motion.div>

            {/* CTAs with comfortable space below */}
            <div className="flex flex-wrap items-center gap-3.5 mt-5 sm:mt-6">
              <a
                href="#search-panel"
                className="bg-accent hover:bg-accent-light text-primary font-bold text-xs tracking-[0.16em] uppercase px-7 py-3 rounded-full transition-all duration-300 shadow-luxury flex items-center space-x-2 hover:scale-[1.02]"
              >
                <span>Explore Properties</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <Link
                href="/book-viewing"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold text-xs tracking-[0.16em] uppercase px-7 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 hover:border-accent"
              >
                <Calendar className="w-4 h-4 text-accent" />
                <span>Book Viewing</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Console (Sits smoothly at the bridge into Section 02) */}
      <section id="search-panel" className="relative z-30 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 -mt-8 sm:-mt-10 mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white/95 backdrop-blur-2xl text-primary rounded-3xl p-6 sm:p-8 shadow-2xl border border-borderSubtle"
        >
          {/* Panel Top Label */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-borderSubtle">
            <div className="flex items-center space-x-2">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-secondary font-bold">
                Chapter 01 · Curated Residence Search Console
              </span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
              Haute Terres Real Estate Registry
            </span>
          </div>

          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Field 1: Location */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Location</span>
              </label>
              <LuxuryDropdown
                value={searchLocation}
                onChange={setSearchLocation}
                options={locationOptions}
              />
            </div>

            {/* Field 2: Property Type */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1.5 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-accent" />
                <span>Property Type</span>
              </label>
              <LuxuryDropdown
                value={searchType}
                onChange={setSearchType}
                options={propertyTypeOptions}
              />
            </div>

            {/* Field 3: Price Range */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1.5 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5 text-accent" />
                <span>Price Range</span>
              </label>
              <LuxuryDropdown
                value={searchPrice}
                onChange={setSearchPrice}
                options={priceOptions}
              />
            </div>

            {/* Field 4: Bedrooms */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-secondary mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>Bedrooms</span>
              </label>
              <LuxuryDropdown
                value={searchBedrooms}
                onChange={setSearchBedrooms}
                options={bedroomOptions}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-semibold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Search className="w-4 h-4 text-accent" />
                <span>Find Residence</span>
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </>
  )
}
