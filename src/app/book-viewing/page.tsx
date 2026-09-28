'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  Car,
  Wine,
  Building,
  ChevronDown,
  ArrowRight,
  Maximize2,
  MapPin,
  Compass,
  Check,
  Download,
  Share2
} from 'lucide-react'
import { getFeaturedProperties, getViewingAppointments, getAgents } from '../../lib/data'
import { formatNumber, formatCurrency } from '../../lib/format'
import type { FeaturedProperty, ViewingAppointment, Agent } from '../../types/database'
import LuxuryDropdown from '../../components/LuxuryDropdown'

const chauffeurOptions = [
  { value: 'Rolls-Royce Spectre', label: 'Rolls-Royce Spectre', sublabel: 'Electric Ultra-Luxury' },
  { value: 'Rolls-Royce Ghost', label: 'Rolls-Royce Ghost Extended', sublabel: 'V12 Twin-Turbo Chauffeur' },
  { value: 'Mercedes-Maybach S680', label: 'Mercedes-Maybach S 680', sublabel: 'First-Class Rear Suite' },
  { value: 'Bentley Flying Spur', label: 'Bentley Flying Spur Mulliner', sublabel: 'Handcrafted Grand Tourer' },
  { value: 'Self-Arrival', label: 'Self-Arrival', sublabel: 'Subterranean Supercar Bay Reserved' },
]

const champagneOptions = [
  { value: 'Dom Pérignon Vintage 2015', label: 'Dom Pérignon Vintage 2015', sublabel: 'Grand Vintage Champagne' },
  { value: 'Krug Grande Cuvée 171ème', label: 'Krug Grande Cuvée 171ème Édition', sublabel: 'Iconic Multi-Vintage Prestige' },
  { value: 'Louis Roederer Cristal 2014', label: 'Louis Roederer Cristal 2014', sublabel: 'Cellar Master Selection' },
  { value: 'Rare Tea & Mineral Water', label: 'Artisanal Rare Tea & Sparkling Mineral Pairing', sublabel: 'Non-Alcoholic Botanical Pairing' },
]

function BookViewingContent() {
  const searchParams = useSearchParams()
  const initialPropertyName = searchParams.get('property') || ''

  const properties = getFeaturedProperties()
  const slots = getViewingAppointments()
  const agents = getAgents()

  // Selected state
  const [selectedPropertyTitle, setSelectedPropertyTitle] = useState<string>(
    initialPropertyName || (properties[0] ? properties[0].title : '')
  )

  const activeProperty =
    properties.find((p) => p.title.toLowerCase() === selectedPropertyTitle.toLowerCase()) ||
    properties[0]

  // Viewing Format Typology
  const viewingFormats = [
    {
      id: 'sunset',
      title: 'Golden Hour Sunset & Champagne Salon',
      duration: '90 Minutes',
      description: 'Experience panoramic dusk vistas, sunset lighting across master terraces, and private sommelier pairing.',
      badge: 'Most Revered',
    },
    {
      id: 'morning',
      title: 'Morning Solar Light & Architectural Study',
      duration: '75 Minutes',
      description: 'Detailed analysis of natural daylight penetration, material acoustic resonance, and structural finishes.',
      badge: 'Architects Favorite',
    },
    {
      id: 'executive',
      title: 'Executive Fast-Track & Structural Vault Inspection',
      duration: '60 Minutes',
      description: 'High-efficiency private walkthrough focusing on biometric systems, supercar gallery, and security.',
      badge: 'Private Office',
    },
    {
      id: 'marine',
      title: 'Helicopter Touchdown & Deep Ocean Berth Tour',
      duration: '120 Minutes',
      description: 'Exclusive marina berth walkthrough, private yacht mooring assessment, and coastal aerial perspective.',
      badge: 'Waterfront Special',
    },
  ]

  const [selectedFormatId, setSelectedFormatId] = useState<string>('sunset')

  // Calendar dates
  const availableDates = Array.from(new Set(slots.map((s) => s.date)))
  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0] || '2026-10-01')

  // Time Slots
  const slotsForDate = slots.filter((s) => s.date === selectedDate)
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    slotsForDate[0] ? slotsForDate[0].slot_id : 'VA001'
  )

  // Agent
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0] ? agents[0].id : 'AG01')
  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0]

  // Bespoke Concierge Preferences
  const [chauffeurOption, setChauffeurOption] = useState<string>('Rolls-Royce Spectre')
  const [champagneOption, setChampagneOption] = useState<string>('Dom Pérignon Vintage 2015')
  const [requireNda, setRequireNda] = useState<boolean>(true)

  // Form Fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // Confirmation state
  const [isBooked, setIsBooked] = useState(false)
  const [bookingPassCode, setBookingPassCode] = useState('')

  useEffect(() => {
    if (initialPropertyName) {
      const found = properties.find(
        (p) => p.title.toLowerCase() === initialPropertyName.toLowerCase()
      )
      if (found) {
        setSelectedPropertyTitle(found.title)
      }
    }
  }, [initialPropertyName, properties])

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !phone) {
      alert('Please provide your name, direct contact, and private email.')
      return
    }

    const code = `HT-${Math.floor(100000 + Math.random() * 900000)}`
    setBookingPassCode(code)
    setIsBooked(true)

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#B8956A', '#D4B892', '#111111', '#FFFFFF'],
      })
    } catch {
      // fallback
    }
  }

  const activeFormat = viewingFormats.find((f) => f.id === selectedFormatId) || viewingFormats[0]
  const activeSlot = slots.find((s) => s.slot_id === selectedSlotId) || slots[0]

  return (
    <div className="min-h-screen bg-canvas text-white relative selection:bg-accent selection:text-black">
      {/* Top Architectural Masthead */}
      <header className="sticky top-0 z-40 bg-[#090A0F]/85 backdrop-blur-2xl border-b border-white/10 text-white py-4 px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-accent transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4 text-accent" />
          <span>Return to Portfolio</span>
        </Link>

        <div className="flex flex-col items-center">
          <span className="font-hero text-2xl tracking-[0.25em] text-white">
            HAUTE TERRES
          </span>
          <span className="text-[8px] tracking-[0.4em] text-accent uppercase font-mono -mt-1">
            Private Client Viewing Salon
          </span>
        </div>

        <a
          href="tel:+6568902888"
          className="hidden sm:flex items-center space-x-2 text-xs text-neutral-300 hover:text-white bg-white/[0.06] border border-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md"
        >
          <Phone className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-[11px]">+65 6890 2888</span>
        </a>
      </header>

      {/* Main Container with Generous Breathing Room */}
      <main className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-12 lg:py-20">
        {!isBooked ? (
          <div>
            {/* Page Header Introduction */}
            <div className="max-w-3xl mb-14 lg:mb-20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-[1px] w-12 bg-accent" />
                <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                  Chapter 08 · Bespoke Access
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.06]">
                Private Client Viewing Salon
              </h1>
              <p className="text-base text-neutral-400 mt-4 font-sans leading-relaxed">
                Step inside an unhurried, multisensory inspection orchestrated exclusively for you. Every residence visit includes private chauffeur transport, confidential documentation, and direct representation by our Senior Partners.
              </p>
            </div>

            {/* Spatial Layout: Dossier Left (Sticky), Interactive Salon Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Selected Residence Dossier */}
              <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                <div className="bg-white/[0.04] backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-6 sm:p-8 space-y-6">
                  {/* Property Selector Dropdown */}
                  <div>
                    <label className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 block mb-2">
                      Active Residence Dossier
                    </label>
                    <LuxuryDropdown
                      value={selectedPropertyTitle}
                      onChange={setSelectedPropertyTitle}
                      options={properties.map((p) => ({
                        value: p.title,
                        label: `${p.title} · ${p.location}`,
                        sublabel: p.price_formatted || `S$ ${(p.price_sgd / 1000000).toFixed(1)}M`,
                      }))}
                      fontSerif={true}
                      theme="dark"
                      className="rounded-2xl text-base sm:text-lg"
                    />
                  </div>

                  {/* Residence Image Showcase */}
                  {activeProperty && (
                    <div className="rounded-2xl overflow-hidden aspect-[16/11] relative bg-neutral-900 border border-white/10 shadow-sm">
                      <img
                        src={activeProperty.image}
                        alt={activeProperty.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase text-accent border border-white/20">
                        {activeProperty.availability}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="font-serif text-2xl font-bold block leading-tight">
                          {activeProperty.title}
                        </span>
                        <span className="text-xs text-neutral-300 flex items-center space-x-1.5 mt-1 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span>{activeProperty.location} ({activeProperty.district})</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Architectural Specs Strip */}
                  {activeProperty && (
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                          Acquisition Price
                        </span>
                        <span className="font-serif text-xl font-bold text-accent">
                          {activeProperty.price_formatted || `S$ ${(activeProperty.price_sgd / 1000000).toFixed(1)}M`}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                          Floor Footprint
                        </span>
                        <span className="font-serif text-xl font-bold text-white">
                          {formatNumber(activeProperty.area_sqft)} sq ft
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                          Typology
                        </span>
                        <span className="font-medium text-neutral-300">
                          {activeProperty.property_type}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                          Architectural Lead
                        </span>
                        <span className="font-medium text-neutral-300">
                          {activeProperty.architect || 'Curated Architect'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Protocol Inclusions */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-accent font-bold block">
                      The Haute Terres Protocol Inclusions
                    </span>
                    <div className="space-y-2 text-xs text-neutral-300">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span>Private 1-on-1 walkthrough with Senior Advisory Partner</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span>Leather-bound confidential architectural monograph & deed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span>Complimentary Rolls-Royce / Maybach chauffeur door-to-door transfer</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                        <span>Sommelier-guided champagne tasting upon arrival</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-Step Interactive Salon */}
              <div className="lg:col-span-7 space-y-12">
                <form onSubmit={handleBookingSubmit} className="space-y-12">
                  {/* STEP 1: Viewing Format */}
                  <div className="bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-accent text-black font-mono text-xs font-bold flex items-center justify-center">
                          01
                        </div>
                        <h3 className="font-serif text-2xl text-white font-medium">
                          Select Viewing Experience Format
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">
                        Tailored Immersion
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {viewingFormats.map((fmt) => {
                        const isSelected = selectedFormatId === fmt.id
                        return (
                          <div
                            key={fmt.id}
                            onClick={() => setSelectedFormatId(fmt.id)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative flex flex-col justify-between ${
                              isSelected
                                ? 'border-accent bg-accent/10 ring-1 ring-accent shadow-sm'
                                : 'border-white/10 bg-white/[0.02] hover:border-accent/50'
                            }`}
                          >
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent font-bold">
                                  {fmt.badge}
                                </span>
                                <span className="text-[11px] font-mono text-neutral-400">
                                  {fmt.duration}
                                </span>
                              </div>
                              <h4 className="font-serif text-lg font-bold text-white mb-1">
                                {fmt.title}
                              </h4>
                              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                {fmt.description}
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end">
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                  isSelected ? 'bg-accent text-black' : 'border border-white/30'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* STEP 2: Appointment Date & Time Slots */}
                  <div className="bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-black font-mono text-xs font-bold flex items-center justify-center">
                        02
                      </div>
                      <h3 className="font-serif text-2xl text-white font-medium">
                        Schedule Date & Private Time Slot
                      </h3>
                    </div>

                    {/* Date Picker Grid */}
                    <div>
                      <label className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 block mb-3">
                        Curated Inspection Dates
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {availableDates.map((dateStr) => {
                          const isSelected = selectedDate === dateStr
                          const dateObj = new Date(dateStr)
                          const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                          const dayNum = dateObj.getDate()
                          const monthName = dateObj.toLocaleDateString('en-US', { month: 'short' })

                          return (
                            <button
                              key={dateStr}
                              type="button"
                              onClick={() => setSelectedDate(dateStr)}
                              className={`p-4 rounded-2xl border text-center transition-all ${
                                isSelected
                                  ? 'border-accent bg-accent text-black font-bold shadow-luxury-hover'
                                  : 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/30'
                              }`}
                            >
                              <span className={`text-[10px] uppercase font-mono tracking-widest block ${isSelected ? 'text-black/80' : 'text-accent'}`}>
                                {dayName}
                              </span>
                              <span className="font-serif text-2xl font-bold block my-1">
                                {dayNum} {monthName}
                              </span>
                              <span className={`text-[10px] font-mono ${isSelected ? 'text-black/70' : 'opacity-60'}`}>
                                {dateStr}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <label className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 block mb-3">
                        Exclusive Reserved Slots on {selectedDate}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {slotsForDate.map((slot) => {
                          const isSelected = selectedSlotId === slot.slot_id
                          return (
                            <button
                              key={slot.slot_id}
                              type="button"
                              onClick={() => setSelectedSlotId(slot.slot_id)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? 'border-accent bg-accent/15 ring-1 ring-accent text-white'
                                  : 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/30'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-mono text-base font-bold text-accent">
                                  {slot.time} hrs
                                </span>
                                <span className="text-[9px] uppercase font-mono px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                                  {slot.status}
                                </span>
                              </div>
                              <span className="text-xs text-neutral-300 font-medium block">
                                {slot.session_name || 'Bespoke Private Walkthrough'}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* STEP 3: Private Advisory Partner Selection */}
                  <div className="bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-black font-mono text-xs font-bold flex items-center justify-center">
                        03
                      </div>
                      <h3 className="font-serif text-2xl text-white font-medium">
                        Assign Host Private Advisory Partner
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {agents.map((ag) => {
                        const isSelected = selectedAgentId === ag.id
                        return (
                          <div
                            key={ag.id}
                            onClick={() => setSelectedAgentId(ag.id)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center space-x-4 ${
                              isSelected
                                ? 'border-accent bg-accent/15 ring-1 ring-accent shadow-sm'
                                : 'border-white/10 bg-white/[0.02] hover:border-accent/40'
                            }`}
                          >
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent shrink-0">
                              <img
                                src={ag.image}
                                alt={ag.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block">
                                {ag.experience} · {ag.volume}
                              </span>
                              <h4 className="font-serif text-lg font-bold text-white truncate">
                                {ag.name}
                              </h4>
                              <p className="text-xs text-neutral-300 truncate">
                                {ag.title}
                              </p>
                              <span className="text-[10px] text-neutral-400 font-mono block mt-1">
                                Languages: {ag.languages.join(', ')}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* STEP 4: Bespoke VIP Concierge Preferences */}
                  <div className="bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-black font-mono text-xs font-bold flex items-center justify-center">
                        04
                      </div>
                      <h3 className="font-serif text-2xl text-white font-medium">
                        VIP Concierge & Arrival Preferences
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Chauffeur Option */}
                      <div>
                        <label className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 block mb-2 flex items-center space-x-1.5">
                          <Car className="w-3.5 h-3.5 text-accent" />
                          <span>Chauffeured Transfer Fleet</span>
                        </label>
                        <LuxuryDropdown
                          value={chauffeurOption}
                          onChange={setChauffeurOption}
                          options={chauffeurOptions}
                          theme="dark"
                        />
                      </div>

                      {/* Champagne Option */}
                      <div>
                        <label className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 block mb-2 flex items-center space-x-1.5">
                          <Wine className="w-3.5 h-3.5 text-accent" />
                          <span>Sommelier Reception Pairing</span>
                        </label>
                        <LuxuryDropdown
                          value={champagneOption}
                          onChange={setChampagneOption}
                          options={champagneOptions}
                          theme="dark"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center space-x-3 text-xs text-neutral-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={requireNda}
                          onChange={(e) => setRequireNda(e.target.checked)}
                          className="rounded text-accent focus:ring-accent w-4 h-4 bg-white/10 border-white/20"
                        />
                        <span className="flex items-center space-x-1.5">
                          <ShieldCheck className="w-4 h-4 text-accent" />
                          <span className="font-medium">
                            Execute Bilateral Non-Disclosure Agreement (NDA) prior to residence entry
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* STEP 5: Patron Credentials & Final Confirmation */}
                  <div className="bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-black font-mono text-xs font-bold flex items-center justify-center">
                        05
                      </div>
                      <h3 className="font-serif text-2xl text-white font-medium">
                        Patron Credentials & Confidential Registration
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase font-mono text-neutral-400 block mb-1">
                          Full Legal Name & Salutation *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Lord Julian Sterling / Lady Valerie"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white/[0.04] text-white placeholder-neutral-500 text-xs rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] uppercase font-mono text-neutral-400 block mb-1">
                          Direct Private Contact Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+65 9876 5432"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-white/[0.04] text-white placeholder-neutral-500 text-xs rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase font-mono text-neutral-400 block mb-1">
                        Direct Email Address (For Digital Access Token) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="julian@familyoffice.sg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/[0.04] text-white placeholder-neutral-500 text-xs rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase font-mono text-neutral-400 block mb-1">
                        Special Security or Dietary Inquiries (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Helipad clearance, specific wing walkthrough, foreign currency advisory, or family trust structuring notes..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full bg-white/[0.04] text-white placeholder-neutral-500 text-xs rounded-xl px-4 py-3 border border-white/15 focus:outline-none focus:border-accent"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-black font-bold text-xs uppercase tracking-[0.2em] py-5 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-luxury-hover font-mono cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Issue Haute Terres VIP Viewing Pass</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* ISSUED VIP DIGITAL ACCESS PASS */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-[#0C0E17]/95 backdrop-blur-2xl text-white p-8 sm:p-14 rounded-3xl border border-accent/40 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-bl-full pointer-events-none" />

            {/* Header Badge */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-full bg-accent text-black flex items-center justify-center mx-auto mb-5 shadow-luxury">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-accent font-bold block mb-1">
                Official VIP Viewing Pass
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
                Reservation Confirmed
              </h2>
              <div className="inline-block mt-3 font-mono text-sm bg-accent/10 px-5 py-1.5 rounded-full text-accent border border-accent/30">
                TOKEN: {bookingPassCode}
              </div>
            </div>

            {/* Pass Body Dossier */}
            <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4 text-xs mb-8">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-neutral-400 uppercase font-mono">Designated Residence</span>
                <span className="font-serif font-bold text-white text-base text-right">{activeProperty?.title}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-neutral-400 uppercase font-mono">Enclave & District</span>
                <span className="text-neutral-200 font-mono">{activeProperty?.location} ({activeProperty?.district})</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-neutral-400 uppercase font-mono">Walkthrough Format</span>
                <span className="text-accent font-medium">{activeFormat.title}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-neutral-400 uppercase font-mono">Date & Private Slot</span>
                <span className="font-mono text-accent font-bold text-sm">
                  {selectedDate} · {activeSlot.time} hrs
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-neutral-400 uppercase font-mono">Assigned Private Partner</span>
                <span className="text-white font-serif font-bold">{activeAgent?.name} ({activeAgent?.title})</span>
              </div>

              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-neutral-400 uppercase font-mono">Chauffeur Transport</span>
                <span className="text-emerald-400 font-mono">{chauffeurOption}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-neutral-400 uppercase font-mono">Security Status</span>
                <span className="text-emerald-400 font-mono">
                  {requireNda ? 'NDA Clearance Dispatched' : 'Standard Discretion Protocol'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <Link
                href="/"
                className="text-xs uppercase font-mono tracking-widest text-accent hover:text-white transition-colors"
              >
                ← Return to Main Gallery
              </Link>

              <button
                type="button"
                onClick={() => window.print()}
                className="bg-accent hover:bg-accent/90 text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition-all flex items-center space-x-2 font-mono"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Save Digital Pass</span>
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}

export default function BookViewingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-canvas flex items-center justify-center text-primary font-mono text-xs">
          Loading Viewing Salon...
        </div>
      }
    >
      <BookViewingContent />
    </Suspense>
  )
}
