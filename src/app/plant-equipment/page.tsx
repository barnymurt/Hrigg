import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'
import Footer from '@/components/Footer'

export default function PlantEquipmentPage() {
  const categories = [
    { name: 'Aircraft', href: '/aircraft', icon: '✈️', count: '11' },
    { name: 'Cranes', href: '/plant-equipment?category=cranes', icon: '🏗️', count: '6' },
    { name: 'Power Generators', href: '/plant-equipment?category=generators', icon: '⚡', count: '25+' },
    { name: 'Pumps', href: '/plant-equipment?category=pumps', icon: '💧', count: '8' },
    { name: 'Trailers & Transporters', href: '/plant-equipment?category=trailers', icon: '🚛', count: '5' },
    { name: 'Tower Lights', href: '/plant-equipment?category=tower-lights', icon: '💡', count: '4' },
  ]

  const featuredEquipment = [
    {
      name: '1130kVA CPG Cummins Used Generator',
      description: '1132kVA Standby Power – Designed to handle substantial electrical loads with ease, ensuring dependable power for demanding environments.',
      image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/3202_-_1000KVA_KTA38-G5_Cummins_Stamford_Containerised_2_20250909_085130.jpg',
      category: 'Power Generators',
    },
    {
      name: '1315kVA Broadcrown Perkins Generator',
      description: '1315kVA Standby Output – supports large-scale loads for critical infrastructure with Perkins engine.',
      image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/2988_-_1315kVA_Broadcrown_Perkins_Stamford_Open_3_20250219_110516-1.jpg',
      category: 'Power Generators',
    },
    {
      name: '1750kVA Dale CAT Used Generator',
      description: '1750 kVA Standby Power – Capable of handling substantial electrical loads with confidence.',
      image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2026/02/3084_-_1750kVA_Dale_CAT_3500_Stamford_Open_4_20250327_143745-2.jpg',
      category: 'Power Generators',
    },
  ]

  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Plant & Equipment</h1>
          <p className="text-silver text-lg max-w-3xl">
            We specialise in all types of plant equipment and machinery with some of the best available anywhere in the UK. Should you require something that we currently don&apos;t have, we are confident that we will be able to source it for you at the very best price guaranteed.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.name}
                href={cat.href}
                className="bg-charcoal/50 rounded-xl p-6 border border-silver/10 hover:border-gold/30 transition-all text-center"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-off-white font-medium mb-1">{cat.name}</h3>
                <p className="text-silver/60 text-sm">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 border-t border-silver/10 pt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-8">Featured Equipment</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredEquipment.map((item, idx) => (
              <div key={idx} className="bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <span className="text-gold text-xs uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-off-white font-semibold mt-2 mb-3">{item.name}</h3>
                  <p className="text-silver/80 text-sm line-clamp-3">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-4">Looking for Something Specific?</h2>
          <p className="text-silver mb-8">
            Need a gas generator on site next week? <Link href="/equipment" className="text-gold font-semibold hover:underline">We can help.</Link> Our ability to find those items that you want – and even some you may not yet know you want – is legendary!
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

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-montserrat text-3xl font-bold text-off-white mb-6">Our Expertise</h2>
              <p className="text-silver/80 mb-6">
                We have many years of experience in shipping equipment across the UK and worldwide. Whatever your requirements we will take care of everything door to door.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <span className="text-off-white/80">Shipping, port operations, energy and infrastructure sectors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <span className="text-off-white/80">Global sourcing network</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <span className="text-off-white/80">Door-to-door service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 mt-1">✓</span>
                  <span className="text-off-white/80">Best price guaranteed</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-montserrat text-3xl font-bold text-off-white mb-6">Industries Served</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Shipping', 'Port Operations', 'Energy', 'Infrastructure', 'Construction', 'Marine', 'Mining', 'Manufacturing'].map((industry) => (
                  <div key={industry} className="bg-charcoal/50 rounded-lg p-4 border border-silver/10">
                    <span className="text-off-white">{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}