'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Compass, Eye, ShieldCheck, Feather } from 'lucide-react'
import type { OurStory as OurStoryType } from '../types/database'

interface OurStoryProps {
  story?: OurStoryType
}

export default function OurStory({ story }: OurStoryProps) {
  if (!story) return null

  return (
    <section id="our-story" className="py-28 md:py-44 bg-canvas text-primary relative overflow-hidden">
      {/* Decorative Editorial Watermark */}
      <div className="absolute top-16 right-6 md:right-16 select-none pointer-events-none opacity-5">
        <span className="font-hero text-8xl md:text-[180px] leading-none text-primary">
          HERITAGE
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header Tag */}
        <div className="flex items-center space-x-3 mb-14 lg:mb-20">
          <div className="h-[1px] w-12 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
            The Atelier Manifesto · Heritage & Philosophy
          </span>
        </div>

        {/* Editorial Layout: Large Image Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Asymmetrical Editorial Photography */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Main Primary Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-neutral-200 aspect-[4/5] relative">
                <img
                  src={story.image_story || 'https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'}
                  alt="Architectural atelier residence"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-mega text-accent font-mono block">
                    Curated Residence
                  </span>
                  <span className="font-serif text-xl text-white">
                    Private Sanctuary at Nassim Hill
                  </span>
                </div>
              </div>

              {/* Overlapping Secondary Detail Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden sm:block absolute -bottom-10 -right-6 md:-right-10 w-60 md:w-72 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#0F121C]/90 backdrop-blur-2xl p-4 text-white"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <img
                    src={story.image_detail || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'}
                    alt="Interior craft detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-1 pb-1">
                  <span className="text-[9px] uppercase tracking-widest text-accent font-bold block">
                    Material Integrity
                  </span>
                  <span className="text-xs text-neutral-300 font-medium">
                    Hand-chiselled Roman travertine & aged bronze accents
                  </span>
                </div>
              </motion.div>

              {/* Experience Badge */}
              <div className="absolute -top-6 -left-4 sm:-left-6 bg-[#0F121C]/90 backdrop-blur-xl text-white py-3.5 px-6 rounded-2xl shadow-xl border border-white/15 flex items-center space-x-3.5">
                <Award className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-hero text-2xl tracking-wider text-accent leading-none">
                    24 YEARS
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-neutral-400 mt-0.5">
                    Bespoke Advisory
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Storytelling Content */}
          <div className="lg:col-span-6 space-y-9">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white leading-[1.08] font-normal tracking-tight">
                {story.title}
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mt-4">
                {story.subtitle}
              </p>
            </motion.div>

            {/* Editorial Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="border-l-2 border-accent pl-6 py-2"
            >
              <p className="font-serif text-xl sm:text-2xl text-neutral-300 italic leading-relaxed">
                &ldquo;{story.lead_quote}&rdquo;
              </p>
            </motion.blockquote>

            {/* Three Editorial Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="space-y-4 pt-2"
            >
              {/* Pillar 1: Vision */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-1">
                  <Compass className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-white mb-1.5">
                    Company Vision
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    {story.company_vision}
                  </p>
                </div>
              </div>

              {/* Pillar 2: Expertise */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-white mb-1.5">
                    Property Expertise
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    {story.property_expertise}
                  </p>
                </div>
              </div>

              {/* Pillar 3: Philosophy */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all">
                <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-1">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-white mb-1.5">
                    Luxury Living Philosophy
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                    {story.luxury_philosophy}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Signature & Principals Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-borderSubtle flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-serif font-bold text-primary">
                  {story.founder_name}
                </p>
                <p className="text-xs text-neutral-500 font-sans mt-0.5">
                  {story.founder_title}
                </p>
              </div>

              <div className="flex items-center space-x-2 text-accent">
                <Feather className="w-5 h-5" />
                <span className="font-serif italic text-sm tracking-wider text-secondary">
                  Haute Terres Principals
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
