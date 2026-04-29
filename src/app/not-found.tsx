import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <span className="text-gold text-8xl font-bold font-montserrat">404</span>
          <h1 className="font-montserrat text-3xl font-bold text-off-white mt-6 mb-4">
            Page Not Found
          </h1>
          <p className="text-silver/70 mb-8 leading-relaxed">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="bg-gold hover:bg-gold/90 text-charcoal font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              Back to Home
            </Link>
            <Link 
              href="/contact" 
              className="border border-silver text-off-white hover:bg-silver/10 font-semibold px-8 py-4 rounded text-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
