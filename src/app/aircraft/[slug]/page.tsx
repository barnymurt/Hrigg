'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { getAircraftBySlug, aircraft } from '@/data/aircraft'

export default function AircraftDetailPage({ params }: { params: { slug: string } }) {
  const aircraftItem = getAircraftBySlug(params.slug)
  
  if (!aircraftItem) {
    notFound()
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in the ${aircraftItem.name}. Please provide more information.`
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your enquiry. Our team will be in touch shortly.')
  }

  const currentIndex = aircraft.findIndex(a => a.slug === params.slug)
  const relatedAircraft = aircraft.filter(a => a.slug !== params.slug && a.category === aircraftItem.category).slice(0, 3)

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-24 pb-4 px-6 border-b border-silver/10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-silver/60 hover:text-silver">Home</Link>
            <span className="text-silver/40">/</span>
            <Link href="/aircraft" className="text-silver/60 hover:text-silver">Aircraft</Link>
            <span className="text-silver/40">/</span>
            <span className="text-off-white">{aircraftItem.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-charcoal/50 group">
                <Image
                  src={aircraftItem.images[selectedImage]}
                  alt={aircraftItem.name}
                  fill
                  className="object-cover"
                />
                
                {/* Left Arrow */}
                {aircraftItem.images.length > 1 && (
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? aircraftItem.images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal/80 backdrop-blur-sm border border-silver/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-charcoal hover:border-gold/50"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                
                {/* Right Arrow */}
                {aircraftItem.images.length > 1 && (
                  <button
                    onClick={() => setSelectedImage(prev => prev === aircraftItem.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-charcoal/80 backdrop-blur-sm border border-silver/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-charcoal hover:border-gold/50"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 text-off-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-sm px-3 py-1 rounded text-sm text-silver">
                  {selectedImage + 1} / {aircraftItem.images.length}
                </div>
              </div>
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {aircraftItem.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      idx === selectedImage ? 'border-gold' : 'border-transparent hover:border-silver/30'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="sticky top-28">
                <span className="inline-block bg-aviation-blue/20 text-silver px-3 py-1 rounded text-xs uppercase tracking-wider mb-3">
                  {aircraftItem.category}
                </span>
                <h1 className="font-montserrat text-3xl font-bold text-off-white mb-2">{aircraftItem.name}</h1>
                <p className="text-gold font-medium mb-4">{aircraftItem.manufacturer}</p>
                <p className="text-off-white/60 text-sm mb-6">{aircraftItem.shortDescription}</p>
                
                <div className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-silver/60">Year</span>
                      <p className="text-off-white font-medium">{aircraftItem.specifications.year}</p>
                    </div>
                    <div>
                      <span className="text-silver/60">Condition</span>
                      <p className="text-off-white font-medium">{aircraftItem.specifications.condition}</p>
                    </div>
                    <div>
                      <span className="text-silver/60">Manufacturer</span>
                      <p className="text-off-white font-medium">{aircraftItem.specifications.manufacturer}</p>
                    </div>
                    <div>
                      <span className="text-silver/60">Flight Rules</span>
                      <p className="text-off-white font-medium">{aircraftItem.specifications.flightRules}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gold/10 border border-gold/20 rounded-xl p-6">
                  <p className="text-silver/80 text-sm mb-2">Price</p>
                  <p className="text-gold text-2xl font-bold">{aircraftItem.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-6 border-t border-silver/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4">Overview</h2>
                <p className="text-silver/80 leading-relaxed">{aircraftItem.longDescription}</p>
              </div>

              <div>
                <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4">Specifications</h2>
                <div className="bg-charcoal/50 rounded-xl border border-silver/10 overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries({
                        'Year': aircraftItem.specifications.year,
                        'Manufacturer': aircraftItem.specifications.manufacturer,
                        'Model': aircraftItem.specifications.model,
                        'Condition': aircraftItem.specifications.condition,
                        'Flight Rules': aircraftItem.specifications.flightRules,
                        ...(aircraftItem.specifications.serialNumber && { 'Serial Number': aircraftItem.specifications.serialNumber }),
                        ...(aircraftItem.specifications.registration && { 'Registration': aircraftItem.specifications.registration }),
                        ...(aircraftItem.specifications.totalTime && { 'Total Time': aircraftItem.specifications.totalTime }),
                        ...(aircraftItem.specifications.engines && { 'Engines': aircraftItem.specifications.engines }),
                        ...(aircraftItem.specifications.avionic && { 'Avionics': aircraftItem.specifications.avionic }),
                      }).map(([label, value], idx) => (
                        <tr key={label} className={idx % 2 === 0 ? 'bg-charcoal/30' : ''}>
                          <td className="px-6 py-3 text-silver/60 text-sm">{label}</td>
                          <td className="px-6 py-3 text-off-white font-medium text-sm">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {aircraftItem.highlights.length > 0 && (
                <div>
                  <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4">Highlights</h2>
                  <ul className="space-y-3">
                    {aircraftItem.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gold mr-3 mt-1">✓</span>
                        <span className="text-silver/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <button className="flex items-center gap-3 bg-charcoal/50 border border-silver/20 rounded-lg px-6 py-4 text-off-white hover:border-silver/40 transition-colors">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Specification Sheet (PDF)</span>
                </button>
              </div>
            </div>

            <div>
              <div className="sticky top-28 bg-charcoal/50 rounded-xl border border-silver/10 p-6">
                <h3 className="font-montserrat text-xl font-semibold text-off-white mb-2">Request Information</h3>
                <p className="text-silver/60 text-sm mb-6">Fill out the form below and our team will be in touch.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-silver/80 text-sm mb-1 block">Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-silver/80 text-sm mb-1 block">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-silver/80 text-sm mb-1 block">Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-silver/80 text-sm mb-1 block">Message *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold py-4 rounded transition-colors"
                  >
                    Send Enquiry
                  </button>
                </form>
                
                <div className="mt-6 pt-6 border-t border-silver/10">
                  <p className="text-silver/60 text-sm mb-2">Prefer to speak directly?</p>
                  <a href="tel:03337723803" className="text-gold font-medium hover:underline">0333 772 3803</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedAircraft.length > 0 && (
        <section className="py-16 border-t border-silver/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-8">Related Aircraft</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedAircraft.map((item) => (
                <Link 
                  key={item.id}
                  href={`/aircraft/${item.slug}`}
                  className="group bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-montserrat text-lg font-semibold text-off-white">{item.name}</h3>
                    <p className="text-silver/60 text-sm">{item.manufacturer} | {item.specifications.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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