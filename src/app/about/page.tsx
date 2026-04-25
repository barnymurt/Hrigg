import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">About Us</h1>
          <p className="text-silver text-lg">Welcome to Hazelrigg Enterprises</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-silver/80 mb-6 leading-relaxed">
                Based in North East England we are proud to serve our clients&apos; needs in the property and machinery supply sectors in the UK and internationally. Our vast experience, combined with our dedicated commitment, means we always provide an exceptional personal service you can rely on.
              </p>
              <p className="text-silver/80 mb-6 leading-relaxed">
                We believe problems are simply opportunities in disguise! Contact us at info@hazelriggenterprises.co.uk and tell us how we can help you.
              </p>
              <p className="text-silver/80 leading-relaxed">
                Visit our offices at <a href="https://portofblyth.co.uk/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Port of Blyth</a>
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="https://hazelriggenterprises.co.uk/wp-content/uploads/2025/10/hazelriggenterprises-1000-2.png"
                alt="Hazelrigg Enterprises"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-charcoal/50 border-y border-silver/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Plant & Equipment</h3>
              <p className="text-silver/80 text-sm mb-4">
                We have a diverse range of modern aircraft, cranes, power generators, marinas, tower lights and transporters listed on our website for sale.
              </p>
              <Link href="/plant-equipment" className="text-gold hover:underline text-sm">
                View Equipment →
              </Link>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Property Services</h3>
              <p className="text-silver/80 text-sm mb-4">
                We have an outstanding track record of sourcing and developing both residential and commercial property in an innovative way to add value to any portfolio.
              </p>
              <Link href="/projects" className="text-gold hover:underline text-sm">
                View Projects →
              </Link>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Light Aircraft Sales</h3>
              <p className="text-silver/80 text-sm mb-4">
                Hazelrigg has become one of the UK&apos;s premier destinations for light aircraft sales, trusted by pilots, owners and aviation enthusiasts alike.
              </p>
              <Link href="/aircraft" className="text-gold hover:underline text-sm">
                View Aircraft →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-8">Machinery Supply Services</h2>
          <p className="text-silver/80 mb-6 leading-relaxed">
            Our ability to find those items that you want – and even some you may not yet know you want – is legendary! We have contacts especially in the shipping, port operations, energy and infrastructure sectors on a global basis.
          </p>
          <p className="text-silver/80 mb-8 leading-relaxed">
            Need a gas generator in Turkey next week? <span className="text-gold font-medium">We can help.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="tel:03337723903" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors inline-block text-center">
              Call +44 333 772 3903
            </a>
            <Link href="/contact" className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors inline-block text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-4">
                "Hazelrigg provided exceptional services from concept to completion, on a large scale redevelopment of a Rural Property in Northumberland we have owned for over 40 years. Renovated to modern standards whilst sympathetically retaining the character of this amazing 160 year old building. Lead builder and developer, Kevin, provided exceptional support at every step, I cant recommend them enough."
              </p>
              <p className="text-off-white font-medium">Private Client, London Based</p>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-4">
                "Hazelrigg Enterprises Ltd, have provided us with the highest standards of quality and service performance for over 15 years. Supplying us with the highest standards of building development work and installation services on multiple projects throughout the UK. A most professional quality service at competitive prices."
              </p>
              <p className="text-off-white font-medium">Long-term Client, UK</p>
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