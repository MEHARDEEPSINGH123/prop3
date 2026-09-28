'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { StatisticItem } from '../types/database'
import { formatNumber } from '../lib/format'

interface PropertyStatisticsProps {
  statistics?: StatisticItem[]
}

function CounterNumber({
  value,
  prefix = '',
  suffix = '',
  isDecimal = false,
}: {
  value: number
  prefix?: string
  suffix?: string
  isDecimal?: boolean
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const duration = 2000 // ms

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const current = isDecimal
        ? parseFloat((easeProgress * value).toFixed(1))
        : Math.floor(easeProgress * value)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, isDecimal])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isDecimal ? displayValue.toFixed(1) : formatNumber(displayValue)}
      {suffix}
    </span>
  )
}

export default function PropertyStatistics({ statistics }: PropertyStatisticsProps) {
  if (!statistics || statistics.length === 0) return null

  return (
    <section id="statistics" className="py-28 md:py-40 bg-primary text-white relative overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full border-t border-b border-white grid grid-cols-2 md:grid-cols-6 divide-x divide-white" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                Chapter 03 · Benchmark Metrics
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
              A Legacy of Unrivalled Volume & Trust
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-lg font-sans leading-relaxed">
            Guiding high-net-worth families, international trusts, and discerning collectors in securing Singapore’s most iconic generational sanctuaries.
          </p>
        </div>

        {/* 6 Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {statistics.map((stat, idx) => (
            <motion.div
              key={stat.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-white/10 hover:border-accent/50 transition-all duration-500 shadow-luxury hover:bg-neutral-900 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

              <span className="text-[10px] font-mono tracking-widest uppercase text-accent block mb-4">
                0{idx + 1} // {stat.label}
              </span>

              <div className="font-hero text-6xl sm:text-7xl text-white tracking-wider mb-3 group-hover:text-accent-light transition-colors">
                <CounterNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                />
              </div>

              <h3 className="font-serif text-xl text-white mb-2.5 font-medium">
                {stat.label}
              </h3>

              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
