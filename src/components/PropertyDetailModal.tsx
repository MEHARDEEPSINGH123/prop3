'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Building,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import type { FeaturedProperty } from '../types/database'
import { formatNumber, formatCurrency } from '../lib/format'

interface PropertyDetailModalProps {
  property: FeaturedProperty | null
  onClose: () => void
  onBookViewing?: (propertyTitle: string) => void
}

export default function PropertyDetailModal({
  property,
  onClose,
}: PropertyDetailModalProps) {
  useEffect(() => {
    if (!property) return
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = 'unset'
      document.documentElement.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [property, onClose])

  if (!property) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#0E111A] text-white rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/20 flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-accent flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto no-scrollbar flex-1">
            {/* Header Image Hero */}
            <div className="relative aspect-[16/9] w-full bg-neutral-900">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="text-xs uppercase font-mono tracking-widest text-accent bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                  {property.availability}
                </span>
                <span className="text-xs uppercase font-mono tracking-widest text-white bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10">
                  {property.district || property.location}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-mono tracking-widest text-accent block mb-1">
                  {property.property_type} · Designed by {property.architect || 'Award-Winning Architect'}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                  {property.title}
                </h2>
                <div className="mt-2 flex items-center space-x-2 text-sm text-neutral-300 font-mono">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Top Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                    Acquisition Price
                  </span>
                  <span className="font-serif text-2xl font-bold text-accent">
                    {property.price_formatted || `S$ ${(property.price_sgd / 1000000).toFixed(1)}M`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                    Total Footprint
                  </span>
                  <span className="font-serif text-xl font-bold text-white flex items-center space-x-1.5 mt-0.5">
                    <Maximize2 className="w-4 h-4 text-accent" />
                    <span>{formatNumber(property.area_sqft)} sq ft</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                    Suites & Baths
                  </span>
                  <span className="font-serif text-xl font-bold text-white flex items-center space-x-1.5 mt-0.5">
                    <Bed className="w-4 h-4 text-accent" />
                    <span>{property.bedrooms} Bed / {property.bathrooms} Bath</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-neutral-400 tracking-wider block">
                    Handover Status
                  </span>
                  <span className="font-serif text-lg font-bold text-white flex items-center space-x-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{property.completion_date || 'Immediate'}</span>
                  </span>
                </div>
              </div>

              {/* Architectural Narrative */}
              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-accent font-bold mb-2">
                  Architectural Narrative & Spatial Philosophy
                </h4>
                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Highlights */}
              {property.highlights && property.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-widest text-accent font-bold mb-3">
                    Curated Signature Appointments
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {property.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-start space-x-2.5 text-xs text-neutral-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="font-medium leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Investment Trajectory */}
              {property.investment_potential && (
                <div className="p-4 rounded-2xl bg-accent/10 border border-accent/25 flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase font-mono text-accent font-bold tracking-wider block">
                      Institutional Investment Thesis
                    </span>
                    <p className="text-xs text-neutral-300 font-medium mt-1 leading-relaxed">
                      {property.investment_potential}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-[#090A0F]/90 border-t border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 font-sans">
              Private client representation by <span className="text-white font-semibold">Haute Terres Partners</span>.
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/15 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                Close
              </button>

              <Link
                href={`/book-viewing?property=${encodeURIComponent(property.title)}`}
                onClick={onClose}
                className="flex-1 sm:flex-none bg-accent hover:bg-accent/90 text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-luxury-hover font-mono"
              >
                <span>Enter Viewing Salon</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
