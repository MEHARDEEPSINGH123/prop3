'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calculator,
  Percent,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import type { FinancingOption } from '../types/database'
import { formatNumber, formatCurrency, formatMillion } from '../lib/format'

interface FinancingSolutionsProps {
  financingOptions: FinancingOption[]
}

export default function FinancingSolutions({
  financingOptions,
}: FinancingSolutionsProps) {
  const [selectedBankIndex, setSelectedBankIndex] = useState(0)
  const [propertyPrice, setPropertyPrice] = useState<number>(18500000) // 18.5M default
  const [downPaymentPct, setDownPaymentPct] = useState<number>(25) // 25% default
  const [loanTenorYears, setLoanTenorYears] = useState<number>(25)

  const activeBank = financingOptions[selectedBankIndex] || financingOptions[0]

  // Calculations
  const downPaymentAmount = useMemo(() => {
    return (propertyPrice * downPaymentPct) / 100
  }, [propertyPrice, downPaymentPct])

  const loanPrincipal = useMemo(() => {
    return propertyPrice - downPaymentAmount
  }, [propertyPrice, downPaymentAmount])

  const interestRate = useMemo(() => {
    return activeBank ? activeBank.interest_rate_pct : 2.75
  }, [activeBank])

  const monthlyInstallment = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12
    const totalPayments = loanTenorYears * 12
    if (monthlyRate === 0) return loanPrincipal / totalPayments
    const installment =
      (loanPrincipal *
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1)
    return Math.round(installment)
  }, [loanPrincipal, interestRate, loanTenorYears])

  const totalRepayment = useMemo(() => {
    return monthlyInstallment * loanTenorYears * 12
  }, [monthlyInstallment, loanTenorYears])

  const totalInterest = useMemo(() => {
    return Math.max(0, totalRepayment - loanPrincipal)
  }, [totalRepayment, loanPrincipal])

  if (!financingOptions || financingOptions.length === 0) return null

  return (
    <section id="financing" className="py-28 md:py-40 bg-[#090A0F] text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold font-mono">
                Capital Advisory & Wealth Structuring
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.08]">
              Financing Solutions & Private Banking
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-lg font-sans leading-relaxed">
            Structuring bespoke credit facilities, Lombard linkages, and sovereign loan-to-value solutions with Singapore&apos;s premier private banking institutions.
          </p>
        </div>

        {/* Bank Selection Tabs */}
        <div className="flex items-center space-x-3 mb-10 overflow-x-auto no-scrollbar pb-2">
          {financingOptions.map((opt, idx) => (
            <button
              key={opt.bank}
              onClick={() => setSelectedBankIndex(idx)}
              className={`px-5 py-3 rounded-2xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center space-x-2 shrink-0 border cursor-pointer backdrop-blur-xl ${
                selectedBankIndex === idx
                  ? 'bg-accent text-[#090A0F] border-accent shadow-[0_0_15px_rgba(223,183,118,0.4)]'
                  : 'bg-white/[0.04] text-neutral-300 hover:text-white hover:bg-white/[0.08] border-white/10'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-accent" />
              <span>{opt.bank_name || opt.bank}</span>
              <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded font-mono">
                {opt.loan_to_value} LTV
              </span>
            </button>
          ))}
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-10 lg:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-9">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-white font-medium">
                    Mortgage Calculator
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block">
                    Institutional Benchmark Facility
                  </span>
                </div>
              </div>
              <span className="text-xs text-accent font-mono uppercase tracking-wider font-semibold">
                Partner: {activeBank.bank}
              </span>
            </div>

            {/* Input 1: Property Acquisition Value */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300">
                  Target Acquisition Price
                </label>
                <span className="font-serif text-2xl font-bold text-accent">
                  S$ {(propertyPrice / 1000000).toFixed(2)}M
                  <span className="text-xs font-mono text-neutral-400 ml-1.5 font-normal">
                    ({formatCurrency(propertyPrice)})
                  </span>
                </span>
              </div>
              <input
                type="range"
                min="3500000"
                max="50000000"
                step="500000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-white/15 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1.5">
                <span>S$ 3.5M</span>
                <span>S$ 25M</span>
                <span>S$ 50M</span>
              </div>
            </div>

            {/* Input 2: Down Payment % */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300">
                  Down Payment Ratio ({downPaymentPct}%)
                </label>
                <span className="font-serif text-xl font-bold text-accent">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="60"
                step="5"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-white/15 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1.5">
                <span>25% (Min LTV standard)</span>
                <span>40%</span>
                <span>60% (High Equity)</span>
              </div>
            </div>

            {/* Input 3: Loan Tenor */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs uppercase font-semibold tracking-wider text-neutral-300">
                  Loan Tenor (Years)
                </label>
                <span className="font-serif text-xl font-bold text-white">
                  {loanTenorYears} Years ({loanTenorYears * 12} Installments)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={loanTenorYears}
                onChange={(e) => setLoanTenorYears(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-white/15 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1.5">
                <span>10 Years</span>
                <span>20 Years</span>
                <span>30 Years (Max Tenor)</span>
              </div>
            </div>

            {/* Bank Perks & Advisory Notes */}
            <div className="pt-4 border-t border-white/10 bg-white/[0.03] p-5 rounded-2xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-accent block mb-2 font-bold">
                {activeBank.package_name || 'Private Banking Package'}
              </span>
              <p className="text-xs text-neutral-300 mb-3 leading-relaxed">
                {activeBank.advisory_notes}
              </p>
              <div className="space-y-2">
                {(activeBank.perks || []).map((perk, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Output Display Card */}
          <div className="lg:col-span-5 bg-white/[0.05] backdrop-blur-2xl text-white p-8 sm:p-10 lg:p-12 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-bl-full pointer-events-none" />

            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold block mb-2">
                Estimated Monthly Installment
              </span>
              <div className="font-hero text-5xl sm:text-6xl text-white tracking-wider">
                {formatCurrency(monthlyInstallment)}
                <span className="text-sm font-sans text-neutral-400 font-normal ml-2">
                  / month
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans mt-2.5">
                Based on {activeBank.interest_rate_display || `${activeBank.interest_rate_pct}% p.a.`} via {activeBank.bank_name || activeBank.bank}
              </p>
            </div>

            {/* Breakdown Grid */}
            <div className="space-y-4 border-y border-white/10 py-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">
                  Loan Principal (LTV: {100 - downPaymentPct}%)
                </span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatCurrency(loanPrincipal)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">
                  Required Down Payment ({downPaymentPct}%)
                </span>
                <span className="font-mono font-bold text-accent text-sm">
                  {formatCurrency(downPaymentAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">
                  Cumulative Interest ({loanTenorYears} Yrs)
                </span>
                <span className="font-mono text-neutral-300 text-sm">
                  {formatCurrency(totalInterest)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">
                  Valuation & Legal Subsidy
                </span>
                <span className="font-mono text-emerald-400 text-sm font-bold">
                  {activeBank.processing_fee || 'Fully Waived'}
                </span>
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <Link
                href="/book-viewing"
                className="w-full bg-accent hover:bg-accent-light text-[#090A0F] font-bold text-xs uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(223,183,118,0.3)] cursor-pointer"
              >
                <span>Request Private Banking Term Sheet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-neutral-400 text-center mt-3 font-sans">
                Indicative structuring estimate. Non-binding advisory under MAS private capital guidelines.
              </p>
            </div>
          </div>
        </div>

        {/* All Financing Plans Grid (from JSON) */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-[1px] w-8 bg-accent" />
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              Institutional Bank Options & Financing Plans
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financingOptions.map((bankOpt, idx) => {
              const isSelected = selectedBankIndex === idx
              return (
                <div
                  key={bankOpt.bank}
                  onClick={() => setSelectedBankIndex(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-2xl ${
                    isSelected
                      ? 'bg-accent/[0.08] border-accent shadow-[0_0_30px_rgba(223,183,118,0.25)] ring-1 ring-accent'
                      : 'bg-white/[0.03] border-white/10 hover:border-accent/40 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm font-sans">
                        {bankOpt.bank_name || bankOpt.bank}
                      </h4>
                      <span className="text-[11px] text-accent font-semibold font-mono block mt-0.5">
                        {bankOpt.package_name || 'Premier Facility'}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold bg-white/10 border border-white/15 px-2.5 py-1 rounded-full text-accent">
                      {bankOpt.loan_to_value} LTV
                    </span>
                  </div>

                  <div className="my-4 py-3 border-y border-white/10">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block mb-0.5">
                      Indicative Facility Rate
                    </span>
                    <span className="font-serif text-2xl font-bold text-white">
                      {bankOpt.interest_rate_display || `${bankOpt.interest_rate_pct}% p.a.`}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4 font-sans">
                    {bankOpt.advisory_notes}
                  </p>

                  <span className="text-[11px] text-accent font-semibold flex items-center space-x-1.5 font-mono">
                    <span>{isSelected ? 'Currently Selected' : 'Select this facility'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
