export interface AircraftSpecifications {
  year: number
  manufacturer: string
  model: string
  serialNumber?: string
  registration?: string
  totalTime?: string
  totalLandings?: string
  condition: string
  flightRules?: string
  engines?: string
  engineMake?: string
  engineModel?: string
  engine1Time?: string
  engine2Time?: string
  engineTBO?: string
  engineProgram?: string
  avionic?: string
  avionics?: string
  interior?: string
  exterior?: string
  exteriorYear?: number
  interiorYear?: number
  galley?: string
  lavatory?: string
  inspectionStatus?: string
  performance?: string
  numberOfSeats?: number
  exteriorColor?: string
  maintenanceProgram?: string
  trackingSystem?: string
  lastRefurb?: string
}

export interface Aircraft {
  id: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  price: string
  priceCategory: 'million-plus' | 'contact-us'
  images: string[]
  category: 'jet' | 'turboprop' | 'helicopter'
  manufacturer: string
  featured: boolean
  specifications: AircraftSpecifications
  highlights: string[]
}

export type AircraftFilter = {
  category?: 'jet' | 'turboprop' | 'helicopter'
  manufacturer?: string
  priceRange?: 'under-2m' | '2m-5m' | '5m-plus'
}