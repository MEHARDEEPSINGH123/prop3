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
  Maximize2,
  DollarSign,
  ArrowDown,
  Compass,
  ArrowUpRight,
  ShieldCheck
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

  const activeProject = heroProjects[currentIndex] || heroProjects[0]

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
    }, 450)
  }, [heroProjects, startTimer])

  const handleNext = useCallback(() => {
    if (isNavigatingRef.current) return
    isNavigatingRef.current = true
    setCurrentIndex((prev) => (prev + 1) % heroProjects.length)
    startTimer()
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 450)
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

  if (!activeProject) return null

  return (
    <>
      {/* Split-Screen Hero Showcase with Floating Glass Spec Sheet */}
      <section
        id="hero"
        className="relative w-full min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-[1100px] bg-[#090A0F] text-white flex flex-col justify-between overflow-hidden"
      >
        {/* Cinematic Backdrop with Subtle Radial Vignette */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  activeProject.hero_image ||
                  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85'
                })`,
              }}
            >
              {/* Ultra-Modern Glassmorphic Dark Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/65 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090A0F]/90 via-[#090A0F]/50 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-black/60 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content Container - Split-Screen Layout */}
        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-between h-full pt-28 sm:pt-32 pb-8 sm:pb-12">
          {/* Top Bar with Micro Status Badges & Slide Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 sm:pt-2">
            <motion.div
              key={`badge-${activeProject.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-xl border border-white/20 text-accent shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>{activeProject.availability || 'Curated Skyline Release'}</span>
              </span>

              <span className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider bg-white/5 backdrop-blur-xl border border-white/10 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{activeProject.location}</span>
              </span>

              <span className="hidden lg:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 backdrop-blur-xl border border-white/10 text-neutral-300">
                <span className="text-accent font-semibold">01</span>
                <span>// Architectural Masthead</span>
              </span>
            </motion.div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/15 shadow-lg">
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
                className="p-1 hover:text-accent transition-colors focus:outline-none cursor-pointer"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 hover:text-accent transition-colors focus:outline-none cursor-pointer"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Main Split: Left Showcase + Right Floating Spec Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-8">
            {/* Left Column: Typographic Grandeur & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <motion.div
                key={`sub-${activeProject.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-xs md:text-sm uppercase tracking-[0.25em] text-accent font-semibold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span>{activeProject.subtitle || 'Monumental Architecture · Private Collection'}</span>
                </span>
              </motion.div>

              <motion.h1
                key={`title-${activeProject.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-hero text-4xl sm:text-6xl md:text-7xl xl:text-8xl tracking-wider leading-[0.92] uppercase text-white drop-shadow-xl"
              >
                {activeProject.name}
              </motion.h1>

              <motion.p
                key={`tag-${activeProject.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-neutral-300 font-serif italic max-w-2xl leading-relaxed"
              >
                &ldquo;{activeProject.tagline || 'Sculpted into the horizon of Singapore with private harbor vistas.'}&rdquo;
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#search-panel"
                  className="bg-accent hover:bg-accent-light text-[#090A0F] font-bold text-xs tracking-[0.16em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(223,183,118,0.3)] flex items-center space-x-2 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Residences</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <Link
                  href="/book-viewing"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-xl font-semibold text-xs tracking-[0.16em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 flex items-center space-x-2 hover:border-accent cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Book Private Viewing</span>
                </Link>
              </div>

              {/* Slide Switcher Indicator Pills */}
              <div className="flex items-center space-x-2.5 pt-4">
                {heroProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectIndex(idx)}
                    className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                      currentIndex === idx
                        ? 'w-10 bg-accent shadow-[0_0_12px_rgba(223,183,118,0.8)]'
                        : 'w-3 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Floating Frosted Glass Architectural Spec Sheet */}
            <div className="lg:col-span-5">
              <motion.div
                key={`spec-card-${activeProject.id}`}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-white/[0.06] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* Ambient Soft Gold Orb Behind Glass */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                {/* Spec Sheet Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/15">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold block">
                      Live Architectural Spec Sheet
                    </span>
                    <span className="text-xs text-neutral-300 font-sans mt-0.5 block">
                      {activeProject.district || 'District 01'} · Ultra-Prime Collection
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    {activeProject.availability_status || 'Available'}
                  </span>
                </div>

                {/* Quick Interactive Project Switcher (Thumbnails) */}
                <div className="py-4 border-b border-white/15">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-2.5">
                    Select Curated Sky Residence:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {heroProjects.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectIndex(idx)}
                        className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-300 cursor-pointer ${
                          currentIndex === idx
                            ? 'border-accent shadow-[0_0_15px_rgba(223,183,118,0.5)] scale-105'
                            : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                        }`}
                      >
                        <img
                          src={p.hero_image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono text-white font-bold bg-black/60 px-1 rounded">
                          0{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-3.5 pt-5 pb-5">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono block">
                      Starting Price
                    </span>
                    <span className="text-base sm:text-lg font-serif font-bold text-accent block mt-0.5">
                      {activeProject.price_formatted || 'S$ 18,500,000'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono block">
                      Floor Area
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block mt-1 truncate">
                      {activeProject.area_sqft || '7,450 sq ft'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono block">
                      Typology & Suites
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block mt-1 truncate">
                      {activeProject.bedrooms || '5 Grand Suites'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono block">
                      Architectural Lead
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-200 block mt-1 truncate">
                      {activeProject.architect || 'WOHA Architects'}
                    </span>
                  </div>
                </div>

                {/* Spec Sheet Footer Action */}
                <div className="pt-2">
                  <Link
                    href="/book-viewing"
                    className="w-full py-3 px-4 rounded-xl bg-accent/20 hover:bg-accent hover:text-[#090A0F] text-accent border border-accent/40 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer group"
                  >
                    <span>Inquire On {activeProject.name.split(' ')[0]}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Dark Glass Search Console Panel */}
      <section
        id="search-panel"
        className="relative z-30 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 -mt-10 sm:-mt-14 mb-16 sm:mb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full bg-[#0d1017]/90 backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/15"
        >
          {/* Panel Top Label */}
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
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>Location</span>
              </label>
              <LuxuryDropdown
                options={locationOptions}
                value={searchLocation}
                onChange={setSearchLocation}
                placeholder="All Singapore Enclaves"
              />
            </div>

            {/* Field 2: Property Type */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-accent" />
                <span>Property Type</span>
              </label>
              <LuxuryDropdown
                options={propertyTypeOptions}
                value={searchType}
                onChange={setSearchType}
                placeholder="All Architectural Types"
              />
            </div>

            {/* Field 3: Price Tier */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5 text-accent" />
                <span>Price Range</span>
              </label>
              <LuxuryDropdown
                options={priceOptions}
                value={searchPrice}
                onChange={setSearchPrice}
                placeholder="Any Price Tier"
              />
            </div>

            {/* Field 4: Bedrooms */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" />
                <span>Bedrooms</span>
              </label>
              <LuxuryDropdown
                options={bedroomOptions}
                value={searchBedrooms}
                onChange={setSearchBedrooms}
                placeholder="Any Bedroom Count"
              />
            </div>

            {/* Field 5: Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-[#090A0F] font-bold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(223,183,118,0.25)] hover:shadow-[0_0_30px_rgba(223,183,118,0.4)] cursor-pointer hover:scale-[1.02]"
              >
                <Search className="w-4 h-4 text-[#090A0F]" />
                <span>Find Residence</span>
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </>
  )
}
