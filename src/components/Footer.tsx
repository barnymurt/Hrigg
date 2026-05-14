import Link from 'next/link'
import Image from 'next/image'
import { CONTACT, COMPANY } from '@/constants'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-silver/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Image 
              src="/images/logo.png" 
              alt={COMPANY.name} 
              width={150} 
              height={40} 
              className="h-auto w-auto mb-4" 
              unoptimized 
            />
            <p className="text-silver/60 text-sm">{COMPANY.tagline}</p>
          </div>
          <div>
            <h5 className="text-off-white/80 font-medium mb-3">Our Services</h5>
            <ul className="space-y-2 text-silver/60 text-sm">
              <li><Link href="/services" className="hover:text-silver">All Services</Link></li>
              <li><Link href="/projects" className="hover:text-silver">Property Development</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-off-white/80 font-medium mb-3">Industrial Plant</h5>
            <ul className="space-y-2 text-silver/60 text-sm">
              <li><Link href="/equipment?category=generators" className="hover:text-silver">Power Generators</Link></li>
              <li><Link href="/equipment?category=cranes" className="hover:text-silver">Cranes</Link></li>
              <li><Link href="/equipment?category=trailers" className="hover:text-silver">Trailers & Transporters</Link></li>
              <li><Link href="/equipment?category=pumps" className="hover:text-silver">Pumps</Link></li>
              <li><Link href="/equipment?category=mobile-boat-hoists" className="hover:text-silver">Mobile Boat Hoists</Link></li>
              <li><Link href="/equipment?category=tower-lights" className="hover:text-silver">Tower Lights</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-off-white/80 font-medium mb-3">Aviation & Motorcars</h5>
            <ul className="space-y-2 text-silver/60 text-sm">
              <li><Link href="/aircraft" className="hover:text-silver">Aircraft</Link></li>
              <li><Link href="/motorcars" className="hover:text-silver">Motorcars</Link></li>
            </ul>
            <h5 className="text-off-white/80 font-medium mb-3 mt-6">Contact</h5>
            <ul className="space-y-2 text-silver/60 text-sm">
              <li><a href={CONTACT.phoneLink} className="hover:text-silver">{CONTACT.phone}</a></li>
              <li><a href={CONTACT.emailLink} className="hover:text-silver">{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-silver/10">
          <div className="flex flex-wrap justify-center gap-6 text-silver/40 text-sm mb-4">
            <Link href="/privacy-policy" className="hover:text-silver">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-silver">Cookie Policy</Link>
            <Link href="/disclaimer" className="hover:text-silver">Disclaimer</Link>
            <Link href="/terms-and-conditions" className="hover:text-silver">Terms & Conditions</Link>
            <Link href="/compliance" className="hover:text-silver">Compliance</Link>
          </div>
          <div className="text-center text-silver/40 text-sm">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
