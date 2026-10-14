'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, X, ExternalLink } from 'lucide-react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  // Official Dagsis AI Agent Credentials
  const agentId = "78d05ef2-f033-4c19-a1f5-acc4da29b4d4"
  const apiKey = "906196fc-9a06-4988-87dd-6e10f7f68df8"
  const agentName = "Dagsis Property 3 Dummy AI"

  // Direct Live Dagsis AI Production Embed Endpoint (Just like Horizon)
  const embedUrl = `https://dagsis.ai/embed/${agentId}?name=${encodeURIComponent(agentName)}#apiKey=${encodeURIComponent(apiKey)}`

  // Clean up any residual external widget DOM nodes if they were injected
  useEffect(() => {
    const cleanExternalWidget = () => {
      const widgetBtn = document.getElementById('dagsis-chat-button')
      if (widgetBtn) widgetBtn.remove()
      const widgetContainer = document.getElementById('dagsis-chat-container')
      if (widgetContainer) widgetContainer.remove()
    }
    cleanExternalWidget()
  }, [])

  return (
    <>
      {/* 1. Floating 'Ask HAUTE AI' Button (Exact Horizon Luxury Design) */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#090A0F] hover:bg-[#121624] text-white rounded-full p-3.5 sm:px-5 sm:py-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(223,183,118,0.3)] border-2 border-[#DFB776] flex items-center space-x-2.5 transition-all duration-300 hover:scale-105 group cursor-pointer"
          title="Open Dagsis Property 3 Dummy AI Concierge"
          aria-label="Open Dagsis Property 3 Dummy AI Concierge"
        >
          <div className="w-6 h-6 rounded-full bg-[#DFB776]/20 flex items-center justify-center text-[#DFB776] group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-[#DFB776] animate-spin-slow" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-serif text-sm font-semibold tracking-wide text-[#DFB776] leading-none">
              Ask Dagsis AI
            </span>
            <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
              Property Concierge
            </span>
          </div>
        </button>
      )}

      {/* 2. Real Live Dagsis AI Chat Window (Exact Horizon Luxury Layout) */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-32px)] h-[620px] max-h-[calc(100vh-80px)] bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(223,183,118,0.25)] border border-neutral-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#090A0F] text-white p-3.5 px-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-[#DFB776]/40 flex items-center justify-center text-[#DFB776]">
                <Sparkles className="w-4 h-4 text-[#DFB776]" />
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
                <p className="text-xs text-slate-500 font-medium">Connecting to Dagsis AI Agent...</p>
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
        </div>
      )}
    </>
  )
}
