export interface HeroProject {
  id: string
  name: string
  subtitle?: string
  location: string
  district?: string
  starting_price_sgd?: number
  price_formatted?: string
  availability?: string
  availability_status?: string
  property_type?: string
  bedrooms?: string
  bathrooms?: string
  area_sqft?: string
  architect?: string
  completion_year?: string
  hero_image?: string
  tagline?: string
}

export interface FeaturedProperty {
  id: string
  title: string
  location: string
  district?: string
  price_sgd: number
  price_formatted?: string
  availability: string
  property_type: string
  bedrooms: number
  bathrooms: number
  area_sqft: number
  completion_date?: string
  investment_potential?: string
  image: string
  description?: string
  architect?: string
  highlights?: string[]
  floor?: string
}

export interface FacilityItem {
  id: string
  name: string
  title: string
  category: string
  description: string
  specs: string
  image: string
}

export interface FinancingOption {
  bank: string
  bank_name: string
  loan_to_value: string
  interest_rate_pct: number
  interest_rate_display: string
  package_name: string
  max_tenor_years: number
  min_down_payment_pct: number
  processing_fee: string
  perks: string[]
  advisory_notes: string
}

export interface ViewingAppointment {
  slot_id: string
  date: string
  time: string
  session_name?: string
  status: string
  preferred_agent_id?: string
}

export interface Agent {
  id: string
  name: string
  title: string
  division: string
  experience: string
  volume: string
  image: string
  languages: string[]
}

export interface ProjectComparison {
  comparison_id: string
  project_name: string
  price: string
  price_raw: number
  location: string
  facilities: string
  area: string
  area_raw: number
  availability: string
  property_type: string
  completion_date: string
  investment_potential: string
  architect: string
  tenure: string
  view_type: string
  image: string
}

export interface StatisticItem {
  id: string
  label: string
  value: number
  suffix?: string
  prefix?: string
  isDecimal?: boolean
  description: string
}

export interface OurStory {
  title: string
  subtitle: string
  lead_quote: string
  company_vision: string
  property_expertise: string
  luxury_philosophy: string
  founder_name: string
  founder_title: string
  image_story: string
  image_detail: string
}

export interface FeaturedLocation {
  id: string
  district: string
  average_price: string
  average_price_label: string
  availability: string
  featured_property: string
  character: string
  image: string
}

export interface PortfolioGalleryItem {
  id: string
  title: string
  category: string
  aspect: 'tall' | 'wide' | 'square'
  image: string
  location: string
  architect: string
}

export interface TestimonialItem {
  id: string
  quote: string
  author: string
  title: string
  property: string
  year: string
}

export interface DatabaseSchema {
  hero_projects: HeroProject[]
  featured_properties: FeaturedProperty[]
  facilities: FacilityItem[]
  financing_options: FinancingOption[]
  viewing_appointments: ViewingAppointment[]
  agents?: Agent[]
  project_comparisons: ProjectComparison[]
  statistics?: StatisticItem[]
  our_story?: OurStory
  featured_locations?: FeaturedLocation[]
  portfolio_gallery?: PortfolioGalleryItem[]
  testimonials?: TestimonialItem[]
}
