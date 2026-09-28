'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  Layers,
  Building,
  DollarSign,
  ArrowDown,
  Compass,
  ArrowUpRight,
  ShieldCheck,
  Maximize2
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

const telemetryMap: Record<string, { coords: string; elevation: string; release: string }> = {
  HP01: {
    coords: '1°16\'55" N · 103°51\'14" E',
    elevation: 'ELEV. +280M (LEVEL 64)',
    release: 'MARINA BAY SKYLINE',
  },
  HP02: {
    coords: '1°18\'19" N · 103°49\'44" E',
    elevation: 'ELEV. +190M (LEVEL 42)',
    release: 'ORCHARD BOULEVARD SKYLINE',
  },
  HP03: {
    coords: '1°18\'32" N · 103°49\'12" E',
    elevation: 'ELEV. +95M (CANOPY)',
    release: 'NASSIM HILL SANCTUARY',
  },
  HP04: {
    coords: '1°14\'45" N · 103°50\'18" E',
    elevation: 'ELEV. +18M (OCEAN BERTH)',
    release: 'SENTOSA COVE WATERCOURSE',
  },
}

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

  const activeProject = heroProjects[currentIndex] || heroProjects[0]
  const telemetry = telemetryMap[activeProject?.id || 'HP01'] || telemetryMap.HP01

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isNavigatingRef = useRef(false)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!heroProjects || heroProjects.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProjects.length)
    }, 11000)
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
    startTimer()
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 500)
  }, [heroProjects, startTimer])

  const handleNext = useCallback(() => {
    if (isNavigatingRef.current) return
    isNavigatingRef.current = true
    setCurrentIndex((prev) => (prev + 1) % heroProjects.length)
    startTimer()
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 500)
  }, [heroProjects, startTimer])

  const handleSelectIndex = (idx: number) => {
    setCurrentIndex(idx)
    startTimer()
  }

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

  const renderEditorialTitle = (title: string) => {
    const parts = title.split(' ')
    if (parts.length <= 1) return title
    const last = parts.pop()
    const first = parts.join(' ')
    return (
      <>
        <span>{first}</span>{' '}
        <span className="font-serif italic font-light text-accent">{last}</span>
      </>
    )
  }

  if (!activeProject) return null

  return (
    <>
      {/* =========================================================
          CHAPTER 01: ULTRA-EDITORIAL ARCHITECTURAL MONOGRAPH
          Full-Bleed Edge-to-Edge Canvas with Floating Telemetry
      ========================================================= */}
      <section
        id="hero"
        className="relative w-full min-h-screen bg-[#07080C] text-white flex flex-col justify-between overflow-hidden"
      >
        {/* Full-Bleed Edge-to-Edge Cinematic Canvas Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  activeProject.hero_image ||
                  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85'
                })`,
              }}
            >
              {/* Luxury Monograph Radial & Linear Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-[#07080C]/50 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080C]/90 via-[#07080C]/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(7,8,12,0.85)_100%)] pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Architectural Drafting Corner Markings */}
        <div className="absolute top-28 left-6 sm:left-12 text-white/20 font-mono text-[10px] pointer-events-none select-none z-10 hidden lg:block tracking-widest">
          + 01.GEO.REG
        </div>
        <div className="absolute top-28 right-6 sm:right-12 text-white/20 font-mono text-[10px] pointer-events-none select-none z-10 hidden lg:block tracking-widest">
          + {telemetry.coords}
        </div>

        {/* Top Editorial Telemetry Bar */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 backdrop-blur-md">
            {/* Monograph Tag & Live GPS Coordinates */}
            <motion.div
              key={`telemetry-${activeProject.id}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3 text-xs font-mono"
            >
              <span className="text-accent font-bold tracking-[0.25em] uppercase">
                Chapter 01 // Monograph
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-neutral-300 tracking-wider hidden sm:inline">
                {telemetry.coords}
              </span>
              <span className="text-white/20 hidden md:inline">|</span>
              <span className="hidden md:inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-[10px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span>{telemetry.elevation}</span>
              </span>
            </motion.div>

            {/* Slide Index Counter & Minimal Kinetic Controls */}
            <div className="flex items-center space-x-4">
              <span className="text-[11px] font-mono tracking-widest text-neutral-400">
                <span className="text-white font-bold text-sm">0{currentIndex + 1}</span>
                <span className="text-white/30 mx-2">—</span>
                <span>0{heroProjects.length}</span>
              </span>

              <div className="flex items-center space-x-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-accent hover:text-black hover:border-accent text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md"
                  aria-label="Previous Monograph Residence"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-accent hover:text-black hover:border-accent text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md"
                  aria-label="Next Monograph Residence"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Centerstage Editorial Hero Typography & Poetic Narrative */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 my-auto py-10 lg:py-16">
          <div className="max-w-4xl space-y-6 sm:space-y-8">
            {/* Category Monogram Pill */}
            <motion.div
              key={`sub-${activeProject.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="h-[1px] w-12 bg-accent" />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.35em] text-accent font-semibold">
                {activeProject.subtitle}
              </span>
            </motion.div>

            {/* Editorial Title: Roman Serif with Italicized Flourish */}
            <motion.h1
              key={`title-${activeProject.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-normal tracking-tight text-white leading-[0.93] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
            >
              {renderEditorialTitle(activeProject.name)}
            </motion.h1>

            {/* Poetic Narrative Tagline */}
            <motion.p
              key={`tag-${activeProject.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-serif text-lg sm:text-xl md:text-2xl text-neutral-300/95 italic max-w-2xl leading-relaxed"
            >
              &ldquo;{activeProject.tagline}&rdquo;
            </motion.p>

            {/* Editorial Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={`/book-viewing?property=${encodeURIComponent(activeProject.name)}`}
                className="bg-accent hover:bg-accent-light text-[#07080C] font-mono font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-2.5 shadow-[0_0_30px_rgba(223,183,118,0.35)] hover:scale-[1.03] cursor-pointer"
              >
                <span>Enter Private Salon</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href="#monograph-telemetry"
                className="bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/20 hover:border-accent font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-300 flex items-center space-x-2.5 cursor-pointer"
              >
                <span>Architectural Spec Sheet</span>
                <ArrowDown className="w-4 h-4 text-accent" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Floating Architectural Telemetry Bar */}
        <div
          id="monograph-telemetry"
          className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12"
        >
          <div className="bg-[#0A0D15]/85 backdrop-blur-2xl rounded-3xl border border-white/15 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {/* Column 1: Valuation */}
              <div className="border-r border-white/10 pr-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                  Acquisition Valuation
                </span>
                <span className="font-serif text-2xl font-bold text-accent">
                  {activeProject.price_formatted}
                </span>
              </div>

              {/* Column 2: Footprint */}
              <div className="border-r border-white/10 pr-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                  Enclosed Footprint
                </span>
                <span className="font-mono text-base font-bold text-white">
                  {activeProject.area_sqft}
                </span>
              </div>

              {/* Column 3: Master Architect */}
              <div className="border-r border-white/10 pr-4 hidden md:block">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                  Master Architect
                </span>
                <span className="font-sans text-xs font-semibold text-neutral-200 truncate block">
                  {activeProject.architect}
                </span>
              </div>

              {/* Column 4: Typology & District */}
              <div className="border-r border-white/10 pr-4 hidden md:block">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                  Typology & District
                </span>
                <span className="font-mono text-xs text-neutral-300 truncate block">
                  {activeProject.property_type} · {activeProject.district}
                </span>
              </div>

              {/* Column 5: Interactive Slide Switcher Capsules */}
              <div className="col-span-2 md:col-span-1 flex items-center justify-between md:justify-end space-x-2">
                {heroProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(223,183,118,0.5)] scale-105'
                        : 'text-neutral-400 hover:text-white bg-white/5 border border-white/10'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CURATED RESIDENCE SEARCH CONSOLE (Floating Ambient Drawer)
      ========================================================= */}
      <section
        id="search-panel"
        className="relative z-30 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 -mt-6 sm:-mt-8 mb-20 sm:mb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#0A0D15]/95 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
            <div className="flex items-center space-x-2.5">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent font-bold">
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
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Location</span>
              </label>
              <LuxuryDropdown
                options={locationOptions}
                value={searchLocation}
                onChange={setSearchLocation}
                placeholder="All Singapore Enclaves"
                theme="dark"
              />
            </div>

            {/* Field 2: Property Type */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5 font-mono">
                <Building className="w-3.5 h-3.5 text-accent" />
                <span>Property Type</span>
              </label>
              <LuxuryDropdown
                options={propertyTypeOptions}
                value={searchType}
                onChange={setSearchType}
                placeholder="All Architectural Types"
                theme="dark"
              />
            </div>

            {/* Field 3: Price Range */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5 font-mono">
                <DollarSign className="w-3.5 h-3.5 text-accent" />
                <span>Price Range</span>
              </label>
              <LuxuryDropdown
                options={priceOptions}
                value={searchPrice}
                onChange={setSearchPrice}
                placeholder="Any Price Tier"
                theme="dark"
              />
            </div>

            {/* Field 4: Bedrooms */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5 font-mono">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>Bedrooms</span>
              </label>
              <LuxuryDropdown
                options={bedroomOptions}
                value={searchBedrooms}
                onChange={setSearchBedrooms}
                placeholder="Any Bedroom Count"
                theme="dark"
              />
            </div>

            {/* Field 5: Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-[#07080C] font-mono font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(223,183,118,0.3)] hover:shadow-[0_0_30px_rgba(223,183,118,0.5)] cursor-pointer hover:scale-[1.02]"
              >
                <Search className="w-4 h-4 text-[#07080C]" />
                <span>Find Residence</span>
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </>
  )
}
