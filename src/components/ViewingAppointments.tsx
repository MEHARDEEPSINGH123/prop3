'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
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
  ArrowRight
} from 'lucide-react'
import type { ViewingAppointment, Agent, FeaturedProperty } from '../types/database'
import LuxuryDropdown from './LuxuryDropdown'

interface ViewingAppointmentsProps {
  viewingAppointments: ViewingAppointment[]
  agents?: Agent[]
  properties: FeaturedProperty[]
  preselectedPropertyName?: string
}

export default function ViewingAppointments({
  viewingAppointments,
  agents = [],
  properties,
  preselectedPropertyName,
}: ViewingAppointmentsProps) {
  const [selectedProperty, setSelectedProperty] = useState<string>(
    preselectedPropertyName || (properties[0] ? properties[0].title : '')
  )
  const [selectedDate, setSelectedDate] = useState<string>(
    viewingAppointments[0] ? viewingAppointments[0].date : '2026-10-01'
  )
  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    viewingAppointments[0] ? viewingAppointments[0].slot_id : 'VA001'
  )
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    agents[0] ? agents[0].id : 'AG01'
  )

  // Form Fields
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [requestLimousine, setRequestLimousine] = useState(false)
  const [champagneTasting, setChampagneTasting] = useState(true)
  const [specialRequests, setSpecialRequests] = useState('')

  // Confirmation state
  const [isBooked, setIsBooked] = useState(false)
  const [bookingReference, setBookingReference] = useState('')

  // Unique dates from viewingAppointments
  const availableDates = Array.from(
    new Set(viewingAppointments.map((slot) => slot.date))
  )

  // Slots for selected date
  const slotsForDate = viewingAppointments.filter(
    (slot) => slot.date === selectedDate
  )

  const activeAgent = agents.find((a) => a.id === selectedAgentId) || agents[0]
  const activeSlot = viewingAppointments.find((s) => s.slot_id === selectedSlotId)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !phone) {
      alert('Please provide your name, email, and private contact number.')
      return
    }

    const ref = `HT-VIP-${Math.floor(100000 + Math.random() * 900000)}`
    setBookingReference(ref)
    setIsBooked(true)

    // Trigger luxury gold confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8956A', '#D4B892', '#111111', '#E5E5E5'],
      })
    } catch {
      // fallback if canvas-confetti is not loaded
    }
  }

  return (
    <section id="appointments" className="py-28 md:py-40 bg-[#090A0F] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                Chapter 08 · Private Access
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
              Curated Viewing Appointments
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-neutral-400 max-w-lg font-sans leading-relaxed">
              By private arrangement only. Every walkthrough is hosted with discreet chauffeured arrival, confidential documentation, and architectural advisory.
            </p>
            <a
              href="/book-viewing"
              className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-accent hover:text-white font-bold transition-colors"
            >
              <span>Launch Dedicated Multi-Step Viewing Salon →</span>
            </a>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              key="booking-form-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Interactive Booking Step Selection */}
              <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8 text-white">
                {/* Step 1: Property Selection (from JSON) */}
                <div>
                  <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2 flex items-center space-x-1.5">
                    <Building className="w-4 h-4 text-accent" />
                    <span>1. Select Desired Residence</span>
                  </label>
                  <LuxuryDropdown
                    value={selectedProperty}
                    onChange={setSelectedProperty}
                    options={properties.map((prop) => ({
                      value: prop.title,
                      label: `${prop.title} · ${prop.location}`,
                      sublabel: prop.price_formatted || `S$ ${(prop.price_sgd / 1000000).toFixed(1)}M`,
                    }))}
                    fontSerif={true}
                  />
                </div>

                {/* Step 2: Interactive Date Selection */}
                <div>
                  <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2 flex items-center space-x-1.5 font-mono">
                    <CalendarIcon className="w-4 h-4 text-accent" />
                    <span>2. Choose Appointment Date</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
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
                          className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-accent bg-accent text-black font-bold shadow-luxury-hover'
                              : 'border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/30 hover:bg-white/[0.06]'
                          }`}
                        >
                          <span className={`text-[10px] uppercase font-mono tracking-widest block ${isSelected ? 'text-black/80 font-bold' : 'text-accent'}`}>
                            {dayName}
                          </span>
                          <span className={`font-serif text-xl font-bold block my-0.5 ${isSelected ? 'text-black' : 'text-white'}`}>
                            {dayNum} {monthName}
                          </span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-black/70' : 'text-neutral-400'}`}>
                            {dateStr}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: Time Slot Selection (from JSON) */}
                <div>
                  <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2 flex items-center space-x-1.5 font-mono">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>3. Available Private Time Slots</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {slotsForDate.map((slot) => {
                      const isSelected = selectedSlotId === slot.slot_id
                      return (
                        <button
                          key={slot.slot_id}
                          type="button"
                          onClick={() => setSelectedSlotId(slot.slot_id)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-accent bg-accent/15 ring-1 ring-accent text-white'
                              : 'border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/30 hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-sm font-bold text-accent">
                              {slot.time} hrs
                            </span>
                            <span className="text-[9px] uppercase font-mono px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                              {slot.status}
                            </span>
                          </div>
                          <span className="text-xs text-neutral-300 font-medium block">
                            {slot.session_name || 'Bespoke Private Tour'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 4: Preferred Private Client Agent (from JSON) */}
                <div>
                  <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300 mb-2 flex items-center space-x-1.5 font-mono">
                    <User className="w-4 h-4 text-accent" />
                    <span>4. Select Preferred Advisory Partner</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {agents.map((ag) => {
                      const isSelected = selectedAgentId === ag.id
                      return (
                        <button
                          key={ag.id}
                          type="button"
                          onClick={() => setSelectedAgentId(ag.id)}
                          className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-accent bg-accent/20 text-white shadow-[0_0_15px_rgba(223,183,118,0.4)]'
                              : 'border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.07] hover:border-white/25'
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border-2 border-accent/40">
                            <img
                              src={ag.image}
                              alt={ag.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-serif font-bold block truncate">
                            {ag.name}
                          </span>
                          <span className="text-[9px] text-accent block truncate font-mono">
                            {ag.division}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 5: Contact Information Form */}
                <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-accent font-bold">
                    5. Patron Credentials & Confidential Contact
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] uppercase font-medium text-neutral-400 block mb-1">
                        Full Name & Salutation
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Baron Christopher Wright"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-white/[0.05] text-xs text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:outline-none focus:border-accent placeholder:text-neutral-500 backdrop-blur-md"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase font-medium text-neutral-400 block mb-1">
                        Private Contact Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+65 9123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/[0.05] text-xs text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:outline-none focus:border-accent placeholder:text-neutral-500 backdrop-blur-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-medium text-neutral-400 block mb-1">
                      Direct Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="christopher@familyoffice.sg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/[0.05] text-xs text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:outline-none focus:border-accent placeholder:text-neutral-500 backdrop-blur-md"
                    />
                  </div>

                  {/* VIP Experience Checkboxes */}
                  <div className="space-y-2 pt-2">
                    <label className="flex items-center space-x-2.5 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={requestLimousine}
                        onChange={(e) => setRequestLimousine(e.target.checked)}
                        className="rounded text-accent focus:ring-accent w-4 h-4 bg-white/10 border-white/20"
                      />
                      <span className="flex items-center space-x-1.5">
                        <Car className="w-3.5 h-3.5 text-accent" />
                        <span>Request Rolls-Royce / Maybach Chauffeur Transfer</span>
                      </span>
                    </label>

                    <label className="flex items-center space-x-2.5 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={champagneTasting}
                        onChange={(e) => setChampagneTasting(e.target.checked)}
                        className="rounded text-accent focus:ring-accent w-4 h-4 bg-white/10 border-white/20"
                      />
                      <span className="flex items-center space-x-1.5">
                        <Wine className="w-3.5 h-3.5 text-accent" />
                        <span>Private Sommelier Champagne Reception during inspection</span>
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-medium text-neutral-400 block mb-1">
                      Special Architectural Inquiries or Confidentiality Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Specify private aircraft touchdown, non-disclosure agreements, or specific wing inspections..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white/[0.05] text-xs text-white rounded-xl px-3.5 py-2.5 border border-white/15 focus:outline-none focus:border-accent placeholder:text-neutral-500 backdrop-blur-md"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-light text-[#090A0F] font-bold text-xs uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(223,183,118,0.3)] cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#090A0F]" />
                    <span>Confirm Private Viewing Reservation</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Dynamic Preview Card of the Appointment */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white/[0.04] backdrop-blur-2xl text-white p-8 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />

                  <span className="text-[10px] uppercase font-mono tracking-widest text-accent block mb-2">
                    Viewing Dossier Preview
                  </span>

                  <h3 className="font-serif text-2xl text-white font-medium mb-1">
                    {selectedProperty}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6 font-mono">
                    Private On-Site Walkthrough
                  </p>

                  <div className="space-y-4 border-y border-white/10 py-6 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-accent" />
                        <span>Scheduled Date</span>
                      </span>
                      <span className="font-mono text-white font-bold">
                        {selectedDate}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>Selected Slot</span>
                      </span>
                      <span className="font-mono text-accent font-bold">
                        {activeSlot ? activeSlot.time : '10:00'} hrs
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-accent" />
                        <span>Private Partner</span>
                      </span>
                      <span className="font-serif text-white font-medium">
                        {activeAgent ? activeAgent.name : 'Senior Partner'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                        <span>Discretion Protocol</span>
                      </span>
                      <span className="font-mono text-emerald-400">
                        Strict NDA Protected
                      </span>
                    </div>
                  </div>

                  {activeAgent && (
                    <div className="pt-6 flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-accent shrink-0">
                        <img
                          src={activeAgent.image}
                          alt={activeAgent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-serif font-bold text-white block">
                          {activeAgent.name}
                        </span>
                        <span className="text-[10px] text-accent font-mono block">
                          {activeAgent.title}
                        </span>
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          Languages: {activeAgent.languages.join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Phone Support Card */}
                <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-lg flex items-center justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
                        Direct Private Desk
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        +65 6890 2888
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-accent/20 text-accent border border-accent/30 px-2.5 py-1 rounded-full">
                    24/7 Available
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Confirmation Pass Card */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto bg-[#0F121C] text-white p-8 sm:p-12 rounded-3xl border border-accent shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/15 rounded-bl-full pointer-events-none" />

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent text-[#090A0F] flex items-center justify-center mx-auto mb-4 shadow-luxury">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold block mb-1">
                  Private Viewing Confirmed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  Haute Terres VIP Pass Issued
                </h3>
                <span className="inline-block mt-2 font-mono text-sm bg-white/10 px-4 py-1 rounded-full text-accent-light border border-white/20">
                  REF: {bookingReference}
                </span>
              </div>

              <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 text-xs mb-8">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-neutral-400 uppercase font-mono">Residence</span>
                  <span className="font-serif font-bold text-white text-sm">{selectedProperty}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-neutral-400 uppercase font-mono">Patron</span>
                  <span className="text-white font-medium">{fullName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-neutral-400 uppercase font-mono">Date & Time</span>
                  <span className="font-mono text-accent font-bold">{selectedDate} at {activeSlot?.time} hrs</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-neutral-400 uppercase font-mono">Host Partner</span>
                  <span className="text-white font-medium">{activeAgent?.name} ({activeAgent?.title})</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-neutral-400 uppercase font-mono">Chauffeur Transfer</span>
                  <span className="text-emerald-400">{requestLimousine ? 'Arranged via Rolls-Royce' : 'Self-Arrival'}</span>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  A confidential digital access pass and security clearance code has been transmitted to <span className="text-white font-medium">{email}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setIsBooked(false)}
                  className="text-xs text-accent hover:text-white underline font-mono uppercase tracking-wider transition-colors pt-2"
                >
                  Schedule Another Viewing
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
