'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [equipmentOpen, setEquipmentOpen] = useState(false)
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null)
  const equipmentTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current)
    setServicesOpen(true)
  }

  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 150)
  }

  const handleEquipmentEnter = () => {
    if (equipmentTimeout.current) clearTimeout(equipmentTimeout.current)
    setEquipmentOpen(true)
  }

  const handleEquipmentLeave = () => {
    equipmentTimeout.current = setTimeout(() => setEquipmentOpen(false), 300)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-silver/10 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center shrink-0 py-2">
            <Image src="/images/logo.png" alt="Hazelrigg Enterprises" width={150} height={50} className="h-auto w-auto max-w-[150px]" priority />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/services" className="text-off-white/80 hover:text-silver transition-colors font-medium py-2">
              Our Services
            </Link>

            <Link href="/about" className="text-off-white/80 hover:text-silver transition-colors font-medium py-2">
              About
            </Link>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={handleEquipmentEnter}
              onMouseLeave={handleEquipmentLeave}
            >
              <button className="text-off-white/80 hover:text-silver transition-colors font-medium py-2">
                Industrial Plant
              </button>
              {equipmentOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-charcoal border border-silver/20 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 text-gold/70 text-xs font-semibold uppercase tracking-wider">Power & Light</div>
                  <Link href="/equipment?category=generators" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Power Generators
                  </Link>
                  <Link href="/equipment?category=tower-lights" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Tower Lights
                  </Link>
                  <Link href="/equipment?category=engines" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Engines
                  </Link>
                  <div className="px-4 py-2 text-gold/70 text-xs font-semibold uppercase tracking-wider mt-2">Lifting & Handling</div>
                  <Link href="/equipment?category=cranes" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Cranes
                  </Link>
                  <Link href="/equipment?category=mobile-boat-hoists" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Mobile Boat Hoists
                  </Link>
                  <div className="px-4 py-2 text-gold/70 text-xs font-semibold uppercase tracking-wider mt-2">Transport & Fluid</div>
                  <Link href="/equipment?category=trailers" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Trailers & Transporters
                  </Link>
                  <Link href="/equipment?category=pumps" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Pumps
                  </Link>
                </div>
              )}
            </div>

            <div
              className="relative h-full flex items-center"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button className="text-off-white/80 hover:text-silver transition-colors font-medium py-2">
                Aviation & Motorcars
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-charcoal border border-silver/20 rounded-lg shadow-xl py-2 z-50">
                  <Link href="/aircraft" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5 group">
                    <div className="font-medium">Aircraft</div>
                    <div className="text-xs text-silver/60 group-hover:text-silver/80">Fixed-wing and rotary</div>
                  </Link>
                  <Link href="/equipment?category=luxury-vehicles" className="block px-4 py-3 text-off-white/80 hover:text-silver hover:bg-silver/5 group">
                    <div className="font-medium">Motorcars</div>
                    <div className="text-xs text-silver/60 group-hover:text-silver/80">Performance and marque vehicles</div>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-5 py-2 rounded transition-colors">
              Contact Us
            </Link>
          </div>

          <button 
            className="lg:hidden text-off-white ml-4"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-silver/10">
            <div className="flex flex-col space-y-3">
              <Link href="/services" className="text-off-white/80 hover:text-silver py-2">Our Services</Link>
              <Link href="/about" className="text-off-white/80 hover:text-silver py-2">About</Link>
              <Link href="/equipment" className="text-off-white/80 hover:text-silver py-2">Industrial Plant</Link>
              <Link href="/aircraft" className="text-off-white/80 hover:text-silver py-2">Aviation & Motorcars</Link>
              <Link href="/contact" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-5 py-3 rounded text-center w-full">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}