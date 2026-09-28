'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
  sublabel?: string
}

interface LuxuryDropdownProps {
  value: string
  onChange: (value: string) => void
  options: (string | DropdownOption)[]
  placeholder?: string
  className?: string
  dropdownClassName?: string
  fontSerif?: boolean
  theme?: 'light' | 'dark'
}

export default function LuxuryDropdown({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  className = '',
  dropdownClassName = '',
  fontSerif = false,
  theme = 'light',
}: LuxuryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Normalize options to DropdownOption
  const normalizedOptions: DropdownOption[] = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt }
    }
    return opt
  })

  const selectedOption = normalizedOptions.find((o) => o.value === value)

  // Close on outside click or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const isDark = theme === 'dark'

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between text-left rounded-xl px-4 py-3.5 border transition-all duration-300 shadow-sm cursor-pointer select-none ${
          isDark
            ? isOpen
              ? 'bg-[#1a1a1a] text-white border-accent ring-2 ring-accent/20'
              : 'bg-[#141414] text-white border-white/15 hover:border-accent/60'
            : isOpen
              ? 'bg-white text-primary border-accent ring-2 ring-accent/20 shadow-md'
              : 'bg-[#fafaf8] hover:bg-white text-primary border-borderSubtle hover:border-accent/60'
        } ${fontSerif ? 'font-serif text-sm' : 'text-xs font-medium'} ${className}`}
      >
        <span className="truncate pr-2 font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-accent shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: isDark ? '#141414' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#E5E5E0',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.06)',
            }}
            className={`absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl border py-1.5 overflow-hidden max-h-72 overflow-y-auto no-scrollbar ${
              isDark ? 'text-white' : 'text-primary'
            } ${dropdownClassName}`}
            role="listbox"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value)
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={isSelected}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-all duration-150 group cursor-pointer ${
                    fontSerif ? 'font-serif text-sm' : 'text-xs font-medium'
                  } ${
                    isSelected
                      ? isDark
                        ? 'bg-accent/20 text-accent font-semibold border-l-2 border-accent'
                        : 'bg-accent/15 text-[#93744A] font-semibold border-l-2 border-accent'
                      : isDark
                        ? 'text-neutral-100 hover:bg-white/10 hover:text-white'
                        : 'text-neutral-800 hover:bg-[#F5F5F3] hover:text-primary'
                  }`}
                >
                  <div className="flex flex-col truncate pr-2">
                    <span className="truncate leading-snug">{opt.label}</span>
                    {opt.sublabel && (
                      <span
                        className={`text-[10px] font-mono mt-0.5 truncate ${
                          isSelected
                            ? isDark
                              ? 'text-accent-light'
                              : 'text-accent-dark'
                            : isDark
                              ? 'text-neutral-400'
                              : 'text-neutral-500'
                        }`}
                      >
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-accent shrink-0 ml-2" />
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
