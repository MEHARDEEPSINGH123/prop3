'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight, DollarSign, Building } from 'lucide-react'
import type { FeaturedLocation } from '../types/database'

interface FeaturedLocationsProps {
  locations: FeaturedLocation[]
  onSelectDistrict?: (districtName: string) => void
}

export default function FeaturedLocations({
  locations,
  onSelectDistrict,
}: FeaturedLocationsProps) {
  if (!locations || locations.length === 0) return null

  return (
    <section id="locations" className="py-28 md:py-40 bg-[#090A0F] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                Prime Singapore Enclaves & Cartography
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
              Singapore’s Most Revered Enclaves
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-lg font-sans leading-relaxed">
            Prime residential districts steeped in architectural prestige, diplomatic proximity, and multi-generational land scarcity.
          </p>
        </div>

        {/* 4 Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white/[0.04] backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-accent/50 hover:shadow-[0_25px_60px_rgba(223,183,118,0.2)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between text-white"
            >
              <div>
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative bg-neutral-900">
                  <img
                    src={loc.image}
                    alt={loc.district}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-accent border border-white/10">
                    {loc.availability}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="font-serif text-xl sm:text-2xl font-bold block">
                      {loc.district}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3.5">
                  <div className="pb-3 border-b border-white/10">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
                      Average Price Metric
                    </span>
                    <span className="font-serif text-lg font-bold text-accent">
                      {loc.average_price}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono block">
                      ({loc.average_price_label})
                    </span>
                  </div>

                  <div className="pb-3 border-b border-white/10">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
                      Signature Anchor Property
                    </span>
                    <span className="text-xs font-semibold text-white flex items-center space-x-1.5 mt-0.5">
                      <Building className="w-3.5 h-3.5 text-accent" />
                      <span>{loc.featured_property}</span>
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                    {loc.character}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-5 pt-0">
                <a
                  href="#top-picks"
                  onClick={() => onSelectDistrict && onSelectDistrict(loc.district)}
                  className="w-full bg-white/10 hover:bg-accent hover:text-[#090A0F] text-white border border-white/15 text-xs font-semibold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                >
                  <span>Explore Enclave</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:text-[#090A0F]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
