import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">About</h1>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-montserrat text-3xl font-bold text-off-white mb-6">Welcome to Hazelrigg Enterprises!</h2>
              <p className="text-silver/80 mb-6 leading-relaxed">
                Based in North East England we are proud to serve our clients' needs in the property and machinery supply sectors in the UK and internationally. Our vast experience, combined with our dedicated commitment, means we always provide an exceptional personal service you can rely on.
              </p>
              <p className="text-silver/80 mb-6 leading-relaxed">
                We believe problems are simply opportunities in disguise! Contact us at <a href="mailto:info@hazelriggenterprisesltd.co.uk" className="text-gold hover:underline">info@hazelriggenterprisesltd.co.uk</a> and tell us how we can help you.
              </p>
              <p className="text-silver/80 leading-relaxed">
                Visit our offices at <a href="https://portofblyth.co.uk/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Port of Blyth</a>
              </p>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Plant and Equipment</h3>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                We now have a diverse range of modern aircraft, cranes, power generators, marinas, tower lights and transporters listed on our website for sale.
              </p>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                We specialise in all types of plant equipment and machinery with some of the best available anywhere in the UK. Should you require something that we currently don't have we are confident that we will be able to source it for you at the very best price guaranteed.
              </p>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                We have many years of experience in shipping equipment across the UK and worldwide. Whatever your requirements we will take care of everything door to door.
              </p>
              <Link href="/equipment" className="text-gold hover:underline text-sm font-medium">
                View Plant and Equipment →
              </Link>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Property Services</h3>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                We have an outstanding track record of sourcing and developing both residential and commercial property in an innovative way to add value to any portfolio or personal property.
              </p>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                You can view some of our recent projects via our projects section.
              </p>
              <Link href="/projects" className="text-gold hover:underline text-sm font-medium">
                View Projects →
              </Link>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Light Aircraft Sales</h3>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                Hazelrigg has become one of the UK's premier destinations for light aircraft sales, trusted by pilots, owners and aviation enthusiasts alike. We provide a streamlined, transparent platform where buying and selling aircraft is simple, secure, and efficient.
              </p>
              <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                Driven by a genuine passion for aviation, our experienced team is committed to delivering outstanding service at every stage, whether you're purchasing your first aircraft or adding to an established fleet.
              </p>
              <Link href="/aircraft" className="text-gold hover:underline text-sm font-medium">
                View Aircraft →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-8">Contact Us</h2>
          <p className="text-silver/80 mb-4 leading-relaxed">
            Have a question about our products or services? Drop us a note or call us. We'd love to hear from you.
          </p>
          <p className="text-silver/80 mb-8">
            <strong>Call us now for more details on:</strong>
          </p>
          <p className="font-montserrat text-2xl text-gold font-bold mb-6">+44 333 772 3903</p>
          <Link href="/contact" className="inline-block bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors">
            Get a Quote
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-6 leading-relaxed">
                "Hazelrigg provided exceptional services from concept to completion, on a large scale redevelopment of a Rural Property in Northumberland we have owned for over 40 years. Renovated to modern standards whilst sympathetically retaining the character of this amazing 160 year old building. Lead builder and developer, Kevin, provided exceptional support at every step, I cant recommend them enough."
              </p>
              <p className="text-off-white font-medium">Private Client, London Based</p>
            </div>
            <div className="bg-charcoal/30 rounded-xl p-8 border border-silver/10">
              <p className="text-silver/80 italic mb-6 leading-relaxed">
                "Hazelrigg Enterprises Ltd, have provided us with the highest standards of quality and service performance for over 15 years. Supplying us with the highest standards of building development work and installation services on multiple projects throughout the UK. A most professional quality service at competitive prices."
              </p>
              <p className="text-off-white font-medium">Long-term Industrial Client</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-silver/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-6">Quality Statement</h2>
          <p className="text-silver/80 leading-relaxed">
            At Hazelrigg Enterprises Ltd we are committed to providing world-class property, machinery and equipment solutions that exceed the expectations of our customers globally. Our goal is to deliver high-quality products that meet the highest standards of performance, reliability, and safety, ensuring long-term value for industries across diverse sectors.
          </p>
          <p className="text-silver/80 mt-6 leading-relaxed">
            We take pride in our strong focus on quality at every stage of our operations — from product sourcing to delivery, installation, and after-sales support. Our dedicated team of professionals works relentlessly to innovate, continuously improving our processes to ensure that each product or service delivered is engineered for excellence.
          </p>
        </div>
      </section>

      <footer className="py-12 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Contact Details</h5>
              <p className="text-silver/60 text-sm">
                Port of Blyth<br />
                Wimbourne Quay<br />
                Regents Street<br />
                Blyth<br />
                Northumberland<br />
                NE24 1PX
              </p>
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
                <li><Link href="/equipment?category=cranes" className="hover:text-silver">Cranes</Link></li>
                <li><Link href="/equipment?category=generators" className="hover:text-silver">Generators</Link></li>
                <li><Link href="/equipment?category=pumps" className="hover:text-silver">Pumps</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-off-white/80 font-medium mb-3">Contact</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li>+44 333 772 3903</li>
                <li>info@hazelriggenterprisesltd.co.uk</li>
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