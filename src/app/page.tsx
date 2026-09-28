'use client'

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import HeroShowcase from '../components/HeroShowcase'
import OurStory from '../components/OurStory'
import PropertyStatistics from '../components/PropertyStatistics'
import TopPicks from '../components/TopPicks'
import FacilitiesShowcase from '../components/FacilitiesShowcase'
import FinancingSolutions from '../components/FinancingSolutions'
import ProjectComparison from '../components/ProjectComparison'
import ViewingAppointments from '../components/ViewingAppointments'
import PortfolioGallery from '../components/PortfolioGallery'
import Testimonials from '../components/Testimonials'
import FeaturedLocations from '../components/FeaturedLocations'
import Footer from '../components/Footer'
import PropertyDetailModal from '../components/PropertyDetailModal'

import {
  getHeroProjects,
  getFeaturedProperties,
  getFacilities,
  getFinancingOptions,
  getViewingAppointments,
  getProjectComparisons,
  getStatistics,
  getOurStory,
  getFeaturedLocations,
  getPortfolioGallery,
  getTestimonials,
  getAgents,
} from '../lib/data'
import type { FeaturedProperty } from '../types/database'

export default function HomePage() {
  // Load data directly from JSON via typed helpers
  const heroProjects = getHeroProjects()
  const properties = getFeaturedProperties()
  const facilities = getFacilities()
  const financingOptions = getFinancingOptions()
  const viewingAppointments = getViewingAppointments()
  const agents = getAgents()
  const comparisons = getProjectComparisons()
  const statistics = getStatistics()
  const story = getOurStory()
  const locations = getFeaturedLocations()
  const galleryItems = getPortfolioGallery()
  const testimonials = getTestimonials()

  // State management
  const [activeFilters, setActiveFilters] = useState<{
    location: string
    propertyType: string
    priceRange: string
    bedrooms: string
  }>({
    location: 'All',
    propertyType: 'All',
    priceRange: 'All',
    bedrooms: 'All',
  })

  const [selectedPropertyModal, setSelectedPropertyModal] =
    useState<FeaturedProperty | null>(null)

  const [preselectedViewingProperty, setPreselectedViewingProperty] =
    useState<string>(properties[0] ? properties[0].title : '')

  const handleSearchFilter = (filters: {
    location: string
    propertyType: string
    priceRange: string
    bedrooms: string
  }) => {
    setActiveFilters(filters)
  }

  const handleBookViewing = (propertyTitle: string) => {
    setPreselectedViewingProperty(propertyTitle)
    const target = document.getElementById('appointments')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDistrictFilter = (districtName: string) => {
    // Extract base location
    const matched = properties.find((p) =>
      districtName.toLowerCase().includes(p.location.toLowerCase())
    )
    if (matched) {
      setActiveFilters((prev) => ({ ...prev, location: matched.location }))
    }
  }

  return (
    <main className="min-h-screen bg-canvas text-primary selection:bg-accent selection:text-white relative">
      {/* Editorial Navigation */}
      <Navbar />

      {/* CHAPTER 01: Hero Showcase & Masthead */}
      <HeroShowcase
        heroProjects={heroProjects}
        onSearchFilter={handleSearchFilter}
      />

      {/* CHAPTER 02: The Atelier Manifesto / Our Story */}
      <OurStory story={story} />

      {/* CHAPTER 03: Property Statistics */}
      <PropertyStatistics statistics={statistics} />

      {/* CHAPTER 04: Top Picks Portfolio */}
      <TopPicks
        properties={properties}
        onSelectProperty={(prop) => setSelectedPropertyModal(prop)}
        onAddToComparison={(prop) => {
          const target = document.getElementById('comparison')
          if (target) target.scrollIntoView({ behavior: 'smooth' })
        }}
        activeFilters={activeFilters}
      />

      {/* CHAPTER 05: Architectural Amenities / Facilities Showcase */}
      <FacilitiesShowcase facilities={facilities} />

      {/* CHAPTER 06: Capital Advisory / Financing Solutions */}
      <FinancingSolutions financingOptions={financingOptions} />

      {/* CHAPTER 07: Analytical Architecture / Project Comparison Tool */}
      <ProjectComparison
        comparisons={comparisons}
        onSelectForViewing={(name) => handleBookViewing(name)}
      />

      {/* CHAPTER 08: Private Viewing Appointments */}
      <ViewingAppointments
        viewingAppointments={viewingAppointments}
        agents={agents}
        properties={properties}
        preselectedPropertyName={preselectedViewingProperty}
      />

      {/* CHAPTER 09: Visual Anthology / Portfolio Gallery */}
      <PortfolioGallery galleryItems={galleryItems} />

      {/* CHAPTER 10: Patronage Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* CHAPTER 11: Enclave Cartography / Featured Locations */}
      <FeaturedLocations
        locations={locations}
        onSelectDistrict={handleDistrictFilter}
      />

      {/* CHAPTER 12: Private Concierge & Epilogue / Footer */}
      <Footer />

      {/* Interactive Property Inspection Modal */}
      <PropertyDetailModal
        property={selectedPropertyModal}
        onClose={() => setSelectedPropertyModal(null)}
        onBookViewing={handleBookViewing}
      />
    </main>
  )
}
