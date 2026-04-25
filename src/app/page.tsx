import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { getFeaturedAircraft } from '@/data/aircraft'
import Image from 'next/image'

export default function Home() {
  const featuredAircraft = getFeaturedAircraft()

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/images/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-montserrat text-5xl md:text-7xl font-bold text-off-white mb-6 tracking-tight">
            Pre-Owned Aircraft<br />of Distinction
          </h1>
          <p className="text-xl text-silver mb-10 max-w-2xl mx-auto">
            Expertly sourced, professionally presented. Discover our curated collection of premium pre-owned aircraft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/aircraft" 
              className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              Browse Aircraft
            </Link>
            <Link 
              href="/plant-equipment" 
              className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              Plant & Equipment
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-silver/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">About Hazelrigg Enterprises</h2>
            <p className="text-silver/80 max-w-3xl mx-auto">
              Based in North East England, Hazelrigg Enterprises are proud to serve our clients needs in the property and machinery supply sectors in the UK and internationally. With decades of experience, we have become a trusted global supplier of high-quality second-hand machinery, serving clients across a diverse range of industries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aviation-blue/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-2">Global Sourcing</h3>
              <p className="text-silver/80">Worldwide network for exceptional aircraft and equipment acquisition</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aviation-blue/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-2">Quality Assurance</h3>
              <p className="text-silver/80">Rigorous inspection and documentation for every aircraft</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aviation-blue/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-2">Expert Guidance</h3>
              <p className="text-silver/80">Professional advisory from acquisition to delivery</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">Featured Aircraft</h2>
            <p className="text-silver">Explore our selection of premium pre-owned aircraft</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredAircraft.map((aircraft) => (
              <Link 
                key={aircraft.id} 
                href={`/aircraft/${aircraft.slug}`}
                className="group bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={aircraft.images[0]}
                    alt={aircraft.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-off-white mb-2">{aircraft.name}</h3>
                  <p className="text-silver/80 text-sm mb-4">{aircraft.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold text-sm font-medium">{aircraft.manufacturer}</span>
                    <span className="text-off-white/60 text-sm group-hover:text-silver transition-colors">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/aircraft" 
              className="inline-block border border-silver text-off-white hover:bg-silver/10 font-medium px-8 py-3 rounded transition-colors"
            >
              View All Aircraft
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-4xl font-bold text-off-white mb-6">Our Services</h2>
              <p className="text-silver/80 mb-6">
                At Hazelrigg Enterprises we believe problems are simply opportunities in disguise. We specialize in locating quality plant and equipment for shipping, port operations, energy, and infrastructure sectors worldwide.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <div>
                    <span className="text-off-white font-medium">Industrial Machinery Supply</span>
                    <p className="text-silver/60 text-sm">Sourcing and arranging quality machinery, plant and equipment anywhere in the world</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <div>
                    <span className="text-off-white font-medium">Aircraft Sales</span>
                    <p className="text-silver/60 text-sm">Premium pre-owned aircraft for discerning buyers</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <div>
                    <span className="text-off-white font-medium">Property Development</span>
                    <p className="text-silver/60 text-sm">Residential and commercial property in innovative ways</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link 
                  href="/services" 
                  className="text-gold hover:underline font-medium"
                >
                  Learn more about our services →
                </Link>
              </div>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="https://hazelriggenterprises.co.uk/wp-content/uploads/2025/05/Slice-1.png"
                alt="Machinery and Plant"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-4">
                "Hazelrigg provided exceptional services from concept to completion, on a large scale redevelopment of a Rural Property in Northumberland we have owned for over 40 years. Renovated to modern standards whilst sympathetically retaining the character of this amazing 160 year old building. Lead builder and developer, Kevin, provided exceptional support at every step, I cant recommend them enough."
              </p>
              <p className="text-off-white font-medium">Private Client, London Based</p>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-4">
                "Hazelrigg Enterprises Ltd, have provided us with the highest standards of quality and service performance for over 15 years. Supplying us with the highest standards of building development work and installation services on multiple projects throughout the UK. A most professional quality service at competitive prices. Providing comprehensive site management planning and materials management."
              </p>
              <p className="text-off-white font-medium">Long-term Client, UK</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">Contact Us</h2>
          <p className="text-silver mb-8 max-w-2xl mx-auto">
            Whatever you are looking for, contact Hazelrigg Enterprises today. Our experienced team provides personalised guidance through every step of the acquisition process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="tel:03337723903" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors">
              0333 772 3903
            </a>
            <Link 
              href="/contact" 
              className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              Send an Email
            </Link>
          </div>
          <p className="text-silver/60 text-sm">
            Port of Blyth, Wimbourne Quay, Regents Street, Blyth, Northumberland, NE24 1PX
          </p>
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