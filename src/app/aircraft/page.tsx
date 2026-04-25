'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { aircraft } from '@/data/aircraft'
import { Aircraft, AircraftFilter } from '@/types/aircraft'

export default function AircraftPage() {
  const [filter, setFilter] = useState<AircraftFilter>({})

  const filteredAircraft = useMemo(() => {
    let result = [...aircraft]
    
    if (filter.category) {
      result = result.filter(a => a.category === filter.category)
    }
    if (filter.manufacturer) {
      result = result.filter(a => a.manufacturer === filter.manufacturer)
    }
    
    return result
  }, [filter])

  const manufacturers = [...new Set(aircraft.map(a => a.manufacturer))].sort()

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Pre-Owned Aircraft</h1>
          <p className="text-silver text-lg">Discover our curated collection of {aircraft.length} premium aircraft</p>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-charcoal/95 backdrop-blur-sm border-y border-silver/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-silver/60 text-sm">Category:</span>
              <select 
                className="bg-charcoal border border-silver/20 text-off-white px-3 py-2 rounded text-sm focus:border-gold outline-none"
                value={filter.category || ''}
                onChange={(e) => setFilter({...filter, category: e.target.value as Aircraft['category'] || undefined})}
              >
                <option value="">All Categories</option>
                <option value="jet">Jets</option>
                <option value="turboprop">Turboprops</option>
                <option value="helicopter">Helicopters</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-silver/60 text-sm">Manufacturer:</span>
              <select 
                className="bg-charcoal border border-silver/20 text-off-white px-3 py-2 rounded text-sm focus:border-gold outline-none"
                value={filter.manufacturer || ''}
                onChange={(e) => setFilter({...filter, manufacturer: e.target.value || undefined})}
              >
                <option value="">All Manufacturers</option>
                {manufacturers.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {(filter.category || filter.manufacturer) && (
              <button 
                className="text-gold text-sm hover:underline"
                onClick={() => setFilter({})}
              >
                Clear Filters
              </button>
            )}

            <div className="ml-auto text-silver/60 text-sm">
              Showing {filteredAircraft.length} of {aircraft.length} aircraft
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredAircraft.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-silver mb-4">No aircraft match your filters</p>
              <button 
                className="text-gold hover:underline"
                onClick={() => setFilter({})}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAircraft.map((item) => (
                <Link 
                  key={item.id}
                  href={`/aircraft/${item.slug}`}
                  className="group bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-silver uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gold text-sm font-medium">{item.manufacturer}</span>
                      <span className="text-off-white/40 text-xs">{item.specifications.year}</span>
                    </div>
                    <h3 className="font-montserrat text-xl font-semibold text-off-white mb-2">{item.name}</h3>
                    <p className="text-silver/80 text-sm mb-4 line-clamp-2">{item.shortDescription}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-silver/10">
                      <span className="text-off-white/60 text-sm">View Specifications</span>
                      <span className="text-gold text-sm group-hover:text-gold/80 transition-colors">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 border-t border-silver/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-4">Looking for Something Specific?</h2>
          <p className="text-silver mb-8">
            Don&apos;t see the aircraft you need? Our global sourcing network can locate aircraft to meet your exact specifications.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-montserrat text-lg font-semibold text-off-white mb-4">HAZELRIGG</h4>
              <p className="text-silver/60 text-sm">Premium pre-owned aircraft and industrial equipment sourced globally.</p>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Aircraft</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/aircraft?category=jet" className="hover:text-silver">Jets</Link></li>
                <li><Link href="/aircraft?category=turboprop" className="hover:text-silver">Turboprops</Link></li>
                <li><Link href="/aircraft?category=helicopter" className="hover:text-silver">Helicopters</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Equipment</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/plant-equipment" className="hover:text-silver">Cranes</Link></li>
                <li><Link href="/plant-equipment" className="hover:text-silver">Generators</Link></li>
                <li><Link href="/plant-equipment" className="hover:text-silver">Pumps</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Contact</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li>0333 772 3803</li>
                <li>info@hazelriggenterprises.co.uk</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-silver/10 text-center text-silver/40 text-sm">
            © {new Date().getFullYear()} Hazelrigg Enterprises Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}