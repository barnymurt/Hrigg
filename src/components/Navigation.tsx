'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [aircraftOpen, setAircraftOpen] = useState(false)
  const [equipmentOpen, setEquipmentOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-silver/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Hazelrigg Enterprises" width={180} height={50} className="h-auto w-auto" priority />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <div 
              className="relative"
              onMouseEnter={() => setAircraftOpen(true)}
              onMouseLeave={() => setAircraftOpen(false)}
            >
              <button className="text-off-white/80 hover:text-silver transition-colors font-medium py-2">
                Aircraft
              </button>
              {aircraftOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-charcoal border border-silver/20 rounded-lg shadow-xl py-2">
                  <Link href="/aircraft" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    All Aircraft
                  </Link>
                  <Link href="/aircraft?category=jet" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Jets
                  </Link>
                  <Link href="/aircraft?category=turboprop" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Turboprops
                  </Link>
                  <Link href="/aircraft?category=helicopter" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Helicopters
                  </Link>
                </div>
              )}
            </div>

            <div 
              className="relative"
              onMouseEnter={() => setEquipmentOpen(true)}
              onMouseLeave={() => setEquipmentOpen(false)}
            >
              <button className="text-off-white/80 hover:text-silver transition-colors font-medium py-2">
                Plant & Equipment
              </button>
              {equipmentOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-charcoal border border-silver/20 rounded-lg shadow-xl py-2">
                  <Link href="/equipment" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    All Equipment
                  </Link>
                  <Link href="/equipment?category=cranes" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Cranes
                  </Link>
                  <Link href="/equipment?category=generators" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Generators
                  </Link>
                  <Link href="/equipment?category=pumps" className="block px-4 py-2 text-off-white/80 hover:text-silver hover:bg-silver/5">
                    Pumps
                  </Link>
                </div>
              )}
            </div>

            <Link href="/services" className="text-off-white/80 hover:text-silver transition-colors font-medium">
              Services
            </Link>
            <Link href="/about" className="text-off-white/80 hover:text-silver transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-5 py-2 rounded transition-colors">
              Contact Us
            </Link>
          </div>

          <button 
            className="lg:hidden text-off-white"
            onClick={() => setIsOpen(!isOpen)}
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
          <div className="lg:hidden pb-6 border-t border-silver/10">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/aircraft" className="text-off-white/80 hover:text-silver py-2">Aircraft</Link>
              <Link href="/equipment" className="text-off-white/80 hover:text-silver py-2">Plant & Equipment</Link>
              <Link href="/services" className="text-off-white/80 hover:text-silver py-2">Services</Link>
              <Link href="/about" className="text-off-white/80 hover:text-silver py-2">About</Link>
              <Link href="/contact" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-5 py-2 rounded text-center">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}