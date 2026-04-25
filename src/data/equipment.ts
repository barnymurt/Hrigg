import { Equipment } from '@/types/equipment'

export const equipment: Equipment[] = [
  // CRANES
  {
    id: 'cr-1',
    slug: '2-x-moble-gantries',
    name: '2 x MOBLE GANTRIES',
    shortDescription: '140 tons capacity straddle carriers',
    longDescription: 'Specifications: Quantity: 2 straddle carriers. Capacity: 140 tons (70 tons each). Main features include: Wheel axis: 600m. Clear inside width: 500m. Lifting height: 600m. Translation speed: 36 km/h.',
    price: 'Price on Application',
    category: 'cranes',
    manufacturer: 'Moble',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/09/Picture1a.jpg',
    ],
    specifications: {
      capacity: '140 tons (70 tons each)',
      year: undefined,
    },
    highlights: [
      '2 straddle carriers available',
      '70 ton capacity each',
      '36 km/h translation speed',
    ],
    featured: true,
  },
  {
    id: 'cr-2',
    slug: '44a-gantry-crane',
    name: '44A Gantry Crane',
    shortDescription: '793,700 lb load capacity',
    longDescription: 'Year of manufacture: 2002. Load capacity: 793,700 lb. Lifting height: 26.25 ft. Location: United Kingdom.',
    price: 'Price on Application',
    category: 'cranes',
    manufacturer: 'Unknown',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-17.15.02-AA.jpeg',
    ],
    specifications: {
      capacity: '793,700 lb',
      year: 2002,
      liftingHeight: '26.25 ft',
    },
    highlights: [
      'Year 2002 manufacture',
      'Located in UK',
    ],
    featured: false,
  },
  {
    id: 'cr-3',
    slug: 'goliath-160-crane',
    name: 'Goliath 160 Crane',
    shortDescription: 'Heavy duty gantry crane',
    longDescription: 'Heavy duty Goliath 160 crane available for sale. Contact us for full specifications.',
    price: 'Price on Application',
    category: 'cranes',
    manufacturer: 'Goliath',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-10.05.15-green-a.jpeg',
    ],
    specifications: {},
    highlights: [],
    featured: false,
  },
  {
    id: 'cr-4',
    slug: 'reconditioned-electric-overhead-travelling-crane',
    name: 'Reconditioned Electric Overhead Travelling Crane System',
    shortDescription: 'Full EOT crane system',
    longDescription: 'Reconditioned Electric Overhead Travelling Crane System. Complete system available.',
    price: 'Price on Application',
    category: 'cranes',
    manufacturer: 'Various',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/IMG_5238-c-scaled.jpg',
    ],
    specifications: {},
    highlights: [
      'Reconditioned',
      'Complete system',
    ],
    featured: false,
  },
  {
    id: 'cr-5',
    slug: 'cimolai-rgc018-550-ton-gantry-crane',
    name: 'CIMOLAI TECNOLOGY RGC018 – 550 Ton Gantry Crane',
    shortDescription: 'Double winch 500 + 50 ton capacity',
    longDescription: 'Double winch 500 Ton + 50 Ton. Year of manufacture 2009. Gauge mt.18. Track centre distance mt. 16.20. Height at hook mt.14. Maximum Height mt. 21.30. Total weight kg. 120,000. AUTEC system.',
    price: 'Price on Application',
    category: 'cranes',
    manufacturer: 'CIMOLAI TECNOLOGY',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/large-usato-2009-gru-a-portale-cavalletto-cimolai-tecnology-rcg-018-550-ton.jpg',
    ],
    specifications: {
      manufacturer: 'CIMOLAI TECNOLOGY',
      model: 'RGC018',
      year: 2009,
      capacity: '550 ton',
      weight: '120,000 kg',
    },
    highlights: [
      'Double winch 500 + 50 ton',
      '2009 manufacture',
      'AUTEC control system',
    ],
    featured: true,
  },
  {
    id: 'cr-6',
    slug: '2-x-2-5-ton-winches',
    name: '2 x 2.5 ton Winches',
    shortDescription: '2.5 ton capacity winches',
    longDescription: 'Two 2.5 ton winches available. Contact us for full specifications.',
    price: 'Price on Application',
    category: 'cranes',
    manufacturer: 'Various',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/IMG-20260106-WA0009.jpg',
    ],
    specifications: {
      capacity: '2.5 ton each',
    },
    highlights: [],
    featured: false,
  },

  // GENERATORS
  {
    id: 'gen-1',
    slug: '1130kva-cpg-cummins-generator',
    name: '1130kVA CPG Cummins Used Generator',
    shortDescription: '1132kVA standby power, Cummins engine',
    longDescription: '1132kVA Standby Power – Designed to handle substantial electrical loads with ease, ensuring dependable power for demanding environments. Cummins Engine (Model KTA38-G5) – Renowned for robust performance.',
    price: 'Price on Application',
    category: 'generators',
    manufacturer: 'CPG / Cummins',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/3202_-_1000KVA_KTA38-G5_Cummins_Stamford_Containerised_2_20250909_085130.jpg',
    ],
    specifications: {
      power: '1130kVA',
      manufacturer: 'CPG',
      engine: 'Cummins KTA38-G5',
    },
    highlights: [
      '1132kVA standby power',
      'Cummins KTA38-G5 engine',
      'Stamford alternator',
    ],
    featured: true,
  },
  {
    id: 'gen-2',
    slug: '1315kva-broadcrown-perkins-generator',
    name: '1315kVA Broadcrown Perkins Generator',
    shortDescription: '1315kVA standby, Perkins engine',
    longDescription: 'Key Features: 1315kVA Standby Output – supports large-scale loads for critical infrastructure. Engine: Perkins 4012TWG2 – well-known for durability under continuous use. Alternator: Stamford HCI734E1.',
    price: 'Price on Application',
    category: 'generators',
    manufacturer: 'Broadcrown / Perkins',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/2988_-_1315kVA_Broadcrown_Perkins_Stamford_Open_3_20250219_110516-1.jpg',
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/2989_-_1315kVA_Broadcrown_Perkins_Stamford_Open_7_20250219_110600-b.jpg',
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/2990_-_1315kVA_Broadcrown_Perkins_Stamford_Open_9_20250220_094231.jpg',
    ],
    specifications: {
      power: '1315kVA',
      manufacturer: 'Broadcrown',
      engine: 'Perkins 4012TWG2',
    },
    highlights: [
      '1315kVA standby output',
      'Perkins 4012TWG2 engine',
      'Stamford HCI734E1 alternator',
    ],
    featured: true,
  },
  {
    id: 'gen-3',
    slug: '1750kva-dale-cat-generator',
    name: '1750kVA Dale CAT Used Generator',
    shortDescription: '1750 kVA standby, Caterpillar engine',
    longDescription: 'Key Features: 1750 kVA Standby Power – Capable of handling substantial electrical loads with confidence. Caterpillar Engine – Trusted worldwide for its durability and superior performance under pressure.',
    price: 'Price on Application',
    category: 'generators',
    manufacturer: 'Dale / Caterpillar',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/3084_-_1750kVA_Dale_CAT_3500_Stamford_Open_4_20250327_143745-2.jpg',
    ],
    specifications: {
      power: '1750kVA',
      manufacturer: 'Dale',
      engine: 'Caterpillar 3500',
    },
    highlights: [
      '1750 kVA standby power',
      'Caterpillar 3500 engine',
      'Stamford alternator',
    ],
    featured: true,
  },
  {
    id: 'gen-4',
    slug: '880kva-auto-diesels-dorman-generator',
    name: '880kVA Auto Diesels Dorman Used Generator',
    shortDescription: '880kVA for large industrial operations',
    longDescription: 'This 880kVA Auto Diesels Dorman used diesel generator offers robust power capacity for large-scale industrial operations, commercial backup systems, or global export applications.',
    price: 'Price on Application',
    category: 'generators',
    manufacturer: 'Auto Diesels / Dorman',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/3085_-_800kVA_Auto_Diesel_Dorman_12SE_Open_6_20250918_142501.jpg',
    ],
    specifications: {
      power: '880kVA',
      manufacturer: 'Auto Diesels Dorman',
    },
    highlights: [
      '880kVA capacity',
      'Industrial applications',
      'Export ready',
    ],
    featured: false,
  },
  {
    id: 'gen-5',
    slug: '706kva-cummins-diesel-generator',
    name: 'Used Cummins 706kVA Diesel Generator XP70016',
    shortDescription: '706 kVA / 564.8 kW',
    longDescription: 'Pre Owned 2022 Cummins C700D5 706 kVA / 564.8 kW diesel generator, powered by Cummins VTA 28-G5 engine, running a Stamford 400/230 Volts, 1019 Amps, 50Hz alternator.',
    price: 'Price on Application',
    category: 'generators',
    manufacturer: 'Cummins',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/09/XP70016-1-2.png',
    ],
    specifications: {
      power: '706kVA / 564.8kW',
      manufacturer: 'Cummins',
      year: 2022,
      voltage: '400/230V',
    },
    highlights: [
      '2022 model',
      'Cummins VTA 28-G5 engine',
      'Stamford alternator',
    ],
    featured: false,
  },
  {
    id: 'gen-6',
    slug: '1650kva-fg-wilson-perkins-generator',
    name: 'Used FG Wilson Perkins 1650kVA Diesel Generator',
    shortDescription: '1650kVA / 1320kW',
    longDescription: 'Used FG Wilson Perkins 1650kVA / 1320kW diesel generator, powered by a Perkins 4012-TAG2A engine, running a Leroy Somer 415/240 Volts, 2310 Amps, 50Hz alternator.',
    price: 'Price on Application',
    category: 'generators',
    manufacturer: 'FG Wilson / Perkins',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/09/XP150016-FGW-Perkins-1650kVA-Gen-1.png',
    ],
    specifications: {
      power: '1650kVA / 1320kW',
      manufacturer: 'FG Wilson',
      engine: 'Perkins 4012-TAG2A',
      voltage: '415/240V',
    },
    highlights: [
      '1650kVA capacity',
      'Perkins 4012-TAG2A engine',
      'Leroy Somer alternator',
    ],
    featured: true,
  },

  // PUMPS
  {
    id: 'pump-1',
    slug: 'godwin-cd150s-pump',
    name: 'Godwin Dri-Prime CD150S Pump',
    shortDescription: '150mm suction/discharge, Hatz engine',
    longDescription: 'Godwin CD150S pump, with 150mm suction and 150mm discharge. It is powered by a Hatz 3H50TICD Stage V diesel engine with a fuel capacity of 140 litres and solids handling to 75mm.',
    price: 'Price on Application',
    category: 'pumps',
    manufacturer: 'Godwin',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/10/CD150S_enclosed_skid_.jpeg',
    ],
    specifications: {
      manufacturer: 'Godwin',
      model: 'CD150S',
      suction: '150mm',
      discharge: '150mm',
      engine: 'Hatz 3H50TICD Stage V',
    },
    highlights: [
      '150mm suction and discharge',
      'Hatz Stage V engine',
      'Solids handling to 75mm',
    ],
    featured: true,
  },
  {
    id: 'pump-2',
    slug: 'godwin-cd80d-pump',
    name: 'Godwin Dri-Prime CD80D',
    shortDescription: 'Compact pump, 96 m³/hr flow',
    longDescription: 'The Godwin Dri-Prime CD80D pump is an extremely powerful yet compact pump with flow capabilities to 96 m³/hr and discharge heads to 36 metres.',
    price: 'Price on Application',
    category: 'pumps',
    manufacturer: 'Godwin',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/05/godwin_us_cd80d_diesel_trailor_m.webp',
    ],
    specifications: {
      manufacturer: 'Godwin',
      model: 'CD80D',
      flow: '96 m³/hr',
      head: '36 metres',
    },
    highlights: [
      '96 m³/hr flow capacity',
      '36 metre discharge head',
      'Compact design',
    ],
    featured: false,
  },
  {
    id: 'pump-3',
    slug: 'godwin-sld-mf-55-60-clean-water-pump',
    name: 'Used Godwin SLD MF 55/60 Clean Water Pump',
    shortDescription: 'Clean water pump',
    longDescription: 'Used Godwin SLD MF 55/60 clean water pump. Suitable for various water management applications.',
    price: 'Price on Application',
    category: 'pumps',
    manufacturer: 'Godwin',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/09/SP_9017-1-1.webp',
    ],
    specifications: {
      manufacturer: 'Godwin',
      model: 'SLD MF 55/60',
    },
    highlights: [],
    featured: false,
  },
  {
    id: 'pump-4',
    slug: 'spp-xf300-418-12inch-high-flow-pumps',
    name: 'Used SPP XF300/418 12inch High Flow Pumps',
    shortDescription: '12-inch high flow pumps',
    longDescription: 'Used SPP XF300/418 12inch high flow pumps. Deutz engine. High capacity for demanding applications.',
    price: 'Price on Application',
    category: 'pumps',
    manufacturer: 'SPP',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/09/XSP9722-Deutz-Pump-1-e1757858245534.webp',
    ],
    specifications: {
      manufacturer: 'SPP',
      model: 'XF300/418',
      size: '12 inch',
    },
    highlights: [
      '12 inch high flow',
      'Deutz engine',
    ],
    featured: false,
  },
  {
    id: 'pump-5',
    slug: 'sykes-hh150-8inch-water-pump',
    name: 'Used Sykes HH150 8inch Water Pump',
    shortDescription: '8" Bauer suction, 6" NP16 delivery',
    longDescription: 'Used Sykes HH150 pump with 8" female Bauer suction and 6" NP16 flanged delivery. Driven by a 6 cylinder, radiator cooled, electric starter diesel engine mounted on a skid base frame.',
    price: 'Price on Application',
    category: 'pumps',
    manufacturer: 'Sykes',
    images: [
      'https://hazelriggenterprises.co.uk/wp-content/uploads/2025/09/SP9255-1-1.webp',
    ],
    specifications: {
      manufacturer: 'Sykes',
      model: 'HH150',
      suction: '8" Bauer',
      delivery: '6" NP16 flanged',
    },
    highlights: [
      '8" Bauer suction',
      '6 cylinder diesel engine',
      'Skid mounted',
    ],
    featured: false,
  },
]

export const getEquipmentBySlug = (slug: string): Equipment | undefined => {
  return equipment.find((e) => e.slug === slug)
}

export const getEquipmentByCategory = (category: Equipment['category']): Equipment[] => {
  return equipment.filter((e) => e.category === category)
}

export const getFeaturedEquipment = (): Equipment[] => {
  return equipment.filter((e) => e.featured)
}

export const equipmentCategories = [
  { name: 'Cranes', slug: 'cranes', count: equipment.filter(e => e.category === 'cranes').length },
  { name: 'Power Generators', slug: 'generators', count: equipment.filter(e => e.category === 'generators').length },
  { name: 'Pumps', slug: 'pumps', count: equipment.filter(e => e.category === 'pumps').length },
  { name: 'Trailers & Transporters', slug: 'trailers', count: equipment.filter(e => e.category === 'trailers').length },
  { name: 'Tower Lights', slug: 'tower-lights', count: equipment.filter(e => e.category === 'tower-lights').length },
  { name: 'Engines', slug: 'engines', count: equipment.filter(e => e.category === 'engines').length },
]