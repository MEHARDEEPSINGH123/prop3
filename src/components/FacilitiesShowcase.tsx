'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Waves,
  Dumbbell,
  CloudSun,
  ShieldCheck,
  Cpu,
  Car,
  Trees,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Maximize2
} from 'lucide-react'
import type { FacilityItem } from '../types/database'

interface FacilitiesShowcaseProps {
  facilities: FacilityItem[]
}

const facilityIcons: Record<string, React.ReactNode> = {
  'Swimming Pool': <Waves className="w-5 h-5 text-accent" />,
  'Gym': <Dumbbell className="w-5 h-5 text-accent" />,
  'Sky Lounge': <CloudSun className="w-5 h-5 text-accent" />,
  'Security': <ShieldCheck className="w-5 h-5 text-accent" />,
  'Smart Home': <Cpu className="w-5 h-5 text-accent" />,
  'Parking': <Car className="w-5 h-5 text-accent" />,
  'Garden': <Trees className="w-5 h-5 text-accent" />,
  'Business Lounge': <Briefcase className="w-5 h-5 text-accent" />,
}

export default function FacilitiesShowcase({ facilities }: FacilitiesShowcaseProps) {
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem>(facilities[0] || null)

  if (!facilities || facilities.length === 0) return null

  return (
    <section id="facilities" className="py-28 md:py-40 bg-[#090A0F] text-white relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                Private World-Class Amenities & Wellness
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
              Private World-Class Facilities
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-lg font-sans leading-relaxed">
            Engineered with uncompromising precision. From cantilevered horizon pools to biometric supercar vaults, private living transcends ordinary standards.
          </p>
        </div>

        {/* Feature Spotlight Banner (Interactive Hero of Facilities) */}
        {selectedFacility && (
          <div className="mb-16 bg-white/[0.04] backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Image Left */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedFacility.id}
                    src={selectedFacility.image}
                    alt={selectedFacility.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  <span className="text-xs uppercase tracking-widest text-accent font-mono">
                    Spotlight Facility
                  </span>
                </div>
              </div>

              {/* Content Right */}
              <div className="lg:col-span-5 p-8 lg:p-12 space-y-6">
                <div className="flex items-center space-x-3 text-accent">
                  {facilityIcons[selectedFacility.name] || <Sparkles className="w-5 h-5 text-accent" />}
                  <span className="text-xs uppercase tracking-widest font-mono">
                    {selectedFacility.category}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                    Amenity · {selectedFacility.name}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal">
                    {selectedFacility.title}
                  </h3>
                </div>

                <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                  {selectedFacility.description}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-accent block mb-1">
                    Architectural Specifications
                  </span>
                  <p className="text-xs text-neutral-300 font-medium">
                    {selectedFacility.specs}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8 Facilities Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => {
            const isSelected = selectedFacility?.id === fac.id
            return (
              <motion.div
                key={fac.id || idx}
                onClick={() => setSelectedFacility(fac)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 relative flex flex-col justify-between backdrop-blur-xl ${
                  isSelected
                    ? 'border-accent bg-white/[0.08] shadow-[0_0_20px_rgba(223,183,118,0.3)] ring-1 ring-accent'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]'
                }`}
              >
                {/* Large Card Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    {facilityIcons[fac.name] || <Sparkles className="w-4 h-4 text-accent" />}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-accent block">
                      {fac.name}
                    </span>
                    <span className="text-xs font-semibold text-white truncate block">
                      {fac.title}
                    </span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                    {fac.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-accent">
                    <span className="font-mono">{isSelected ? 'Active Spotlight' : 'Click to inspect'}</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
