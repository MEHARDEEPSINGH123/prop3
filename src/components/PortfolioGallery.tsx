'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react'
import type { PortfolioGalleryItem } from '../types/database'

interface PortfolioGalleryProps {
  galleryItems: PortfolioGalleryItem[]
}

export default function PortfolioGallery({ galleryItems }: PortfolioGalleryProps) {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('All')

  if (!galleryItems || galleryItems.length === 0) return null

  const categories = ['All', 'Architecture & Exterior', 'Interiors & Materials', 'Living & Volumes']

  const filteredItems = filterCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filterCategory)

  const openLightbox = (idx: number) => {
    setActiveLightboxIndex(idx)
  }

  const closeLightbox = () => {
    setActiveLightboxIndex(null)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        activeLightboxIndex === 0 ? galleryItems.length - 1 : activeLightboxIndex - 1
      )
    }
  }

  return (
    <section id="gallery" className="py-28 md:py-40 bg-[#090A0F] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                Visual Anthology & Architectural Gallery
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
              Portfolio & Architectural Gallery
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-lg font-sans leading-relaxed">
            Capturing the spatial poetry of pure concrete, travertine volumes, cantilevered steel, and reflections over water.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-3 mb-10 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer backdrop-blur-xl ${
                filterCategory === cat
                  ? 'bg-accent text-[#090A0F] shadow-[0_0_15px_rgba(223,183,118,0.4)]'
                  : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Layout with Mixed Aspect Ratios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, idx) => {
            // Apply varied row spans based on aspect
            const rowSpanClass =
              item.aspect === 'tall'
                ? 'md:row-span-2'
                : item.aspect === 'wide'
                ? 'md:col-span-2'
                : 'row-span-1'

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-accent/50 transition-all ${rowSpanClass}`}
              >
                {/* Large Photography with Zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-1000 ease-out"
                />

                {/* Layered Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Floating Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 className="w-4 h-4 text-accent" />
                </div>

                {/* Floating Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Architectural Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white transform transition-transform duration-300">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300 block">
                    {item.location} · {item.architect}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white group-hover:text-accent-light transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:text-accent transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev / Next Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:text-accent transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:text-accent transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={galleryItems[activeLightboxIndex].image}
                alt={galleryItems[activeLightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl"
              />
              <div className="text-center mt-4 text-white">
                <span className="text-xs uppercase font-mono tracking-widest text-accent">
                  {galleryItems[activeLightboxIndex].category} · {galleryItems[activeLightboxIndex].location}
                </span>
                <h3 className="font-serif text-2xl font-normal mt-1">
                  {galleryItems[activeLightboxIndex].title}
                </h3>
                <span className="text-xs text-neutral-400 font-sans">
                  Architect: {galleryItems[activeLightboxIndex].architect}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
