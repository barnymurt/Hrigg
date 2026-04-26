import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import { getFeaturedAircraft } from '@/data/aircraft'
import { Globe, Factory, Building2, Plane } from 'lucide-react'

export default function Home() {
  const featuredAircraft = getFeaturedAircraft()

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      {/* Hero Section - Services/Property Focused */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/images/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-bold text-off-white mb-6 tracking-tight">
            Machinery & Property<br />Solutions
          </h1>
          <p className="text-xl md:text-2xl text-silver mb-10 max-w-3xl mx-auto leading-relaxed">
            Global suppliers of industrial equipment and property development services. Specialising in shipping, port operations, energy, and infrastructure sectors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services" 
              className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              Our Services
            </Link>
            <Link 
              href="/about" 
              className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section - Brief */}
      <section className="py-20 px-6 border-t border-silver/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-4xl font-bold text-off-white mb-6">Who We Are</h2>
              <p className="text-silver/80 mb-4 leading-relaxed">
                Based in North East England at Port of Blyth, Hazelrigg Enterprises has decades of experience supplying industrial machinery and property solutions to clients across the UK and internationally.
              </p>
              <p className="text-silver/80 mb-6 leading-relaxed">
                We believe problems are simply <span className="text-gold">opportunities</span> in disguise. Our global network and expertise mean we can source even the most hard-to-find equipment.
              </p>
              <Link href="/about" className="text-gold hover:underline font-medium">
                Learn more about us →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 text-center">
                <Globe className="w-8 h-8 text-gold mx-auto mb-3" strokeWidth={1.5} />
                <span className="text-off-white font-semibold">Global Sourcing</span>
              </div>
              <div className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 text-center">
                <Factory className="w-8 h-8 text-gold mx-auto mb-3" strokeWidth={1.5} />
                <span className="text-off-white font-semibold">Industrial Experts</span>
              </div>
              <div className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 text-center">
                <Building2 className="w-8 h-8 text-gold mx-auto mb-3" strokeWidth={1.5} />
                <span className="text-off-white font-semibold">Property Development</span>
              </div>
              <div className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 text-center">
                <Plane className="w-8 h-8 text-gold mx-auto mb-3" strokeWidth={1.5} />
                <span className="text-off-white font-semibold">Aircraft Sales</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Core Focus */}
      <section className="py-20 px-6 bg-charcoal/50 border-y border-silver/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">Our Services</h2>
            <p className="text-silver max-w-2xl mx-auto">From industrial machinery to property development, we deliver solutions that power your business.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Machinery & Equipment */}
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-aviation-blue/20 flex items-center justify-center">
                  <Factory className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-montserrat text-2xl font-semibold text-off-white">Machinery & Equipment</h3>
                  <p className="text-silver/60">Industrial plant and equipment supply</p>
                </div>
              </div>
              <p className="text-silver/80 mb-6 leading-relaxed">
                We specialise in all types of plant equipment and machinery with some of the best available anywhere in the UK. Our global contacts in shipping, port operations, energy, and infrastructure mean we can source what you need.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Cranes & lifting equipment
                </li>
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Power generators (up to 1750kVA)
                </li>
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Pumps & water management
                </li>
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Trailers & transporters
                </li>
              </ul>
              <Link href="/equipment" className="inline-block bg-gold/10 hover:bg-gold/20 text-gold font-medium px-6 py-3 rounded transition-colors">
                View Equipment →
              </Link>
            </div>

            {/* Property Development */}
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-aviation-blue/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-montserrat text-2xl font-semibold text-off-white">Property Development</h3>
                  <p className="text-silver/60">Residential & commercial projects</p>
                </div>
              </div>
              <p className="text-silver/80 mb-6 leading-relaxed">
                We have an outstanding track record of sourcing and developing both residential and commercial property in innovative ways, adding value to portfolios and personal holdings alike.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Commercial developments
                </li>
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Residential renovations
                </li>
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Portfolio management
                </li>
                <li className="flex items-center text-silver/80">
                  <span className="text-gold mr-3">✓</span>
                  Investment properties
                </li>
              </ul>
              <Link href="/services" className="inline-block bg-gold/10 hover:bg-gold/20 text-gold font-medium px-6 py-3 rounded transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Aircraft Section - Luxury Tier */}
      <section className="py-20 px-6 border-t border-silver/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-4">
              Premium Offerings
            </span>
            <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">Executive Aircraft</h2>
            <p className="text-silver max-w-2xl mx-auto">
              For discerning clients seeking luxury private aviation, we offer a curated selection of executive aircraft with the same commitment to quality and service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredAircraft.map((aircraft) => (
              <Link 
                key={aircraft.id} 
                href={`/aircraft/${aircraft.slug}`}
                className="group bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={aircraft.images[0]}
                    alt={aircraft.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-montserrat text-base font-semibold text-off-white mb-1 line-clamp-1">{aircraft.name}</h3>
                  <p className="text-gold text-xs font-medium">{aircraft.manufacturer}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/aircraft" 
              className="inline-block border border-gold/50 text-gold hover:bg-gold/10 font-medium px-8 py-4 rounded transition-colors"
            >
              View All Aircraft
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-charcoal/50 border-y border-silver/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-12 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-6 leading-relaxed">
                "Hazelrigg Enterprises Ltd, have provided us with the highest standards of quality and service performance for over 15 years. Supplying us with the highest standards of building development work and installation services on multiple projects throughout the UK. A most professional quality service at competitive prices."
              </p>
              <p className="text-off-white font-medium">— Long-term Industrial Client</p>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-6 leading-relaxed">
                "Hazelrigg provided exceptional services from concept to completion, on a large scale redevelopment of a Rural Property in Northumberland we have owned for over 40 years. Renovated to modern standards whilst sympathetically retaining the character of this amazing 160 year old building."
              </p>
              <p className="text-off-white font-medium">— Private Client, London Based</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-4xl font-bold text-off-white mb-4">Get in Touch</h2>
          <p className="text-silver mb-8 max-w-2xl mx-auto">
            Whether you need industrial equipment, property services, or are interested in our premium aircraft offerings, we&apos;re here to help.
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
              <p className="text-silver/60 text-sm">Machinery, property, and premium aircraft solutions.</p>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Services</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/services" className="hover:text-silver">Machinery & Equipment</Link></li>
                <li><Link href="/services" className="hover:text-silver">Property Development</Link></li>
                <li><Link href="/equipment" className="hover:text-silver">Equipment Sales</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Premium</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/aircraft" className="hover:text-silver">Executive Aircraft</Link></li>
                <li><Link href="/aircraft?category=jet" className="hover:text-silver">Jets</Link></li>
                <li><Link href="/aircraft?category=turboprop" className="hover:text-silver">Turboprops</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Contact</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li>0333 772 3903</li>
                <li>info@hazelriggenterprises.co.uk</li>
                <li>Port of Blyth, NE24 1PX</li>
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