'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react'

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setSubscribed(true)
    }
  }

  return (
    <footer id="contact" className="bg-[#06070B] text-white pt-28 pb-16 relative overflow-hidden border-t border-white/10">
      {/* Subtle architectural ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Top Contact & VIP Newsletter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-20 border-b border-white/10">
          {/* Left Column: Direct Private Client Concierge */}
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-center space-x-3">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                Haute Terres Private Client Concierge
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
              Direct Advisory for Discerning Patrons
            </h3>

            <p className="text-sm text-neutral-400 font-sans max-w-lg leading-relaxed">
              Whether acquiring a generational Good Class Bungalow, commissioning an off-market super penthouse, or structuring cross-border family trust allocations, our senior partners remain at your service.
            </p>

            <div className="space-y-4 pt-3 text-sm">
              <div className="flex items-center space-x-3.5 text-neutral-300">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="font-mono text-xs">+65 6890 2888 (24/7 Private Client Direct)</span>
              </div>
              <div className="flex items-center space-x-3.5 text-neutral-300">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="font-mono text-xs">concierge@hauteterres.sg</span>
              </div>
              <div className="flex items-start space-x-3.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                <span className="text-xs">Level 52, Marina Bay Financial Centre Tower 1, Singapore 018981</span>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Off-Market Monograph Subscription */}
          <div className="lg:col-span-6 bg-white/[0.04] backdrop-blur-2xl p-8 sm:p-12 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-accent font-bold block mb-2">
                Off-Market Intelligence Monograph
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                Receive Unlisted Architectural Acquisitions
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-7">
                Published quarterly for verified private offices and collectors. Contains confidential trophy estate profiles not released to public channels.
              </p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-3.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter confidential email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-white/[0.05] text-xs text-white rounded-2xl px-5 py-4 pr-32 border border-white/15 focus:outline-none focus:border-accent placeholder:text-neutral-500 backdrop-blur-md"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-accent hover:bg-accent-light text-[#090A0F] font-bold text-xs uppercase tracking-wider px-5 rounded-xl transition-all duration-300 flex items-center space-x-1 cursor-pointer shadow-md"
                  >
                    <span>Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>Strict confidentiality assured. Never disclosed or commercialized.</span>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/30 text-accent text-xs flex items-center space-x-2">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Thank you. The current private portfolio monograph has been dispatched.</span>
              </div>
            )}
          </div>
        </div>

        {/* Massive Editorial Headline / Brand Display */}
        <div className="py-20 text-center border-b border-white/10">
          <h2 className="font-hero text-6xl sm:text-8xl md:text-9xl lg:text-[150px] tracking-widest uppercase text-white/90 select-none leading-none">
            HAUTE TERRES
          </h2>
          <p className="text-xs sm:text-sm tracking-mega uppercase text-accent font-sans mt-4">
            Architecture · Sanctuaire · Domaines Privés
          </p>
        </div>

        {/* Footer Navigation & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-6">
          <p className="font-sans">
            © 2026 Haute Terres Private Office Pte Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center space-x-8 text-[11px] font-mono uppercase tracking-wider">
            <Link href="/" className="hover:text-accent transition-colors">Portfolio</Link>
            <a href="/#our-story" className="hover:text-accent transition-colors">Manifesto</a>
            <a href="/#facilities" className="hover:text-accent transition-colors">Amenities</a>
            <a href="/#financing" className="hover:text-accent transition-colors">Financing</a>
            <a href="/#comparison" className="hover:text-accent transition-colors">Matrix</a>
            <Link href="/book-viewing" className="text-accent hover:text-white transition-colors font-bold">
              Viewing Salon →
            </Link>
          </div>

          <p className="text-[10px] text-neutral-500 font-mono">
            CEA Reg: L3009842J / Private Wealth Advisory
          </p>
        </div>
      </div>
    </footer>
  )
}
