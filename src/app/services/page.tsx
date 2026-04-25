import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Our Services</h1>
          <p className="text-silver text-lg">Property & Machinery Supply Services</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-silver/80 mb-6 leading-relaxed">
                <span className="text-gold font-semibold">Hazelrigg Enterprises: Your Trusted Supplier of Industrial Spare Parts, Components & Machinery in the UK.</span> At Hazelrigg Enterprises, we supply a wide range of industrial parts, components, plant and machinery from leading brands across multiple industries.
              </p>
              <p className="text-silver/80 mb-6 leading-relaxed">
                Our extensive product offering includes everything from precision cutting equipment to heavy-duty hand tools, everything you need to keep your operations running smoothly and efficiently.
              </p>
              <p className="text-silver/80 mb-6 leading-relaxed">
                Discover our extensive selection of modern aircraft, cranes, power generators, marinas, tower lights, and transporters, all available for sale on our website.
              </p>
              <p className="text-silver/80 leading-relaxed">
                We specialise in all types of plant machinery and equipment, offering some of the finest options available anywhere in the UK. If you&apos;re looking for something specific that isn&apos;t currently listed, our team can source it quickly and at the best possible price, guaranteed.
              </p>
            </div>
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image
                src="https://hazelriggenterprises.co.uk/wp-content/uploads/2025/10/hazelriggenterprises-1000-1.png"
                alt="Hazelrigg Enterprises Services"
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
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Industrial and Commercial Machinery Supply</h3>
              <p className="text-silver/80 mb-4">
                Our ability to find those items that you want – and even some you may not yet know you want – is legendary! We have contacts especially in the shipping, port operations, energy and infrastructure sectors on a global basis.
              </p>
              <p className="text-silver/80">
                Need a gas generator in Turkey next week? <span className="text-gold font-semibold">We can help.</span>
              </p>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Commercial and Private Property Services</h3>
              <p className="text-silver/80 mb-4">
                We have an outstanding track record of sourcing and developing both residential and commercial property in an innovative way to add value to any portfolio or personal property.
              </p>
              <Link href="/projects" className="text-gold hover:underline">
                View our projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-6">Explore Our Range</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/plant-equipment" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors">
              View Plant & Equipment
            </Link>
            <Link href="/aircraft" className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors">
              View Aircraft
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-4">Contact Us</h2>
          <p className="text-silver mb-8">
            Call us now for more details on <span className="text-gold font-semibold">+44 333 772 3903</span> for more information.
          </p>
          <Link href="/contact" className="inline-block border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors">
            Get a Quote
          </Link>
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