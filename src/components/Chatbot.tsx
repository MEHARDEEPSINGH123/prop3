'use client'

import React, { useState } from 'react'
import Script from 'next/script'
import { Sparkles, X, ExternalLink } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Official Dagsis AI Agent Credentials
  const agentId = "78d05ef2-f033-4c19-a1f5-acc4da29b4d4"
  const apiKey = "906196fc-9a06-4988-87dd-6e10f7f68df8"
  const agentName = "HAUTE TERRES AI"

  // Live Dagsis AI Embedded Endpoint
  const embedUrl = `https://dagsis.ai/embed/${agentId}?name=${encodeURIComponent(agentName)}#apiKey=${encodeURIComponent(apiKey)}`

  const handleOpen = () => {
    setIsOpen(true)
    // If widget.js is loaded, synchronize state
    if (typeof window !== 'undefined' && (window as any).DagsisChat) {
      try {
        const dagsisContainer = document.getElementById('dagsis-chat-container')
        if (dagsisContainer) {
          dagsisContainer.style.display = 'block'
        }
      } catch (e) {
        // Fallback to embedded iframe window
      }
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if (typeof window !== 'undefined' && (window as any).DagsisChat) {
      try {
        const dagsisContainer = document.getElementById('dagsis-chat-container')
        if (dagsisContainer) {
          dagsisContainer.style.display = 'none'
        }
      } catch (e) {
        // Fallback
      }
    }
  }

  return (
    <>
      {/* 1. Official Dagsis AI Script Loader */}
      <Script
        src="https://dagsis.ai/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).DagsisChat) {
            try {
              (window as any).DagsisChat.init({
                agentId,
                apiKey,
                name: agentName,
              })
              // Hide default unstyled widget button to prioritize luxury bespoke UI
              const defaultBtn = document.getElementById('dagsis-chat-button')
              if (defaultBtn) {
                defaultBtn.style.display = 'none'
              }
            } catch (err) {
              console.warn('DagsisChat init note:', err)
            }
          }
        }}
      />

      {/* 2. Floating Luxury 'Ask HAUTE AI' Button (Horizon Style) */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 bg-[#090A0F] hover:bg-[#121624] text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(223,183,118,0.25)] border-2 border-accent hover:border-accent-light flex items-center space-x-2.5 transition-all duration-300 hover:scale-105 group cursor-pointer"
          title="Open HAUTE TERRES AI Concierge"
          aria-label="Open AI Concierge Chatbot"
        >
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-accent animate-spin-slow" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-serif text-sm font-semibold tracking-wide text-accent leading-none">
              Ask HAUTE AI
            </span>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
              Private Concierge
            </span>
          </div>
        </button>
      )}

      {/* 3. Live Dagsis AI Chat Window (Horizon Style) */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[620px] max-h-[calc(100vh-80px)] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(223,183,118,0.2)] border border-white/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#090A0F] text-white p-3.5 px-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center text-accent">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                    HAUTE TERRES AI
                  </h3>
                  <span className="flex items-center space-x-1 text-[9px] bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dagsis AI Live</span>
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 font-sans">
                  Private Client Advisory & Architectural Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                title="Open in new tab"
                aria-label="Open chat in full tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dagsis AI Live Embedded Agent */}
          <div className="flex-1 w-full h-full relative bg-white">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090A0F] space-y-3 z-10 text-white">
                <div className="w-9 h-9 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                <p className="text-xs text-neutral-300 font-medium font-mono">
                  Connecting to Dagsis AI Agent...
                </p>
              </div>
            )}
            <iframe
              src={embedUrl}
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-none"
              allow="clipboard-write; microphone"
              title="HAUTE TERRES Dagsis AI Agent"
            />
          </div>
        </div>
      )}
    </>
  )
}
