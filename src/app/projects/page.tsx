import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Image from 'next/image'

const projects = [
  {
    slug: 'investment-properties',
    title: 'Reading Business Park',
    label: 'Investment Properties',
    description: 'Serial conversions targeting the upscale student market. Exceptional use of space to maximise rental income.',
    image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2020/11/READING-WEB-800-X600-003.jpg',
    details: 'Serial conversions completed for a client targeting the upscale student market from Newcastle and Northumbria universities.',
  },
  {
    slug: 'commercial-domestic',
    title: 'St Thomas Hospital London',
    label: 'Commercial – Domestic Properties',
    description: 'Comprehensive commercial and domestic property development in Central London.',
    image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2020/11/project.jpg',
    details: 'High-quality commercial and domestic property services in London.',
  },
  {
    slug: 'back-to-brick',
    title: 'Nottingham Museum',
    label: 'Back to Brick Refurbishment',
    description: 'Back to brick property refurbishment with innovative space utilisation.',
    image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2020/11/notts-web-800-x-600-003.jpg',
    details: 'Full and comprehensive refurbishment of a suburban terraced house in Gosforth, Newcastle upon Tyne. Innovative use of space to create valuable off street car parking.',
  },
  {
    slug: 'property-development',
    title: 'Nine Elms Station',
    label: 'Property Development',
    description: 'Rural property renovation and development in Northumberland. 160 year old building sympathetically restored.',
    image: 'https://hazelriggenterprises.co.uk/wp-content/uploads/2020/11/nine-elms.jpg',
    details: 'Full and comprehensive renovation to modern standards, whilst sympathetically retaining the character of a 160 year old building. Installation of electrical power for the first time in the properties history.',
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Property Projects</h1>
          <p className="text-silver text-lg">Showcasing our expertise across residential and commercial property development</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div 
                key={project.slug}
                className="group relative bg-charcoal/50 rounded-xl overflow-hidden border border-silver/10 hover:border-gold/30 transition-all duration-300"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                  
                  {/* Hover Label - H2 style */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs tracking-widest uppercase text-off-white/90 bg-charcoal/60 backdrop-blur-sm px-4 py-2 rounded border border-silver/20">
                      {project.label}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-4 group-hover:text-gold transition-colors duration-300">
                    {project.title}
                  </h2>
                  <p className="text-silver/80 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-silver/60 text-sm mb-6">
                    {project.details}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-silver/10">
                    <span className="text-gold text-sm">View Project</span>
                    <span className="text-gold group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-charcoal/50 border-t border-silver/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl font-bold text-off-white mb-6">Start Your Property Project</h2>
          <p className="text-silver mb-8 max-w-2xl mx-auto">
            Whether you're looking to invest, develop, or refurbish, our team has the expertise to deliver exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors">
              Contact Us
            </Link>
            <Link href="/services" className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-silver/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/images/logo.png" alt="Hazelrigg Enterprises" width={150} height={40} className="h-auto w-auto mb-4" unoptimized />
              <p className="text-silver/60 text-sm">Premium industrial equipment and property services.</p>
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
              <h5 className="text-off-white/80 font-medium mb-3">Services</h5>
              <ul className="space-y-2 text-silver/60 text-sm">
                <li><Link href="/services" className="hover:text-silver">Property Development</Link></li>
                <li><Link href="/projects" className="hover:text-silver">Projects</Link></li>
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