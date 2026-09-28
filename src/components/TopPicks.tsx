'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Sparkles,
  ArrowUpRight,
  Calendar,
  Scale
} from 'lucide-react'
import type { FeaturedProperty } from '../types/database'
import { formatNumber, formatCurrency } from '../lib/format'

interface TopPicksProps {
  properties: FeaturedProperty[]
  onSelectProperty: (property: FeaturedProperty) => void
  onAddToComparison?: (property: FeaturedProperty) => void
  activeFilters?: {
    location?: string
    propertyType?: string
    priceRange?: string
    bedrooms?: string
  }
}

export default function TopPicks({
  properties,
  onSelectProperty,
  onAddToComparison,
  activeFilters,
}: TopPicksProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = [
    'All',
    'Waterfront Villa',
    'Super Penthouse',
    'Architectural Estate',
    'Triplex Penthouse',
    'Designer Duplex',
  ]

  // Filter properties based on both local pill and search filter
  const filteredProperties = properties.filter((prop) => {
    // Local category filter
    if (selectedCategory !== 'All' && prop.property_type !== selectedCategory) {
      return false
    }

    // External search filters from Hero
    if (activeFilters) {
      if (activeFilters.location && activeFilters.location !== 'All') {
        if (!prop.location.toLowerCase().includes(activeFilters.location.toLowerCase())) {
          return false
        }
      }
      if (activeFilters.propertyType && activeFilters.propertyType !== 'All') {
        if (prop.property_type !== activeFilters.propertyType) {
          return false
        }
      }
      if (activeFilters.priceRange && activeFilters.priceRange !== 'All') {
        if (activeFilters.priceRange === 'under-10m' && prop.price_sgd >= 10000000) return false
        if (activeFilters.priceRange === '10m-25m' && (prop.price_sgd < 10000000 || prop.price_sgd > 25000000)) return false
        if (activeFilters.priceRange === 'above-25m' && prop.price_sgd < 25000000) return false
      }
      if (activeFilters.bedrooms && activeFilters.bedrooms !== 'All') {
        const minBed = parseInt(activeFilters.bedrooms, 10)
        if (prop.bedrooms < minBed) return false
      }
    }

    return true
  })

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 460
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
      case 'only 2 remaining':
      case 'only 1 unit left':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/30'
      case 'vip reserved':
      case 'exclusive release':
        return 'bg-accent/20 text-accent-light border-accent/40'
      case 'under offer':
        return 'bg-neutral-800/90 text-neutral-300 border-neutral-600/30'
      default:
        return 'bg-white/10 text-white border-white/20'
    }
  }

  return (
    <section id="top-picks" className="py-28 md:py-40 bg-canvas text-primary relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                Chapter 04 · Curated Portfolio
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary font-normal leading-[1.08]">
              Top Picks & Signature Acquisitions
            </h2>
            <p className="text-xs uppercase tracking-widest text-secondary mt-3 font-mono">
              Live Data Sourced From Haute Terres Dataset · {filteredProperties.length} Residences Rendered
            </p>
          </div>

          {/* Controls: Left / Right Navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              className="w-13 h-13 p-3.5 rounded-full border border-borderSubtle bg-white hover:border-accent hover:text-accent transition-all flex items-center justify-center shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-13 h-13 p-3.5 rounded-full border border-borderSubtle bg-white hover:border-accent hover:text-accent transition-all flex items-center justify-center shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2.5 pb-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-secondary hover:bg-neutral-100 border border-borderSubtle'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Snap Scrolling Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10 pt-4 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14"
        >
          {filteredProperties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="snap-start shrink-0 w-[330px] sm:w-[400px] md:w-[440px] group bg-white rounded-3xl overflow-hidden border border-borderSubtle hover:border-accent/60 transition-all duration-500 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Hover Zoom & Badges */}
                <div className="relative aspect-[16/11] overflow-hidden bg-neutral-100">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-md border ${getStatusColor(
                        prop.availability
                      )}`}
                    >
                      {prop.availability}
                    </span>

                    <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {prop.district || prop.location}
                    </span>
                  </div>

                  {/* Price Tag Overlay on Bottom Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-300 block">
                        Acquisition Price
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                        {prop.price_formatted || `S$ ${(prop.price_sgd / 1000000).toFixed(1)}M`}
                      </span>
                    </div>

                    <span className="text-xs uppercase tracking-wider text-accent font-semibold px-3 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10">
                      {prop.property_type}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-7">
                  {/* Location & Title */}
                  <div className="flex items-center space-x-1.5 text-xs text-neutral-500 mb-2.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{prop.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-primary font-normal line-clamp-1 group-hover:text-accent transition-colors">
                    {prop.title}
                  </h3>

                  <p className="text-xs text-secondary mt-2.5 line-clamp-2 leading-relaxed font-sans">
                    {prop.description || 'Exclusive architectural residence with panoramic vistas and bespoke interior appointments.'}
                  </p>

                  {/* 3 Metric Badges: Bedrooms, Bathrooms, Area */}
                  <div className="grid grid-cols-3 gap-2 py-4 my-5 border-y border-borderSubtle text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-1.5 text-secondary text-xs font-semibold">
                        <Bed className="w-4 h-4 text-accent" />
                        <span>{prop.bedrooms}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1 font-mono">
                        Bedrooms
                      </span>
                    </div>

                    <div className="flex flex-col items-center border-x border-borderSubtle">
                      <div className="flex items-center space-x-1.5 text-secondary text-xs font-semibold">
                        <Bath className="w-4 h-4 text-accent" />
                        <span>{prop.bathrooms}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1 font-mono">
                        Bathrooms
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-1.5 text-secondary text-xs font-semibold">
                        <Maximize2 className="w-4 h-4 text-accent" />
                        <span>{formatNumber(prop.area_sqft)}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1 font-mono">
                        Sq Ft
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-7 pb-7 pt-0 flex items-center space-x-3">
                <button
                  onClick={() => onSelectProperty(prop)}
                  className="flex-1 bg-primary hover:bg-secondary text-white text-xs font-semibold uppercase tracking-wider py-3.5 rounded-2xl transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <span>Inspect Residence</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                </button>

                <Link
                  href={`/book-viewing?property=${encodeURIComponent(prop.title)}`}
                  title="Book Private Viewing"
                  className="p-3.5 rounded-2xl bg-accent/15 hover:bg-accent text-accent-dark hover:text-primary transition-all flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
