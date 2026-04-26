export interface EquipmentSpecifications {
  manufacturer?: string
  model?: string
  year?: number
  capacity?: string
  power?: string
  voltage?: string
  hours?: string
  condition?: string
  weight?: string
  dimensions?: string
  liftingHeight?: string
  engine?: string
  suction?: string
  discharge?: string
  flow?: string
  head?: string
  size?: string
  alternator?: string
  delivery?: string
  flag?: string
  motorPower?: string
  insideClearWidth?: string
  type?: string
  lightCoverage?: string
  runtime?: string
  silentMode?: string
}

export interface Equipment {
  id: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  price: string
  category: 'cranes' | 'generators' | 'pumps' | 'trailers' | 'tower-lights' | 'engines'
  manufacturer: string
  images: string[]
  specifications: EquipmentSpecifications
  highlights: string[]
  featured?: boolean
}

export type EquipmentFilter = {
  category?: Equipment['category']
  manufacturer?: string
}