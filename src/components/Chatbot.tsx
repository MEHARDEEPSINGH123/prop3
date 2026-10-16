'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, MessageCircle, X, ExternalLink } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Official Dagsis AI Agent Credentials (Updated)
  const agentId = "477e207d-bf30-49b6-9fed-c88994f702a1"
  const apiKey = "0dfb06dd-8dcd-4777-9520-b3b3e68decef"
  const agentName = "Dagsis Property 3 Dummy AI"

  // Direct Live Dagsis AI Production Embed Endpoint matching luxury theme
  const embedUrl = `https://dagsis.ai/embed/${agentId}?name=${encodeURIComponent(agentName)}#apiKey=${encodeURIComponent(apiKey)}`

  // Permanently suppress and remove any residual external blue widget elements
  useEffect(() => {
    const cleanExternalWidget = () => {
      const widgetBtn = document.getElementById('dagsis-chat-button')
      if (widgetBtn) {
        widgetBtn.style.display = 'none'
        widgetBtn.remove()
      }
      const widgetContainer = document.getElementById('dagsis-chat-container')
      if (widgetContainer) {
        widgetContainer.style.display = 'none'
        widgetContainer.remove()
      }
    }

    cleanExternalWidget()
    const observer = new MutationObserver(cleanExternalWidget)
    observer.observe(document.body, { childList: true, subtree: true })
    const interval = setInterval(cleanExternalWidget, 300)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      {/* 1. Floating Bespoke Luxury Concierge Trigger Button matching website aesthetic */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#090A0F] hover:bg-[#121624] text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(223,183,118,0.35)] border-2 border-[#DFB776] hover:border-[#F3D7A4] flex items-center space-x-3 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          title="Open Dagsis Property 3 Dummy AI Concierge"
          aria-label="Open Dagsis Property 3 Dummy AI Concierge"
        >
          {/* Circular Badge with Gold Chat Icon & Sparkle */}
          <div className="relative w-7 h-7 rounded-full bg-[#DFB776]/20 border border-[#DFB776]/40 flex items-center justify-center text-[#DFB776] group-hover:scale-110 transition-transform">
            <MessageCircle className="w-4 h-4 text-[#DFB776]" />
            <Sparkles className="w-2.5 h-2.5 text-[#DFB776] absolute -top-1 -right-1 animate-pulse" />
          </div>

          {/* Luxury Typography Labels (Visible on Tablet & Desktop) */}
          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif text-sm font-semibold tracking-wide text-[#DFB776] leading-none">
                Ask Dagsis AI
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
            </div>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
              Property Concierge
            </span>
          </div>
        </button>
      )}

      {/* 2. Custom Themed Dagsis AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[620px] max-h-[calc(100vh-80px)] bg-[#090A0F] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(223,183,118,0.25)] border border-[#DFB776]/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#090A0F] text-white p-3.5 px-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-[#DFB776]/40 flex items-center justify-center text-[#DFB776]">
                <MessageCircle className="w-4 h-4 text-[#DFB776]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif text-sm font-bold text-white tracking-wide">
                    DAGSIS PROPERTY 3 DUMMY
                  </h3>
                  <span className="flex items-center space-x-1 text-[9px] bg-[#DFB776]/20 text-[#DFB776] border border-[#DFB776]/30 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dagsis AI Live</span>
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  Private Client Advisory & Architectural Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
                title="Open in new tab"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dagsis AI Live Embedded Agent Container */}
          <div className="flex-1 w-full h-full relative bg-white overflow-hidden">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 space-y-3 z-10">
                <div className="w-9 h-9 rounded-full border-2 border-[#DFB776] border-t-transparent animate-spin" />
                <p className="text-xs text-slate-500 font-medium font-sans">Connecting to Dagsis AI Agent...</p>
              </div>
            )}
            <iframe
              src={embedUrl}
              onLoad={() => setIframeLoaded(true)}
              className="w-full h-full border-none"
              allow="clipboard-write; microphone"
              title="Dagsis Property 3 Dummy AI Agent"
            />
          </div>

          {/* Footer Contact Bar */}
          <div className="px-3.5 py-2 bg-[#090A0F] border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400 font-mono shrink-0">
            <span>Direct: +65 XXXXXXXXX</span>
            <span className="truncate max-w-[200px]" title="123, Street ABC, State XYZ, Pin-000000">
              123, Street ABC, State XYZ
            </span>
          </div>
        </div>
      )}
    </>
  )
}
