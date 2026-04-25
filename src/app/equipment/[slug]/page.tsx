'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { getEquipmentBySlug, equipment } from '@/data/equipment'

export default function EquipmentDetailPage({ params }: { params: { slug: string } }) {
  const item = getEquipmentBySlug(params.slug)
  
  if (!item) {
    notFound()
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in the ${item.name}. Please provide more information.`
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your enquiry. Our team will be in touch shortly.')
  }

  const relatedEquipment = equipment.filter(e => e.category === item.category && e.slug !== item.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-24 pb-4 px-6 border-b border-silver/10">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-silver/60 hover:text-silver">Home</Link>
            <span className="text-silver/40">/</span>
            <Link href="/equipment" className="text-silver/60 hover:text-silver">Equipment</Link>
            <span className="text-silver/40">/</span>
            <span className="text-off-white capitalize">{item.category.replace('-', ' ')}</span>
          </nav>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-charcoal/50">
                <Image
                  src={item.images[selectedImage]}
                  alt={item.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {item.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-sm px-3 py-1 rounded text-sm text-silver">
                    {selectedImage + 1} / {item.images.length}
                  </div>
                )}
              </div>
              {item.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        idx === selectedImage ? 'border-gold' : 'border-transparent hover:border-silver/30'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="sticky top-28">
                <span className="inline-block bg-aviation-blue/20 text-silver px-3 py-1 rounded text-xs uppercase tracking-wider mb-3 capitalize">
                  {item.category.replace('-', ' ')}
                </span>
                <h1 className="font-montserrat text-3xl font-bold text-off-white mb-2">{item.name}</h1>
                <p className="text-gold font-medium mb-4">{item.manufacturer}</p>
                <p className="text-off-white/60 text-sm mb-6">{item.shortDescription}</p>
                
                {item.specifications.power && (
                  <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-6">
                    <p className="text-silver/60 text-sm">Power Output</p>
                    <p className="text-gold text-xl font-bold">{item.specifications.power}</p>
                  </div>
                )}

                <div className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 mb-6">
                  <p className="text-silver/60 text-sm mb-2">Price</p>
                  <p className="text-off-white text-xl font-bold">{item.price}</p>
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
                <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4">Description</h2>
                <p className="text-silver/80 leading-relaxed">{item.longDescription}</p>
              </div>

              {Object.keys(item.specifications).length > 0 && (
                <div>
                  <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4">Specifications</h2>
                  <div className="bg-charcoal/50 rounded-xl border border-silver/10 overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(item.specifications).map(([key, value], idx) => (
                          value && (
                            <tr key={key} className={idx % 2 === 0 ? 'bg-charcoal/30' : ''}>
                              <td className="px-6 py-3 text-silver/60 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                              <td className="px-6 py-3 text-off-white font-medium text-sm">{String(value)}</td>
                            </tr>
                          )
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {item.highlights.length > 0 && (
                <div>
                  <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-gold mr-3 mt-1">✓</span>
                        <span className="text-silver/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

      {relatedEquipment.length > 0 && (
        <section className="py-16 border-t border-silver/10">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-8">Related Equipment</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEquipment.map((relItem) => (
                <Link 
                  key={relItem.id}
                  href={`/equipment/${relItem.slug}`}
                  className="group bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={relItem.images[0]}
                      alt={relItem.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-montserrat text-lg font-semibold text-off-white line-clamp-1">{relItem.name}</h3>
                    <p className="text-silver/60 text-sm">{relItem.specifications.power || relItem.manufacturer}</p>
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