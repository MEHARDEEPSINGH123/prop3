'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Scale,
  MapPin,
  Maximize2,
  Calendar,
  Sparkles,
  TrendingUp,
  Building,
  Check,
  ChevronDown
} from 'lucide-react'
import type { ProjectComparison } from '../types/database'

interface ProjectComparisonProps {
  comparisons: ProjectComparison[]
  onSelectForViewing?: (projectName: string) => void
}

export default function ProjectComparison({
  comparisons,
}: ProjectComparisonProps) {
  // Allow toggling active comparisons
  const [selectedIds, setSelectedIds] = useState<string[]>(
    comparisons.slice(0, 3).map((c) => c.comparison_id)
  )

  if (!comparisons || comparisons.length === 0) return null

  const toggleComparison = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((item) => item !== id))
      }
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const activeProjects = comparisons.filter((c) =>
    selectedIds.includes(c.comparison_id)
  )

  return (
    <section id="comparison" className="py-28 md:py-40 bg-canvas text-primary relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                Chapter 07 · Analytical Architecture
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary font-normal leading-[1.08]">
              Project Comparison Matrix
            </h2>
          </div>
          <p className="text-sm text-secondary max-w-lg font-sans leading-relaxed">
            Evaluate specifications side-by-side across price point, spatial footprint, investment trajectories, and private amenities.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-10 bg-white p-4 rounded-3xl border border-borderSubtle shadow-sm">
          <span className="text-xs uppercase font-mono text-neutral-400 tracking-wider ml-2">
            Select to Compare:
          </span>
          {comparisons.map((c) => {
            const isActive = selectedIds.includes(c.comparison_id)
            return (
              <button
                key={c.comparison_id}
                onClick={() => toggleComparison(c.comparison_id)}
                className={`px-4 py-2 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-neutral-50 text-secondary hover:bg-neutral-100 border-borderSubtle'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-accent' : 'bg-neutral-300'
                  }`}
                />
                <span>{c.project_name}</span>
              </button>
            )
          })}
        </div>

        {/* Comparison Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(
            activeProjects.length,
            4
          )} gap-8 items-stretch`}
          style={{
            gridTemplateColumns: `repeat(${activeProjects.length}, minmax(0, 1fr))`,
          }}
        >
          {activeProjects.map((project, idx) => (
            <motion.div
              key={project.comparison_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-borderSubtle shadow-luxury hover:border-accent/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.project_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-accent border border-white/15">
                    {project.property_type}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-serif text-2xl font-bold block leading-tight">
                      {project.project_name}
                    </span>
                    <span className="text-xs text-neutral-300 flex items-center space-x-1 mt-1 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{project.location}</span>
                    </span>
                  </div>
                </div>

                {/* 8 Required Comparison Fields */}
                <div className="p-7 space-y-4 text-xs">
                  {/* Field 1: Price */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      1. Acquisition Price
                    </span>
                    <span className="font-serif text-2xl font-bold text-accent">
                      {project.price}
                    </span>
                  </div>

                  {/* Field 2: Location */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      2. District & Enclave
                    </span>
                    <span className="font-medium text-primary text-sm">
                      {project.location}
                    </span>
                  </div>

                  {/* Field 3: Property Type */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      3. Architectural Typology
                    </span>
                    <span className="font-medium text-primary text-sm flex items-center space-x-1.5">
                      <Building className="w-3.5 h-3.5 text-accent" />
                      <span>{project.property_type}</span>
                    </span>
                  </div>

                  {/* Field 4: Area */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      4. Total Footprint / Area
                    </span>
                    <span className="font-bold text-primary text-sm flex items-center space-x-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-accent" />
                      <span>{project.area}</span>
                    </span>
                  </div>

                  {/* Field 5: Availability */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      5. Allocation Status
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-accent/15 text-accent-dark">
                      {project.availability}
                    </span>
                  </div>

                  {/* Field 6: Completion Date */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      6. Completion / Handover
                    </span>
                    <span className="font-medium text-primary text-sm flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{project.completion_date}</span>
                    </span>
                  </div>

                  {/* Field 7: Investment Potential */}
                  <div className="pb-3 border-b border-borderSubtle">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1">
                      7. Investment Potential
                    </span>
                    <span className="font-medium text-primary text-xs flex items-start space-x-1.5 leading-relaxed">
                      <TrendingUp className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{project.investment_potential}</span>
                    </span>
                  </div>

                  {/* Field 8: Facilities */}
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-1.5">
                      8. Signature Facilities
                    </span>
                    <p className="text-secondary text-xs leading-relaxed bg-neutral-50 p-3 rounded-2xl border border-borderSubtle">
                      {project.facilities}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Schedule CTA */}
              <div className="p-7 pt-0">
                <Link
                  href={`/book-viewing?property=${encodeURIComponent(project.project_name)}`}
                  className="w-full bg-primary hover:bg-secondary text-white font-semibold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Book Private Tour</span>
                  <Check className="w-3.5 h-3.5 text-accent" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
