'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Contact Us</h1>
          <p className="text-silver text-lg">Get in touch with Hazelrigg Enterprises</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
                <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gold font-medium mb-2">Address</h3>
                    <p className="text-silver/80">
                      HAZELRIGG ENTERPRISES<br />
                      PORT OF BLYTH<br />
                      WIMBOURNE QUAY<br />
                      REGENTS STREET<br />
                      BLYTH NORTHUMBERLAND<br />
                      NE24 1PX
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gold font-medium mb-2">Phone</h3>
                    <a href="tel:03337723903" className="text-off-white hover:text-silver text-lg">0333 772 3903</a>
                  </div>
                  <div>
                    <h3 className="text-gold font-medium mb-2">Email</h3>
                    <a href="mailto:info@hazelriggenterprises.co.uk" className="text-off-white hover:text-silver">info@hazelriggenterprises.co.uk</a>
                  </div>
                </div>
              </div>

              <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
                <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">What Our Clients Say</h2>
                <p className="text-silver/80 italic mb-4">
                  "Hazelrigg provided exceptional services from concept to completion, on a large scale redevelopment of a Rural Property in Northumberland we have owned for over 40 years. Renovated to modern standards whilst sympathetically retaining the character of this amazing 160 year old building. Lead builder and developer, Kevin, provided exceptional support at every step, I cant recommend them enough."
                </p>
                <p className="text-off-white font-medium">Private Client, London Based</p>
              </div>
            </div>

            <div>
              <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
                <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">Contact Form</h2>
                
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">✓</div>
                    <h3 className="text-off-white font-semibold text-xl mb-2">Thank You!</h3>
                    <p className="text-silver/80">Your message has been sent. We will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-silver/80 text-sm mb-2 block">Your name (required)</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-silver/80 text-sm mb-2 block">Your email (required)</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-silver/80 text-sm mb-2 block">Subject (required)</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-silver/80 text-sm mb-2 block">Your message (required)</label>
                      <textarea
                        required
                        rows={6}
                        className="w-full bg-charcoal border border-silver/20 text-off-white px-4 py-3 rounded text-sm focus:border-gold outline-none resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold/90 text-charcoal font-semibold py-4 rounded transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/images/logo.png" alt="Hazelrigg Enterprises" width={150} height={40} className="h-auto w-auto mb-4" unoptimized />
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