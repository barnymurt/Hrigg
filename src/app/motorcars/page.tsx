'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { equipment } from '@/data/equipment'
import { Equipment, EquipmentFilter } from '@/types/equipment'
import { CONTACT } from '@/constants'

function MotorcarCard({ item }: { item: Equipment }) {
  const [selectedImage, setSelectedImage] = useState(0)

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedImage(prev => prev === 0 ? item.images.length - 1 : prev - 1)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedImage(prev => prev === item.images.length - 1 ? 0 : prev + 1)
  }

  return (
    <Link 
      key={item.id}
      href={`/equipment/${item.slug}`}
      className="group relative"
    >
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
        <Image
          src={item.images[selectedImage]}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        
        {item.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/90 backdrop-blur-md border border-silver/30 flex items-center justify-center hover:bg-charcoal hover:border-gold/60 transition-all duration-200 shadow-lg z-10"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-charcoal/90 backdrop-blur-md border border-silver/30 flex items-center justify-center hover:bg-charcoal hover:border-gold/60 transition-all duration-200 shadow-lg z-10"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-3 right-3 bg-charcoal/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-silver z-10">
              {selectedImage + 1}/{item.images.length}
            </div>
          </>
        )}
      </div>
      
      <div className="space-y-3">
        <p className="text-gold/80 text-xs tracking-[0.2em] uppercase">{item.manufacturer}</p>
        <h3 className="font-montserrat text-xl text-off-white group-hover:text-gold transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-silver/60 text-sm leading-relaxed line-clamp-2">
          {item.shortDescription}
        </p>
        <div className="flex items-center gap-4 pt-2 text-xs text-silver/50">
          {(item.specifications as any).year && <span>{(item.specifications as any).year}</span>}
          {(item.specifications as any).transmission && (
            <>
              <span className="w-1 h-1 rounded-full bg-silver/30" />
              <span className="capitalize">{(item.specifications as any).transmission}</span>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-500 group-hover:w-full" />
    </Link>
  )
}

function MotorcarContent() {
  const [filter, setFilter] = useState<EquipmentFilter>({})
  const motorcars = equipment.filter(e => e.category === 'luxury-vehicles')

  const filteredMotorcars = useMemo(() => {
    let result = [...motorcars]
    
    if (filter.manufacturer) {
      result = result.filter(m => m.manufacturer === filter.manufacturer)
    }
    
    return result
  }, [filter])

  const manufacturers = [...new Set(motorcars.map(m => m.manufacturer))].sort()

  return (
    <>
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-gold/80 text-sm tracking-[0.3em] uppercase mb-6">Curated Collection</span>
            <h1 className="font-montserrat text-5xl md:text-6xl font-bold text-off-white mb-6 leading-tight">
              Motorcars
            </h1>
            <p className="text-silver/70 text-lg leading-relaxed max-w-xl">
              A selection of {motorcars.length} premium motorcars, sourced and vetted to the highest standards for discerning clients worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-40 bg-charcoal/98 backdrop-blur-md border-y border-gold/10 py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-6">
            <select 
              className="bg-transparent border-b border-silver/30 text-off-white/80 px-2 py-2 text-sm focus:border-gold outline-none transition-colors"
              value={filter.manufacturer || ''}
              onChange={(e) => setFilter({...filter, manufacturer: e.target.value || undefined})}
            >
              <option value="">All Manufacturers</option>
              {manufacturers.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {filter.manufacturer && (
              <button 
                className="text-gold/70 text-sm hover:text-gold transition-colors"
                onClick={() => setFilter({})}
              >
                Clear
              </button>
            )}

            <div className="ml-auto text-silver/50 text-sm font-light">
              {filteredMotorcars.length} motorcars
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredMotorcars.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-silver/60 mb-6">No motorcars match your criteria</p>
              <button 
                className="text-gold/80 hover:text-gold transition-colors"
                onClick={() => setFilter({})}
              >
                View all motorcars
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMotorcars.map((item) => (
                <MotorcarCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-6 border-t border-silver/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-light text-off-white mb-6">
            Seeking a specific motorcar?
          </h2>
          <p className="text-silver/60 mb-10 leading-relaxed">
            Our global network can source motorcars to meet your exact specifications. Contact our team for personalized assistance.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-medium px-10 py-4 rounded transition-all duration-300"
          >
            Enquire Now
          </Link>
        </div>
      </section>
    </>
  )
}

function MotorcarLoading() {
  return (
    <>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-gold/80 text-sm tracking-[0.3em] uppercase mb-6">Curated Collection</span>
            <h1 className="font-montserrat text-5xl md:text-6xl font-bold text-off-white mb-6 leading-tight">
              Motorcars
            </h1>
            <p className="text-silver/70 text-lg leading-relaxed max-w-xl">
              A selection of premium motorcars, sourced and vetted to the highest standards for discerning clients worldwide.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-charcoal/50 rounded-xl overflow-hidden h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default function MotorcarsPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      <MotorcarContent />
      <Footer />
    </main>
  )
}