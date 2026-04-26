'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { equipment, equipmentCategories, getEquipmentByCategory } from '@/data/equipment'
import { Equipment } from '@/types/equipment'

function EquipmentCard({ item }: { item: Equipment }) {
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
      className="group bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all"
    >
      <div className="relative h-56 overflow-hidden bg-charcoal">
        <Image
          src={item.images[selectedImage]}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        
        {item.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal/90 backdrop-blur-md border border-silver/30 flex items-center justify-center hover:bg-charcoal hover:border-gold/60 transition-all duration-200 z-10"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-charcoal/90 backdrop-blur-md border border-silver/30 flex items-center justify-center hover:bg-charcoal hover:border-gold/60 transition-all duration-200 z-10"
              aria-label="Next image"
            >
              <svg className="w-4 h-4 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 right-2 bg-charcoal/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs text-silver z-10">
              {selectedImage + 1}/{item.images.length}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-silver uppercase tracking-wider capitalize z-10">
          {item.category.replace('-', ' ')}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-montserrat text-lg font-semibold text-off-white mb-2 line-clamp-1">{item.name}</h3>
        <p className="text-silver/80 text-sm mb-4 line-clamp-2">{item.shortDescription}</p>
        {item.specifications.power && (
          <p className="text-gold text-sm font-medium mb-3">{item.specifications.power}</p>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-silver/10">
          <span className="text-off-white/60 text-sm">View Details</span>
          <span className="text-gold text-sm group-hover:text-gold/80 transition-colors">→</span>
        </div>
      </div>
    </Link>
  )
}

function EquipmentContent() {
  const searchParams = useSearchParams()
  const [filter, setFilter] = useState<{ category?: Equipment['category'] }>({})

  useEffect(() => {
    const category = searchParams.get('category')
    if (category && ['cranes', 'generators', 'pumps', 'trailers', 'tower-lights', 'engines'].includes(category)) {
      setFilter({ category: category as Equipment['category'] })
    }
  }, [searchParams])

  const filteredEquipment = useMemo(() => {
    if (filter.category) {
      return getEquipmentByCategory(filter.category)
    }
    return equipment
  }, [filter])

  return (
    <>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Plant & Equipment</h1>
          <p className="text-silver text-lg max-w-3xl">
            Industrial and commercial machinery sourced globally. Specialising in shipping, port operations, energy, and infrastructure sectors.
          </p>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter({})}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                !filter.category 
                  ? 'bg-gold text-charcoal' 
                  : 'bg-charcoal/50 border border-silver/20 text-silver hover:border-silver/40'
              }`}
            >
              All Equipment
            </button>
            {equipmentCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setFilter({ category: cat.slug as Equipment['category'] })}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors capitalize ${
                  filter.category === cat.slug 
                    ? 'bg-gold text-charcoal' 
                    : 'bg-charcoal/50 border border-silver/20 text-silver hover:border-silver/40'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function EquipmentLoading() {
  return (
    <>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Plant & Equipment</h1>
          <p className="text-silver text-lg max-w-3xl">
            Industrial and commercial machinery sourced globally. Specialising in shipping, port operations, energy, and infrastructure sectors.
          </p>
        </div>
      </section>
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      <Suspense fallback={<EquipmentLoading />}>
        <EquipmentContent />
      </Suspense>
      
      <section className="py-16 px-6 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-4">Looking for Something Specific?</h2>
          <p className="text-silver mb-8">
            Need a gas generator in Turkey next week? We can help. Our global sourcing network can locate equipment to meet your exact specifications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:03337723903" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors">
              0333 772 3903
            </a>
            <Link href="/contact" className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/images/logo.png" alt="Hazelrigg Enterprises" width={150} height={40} className="h-auto w-auto mb-4" unoptimized />
              <p className="text-silver/60 text-sm">Premium industrial equipment sourced globally.</p>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Equipment</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/equipment?category=cranes" className="hover:text-silver">Cranes</Link></li>
                <li><Link href="/equipment?category=generators" className="hover:text-silver">Generators</Link></li>
                <li><Link href="/equipment?category=pumps" className="hover:text-silver">Pumps</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Aircraft</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/aircraft" className="hover:text-silver">All Aircraft</Link></li>
                <li><Link href="/aircraft?category=jet" className="hover:text-silver">Jets</Link></li>
                <li><Link href="/aircraft?category=turboprop" className="hover:text-silver">Turboprops</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Contact</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li>0333 772 3903</li>
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