'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { TestimonialItem } from '../types/database'

interface TestimonialsProps {
  testimonials: TestimonialItem[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-28 md:py-40 bg-[#090A0F] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
            Client Endorsements & Patronage
          </span>
        </div>

        <div className="max-w-3xl mb-16 lg:mb-20">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
            Voices of Discerning Patrons
          </h2>
          <p className="text-sm text-neutral-400 mt-3 font-sans leading-relaxed">
            Reflections from international collectors, private offices, and families who acquired their generational residences with Haute Terres.
          </p>
        </div>

        {/* Large Quote Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={test.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-white/[0.04] backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-accent/50 transition-all duration-300 flex flex-col justify-between relative text-white"
            >
              <div>
                <Quote className="w-10 h-10 text-accent/40 mb-6" />

                <blockquote className="font-serif text-xl sm:text-2xl text-neutral-200 italic leading-relaxed mb-8">
                  &ldquo;{test.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="font-bold text-white text-sm font-sans">
                  {test.author}
                </h4>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  {test.title}
                </p>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-accent">
                  <span>{test.property}</span>
                  <span className="text-neutral-400">{test.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
