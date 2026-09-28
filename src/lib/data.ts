import rawData from '../../database.json'
import type { DatabaseSchema } from '../types/database'

export const database: DatabaseSchema = rawData as unknown as DatabaseSchema

export function getHeroProjects() {
  return database.hero_projects || []
}

export function getFeaturedProperties() {
  return database.featured_properties || []
}

export function getFacilities() {
  return database.facilities || []
}

export function getFinancingOptions() {
  return database.financing_options || []
}

export function getViewingAppointments() {
  return database.viewing_appointments || []
}

export function getAgents() {
  return database.agents || []
}

export function getProjectComparisons() {
  return database.project_comparisons || []
}

export function getStatistics() {
  return database.statistics || []
}

export function getOurStory() {
  return database.our_story
}

export function getFeaturedLocations() {
  return database.featured_locations || []
}

export function getPortfolioGallery() {
  return database.portfolio_gallery || []
}

export function getTestimonials() {
  return database.testimonials || []
}
