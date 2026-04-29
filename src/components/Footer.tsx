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
              <li><a href={CONTACT.phoneLink} className="hover:text-silver">{CONTACT.phone}</a></li>
              <li><a href={CONTACT.emailLink} className="hover:text-silver">{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-silver/10 text-center text-silver/40 text-sm">
          © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
