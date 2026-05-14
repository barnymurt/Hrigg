import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Compliance</h1>
          <p className="text-silver text-lg">Our commitment to quality and regulatory compliance</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">Quality Statement</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              At Hazelrigg Enterprises Ltd we are committed to providing world-class property, machinery and equipment solutions that exceed the expectations of our customers globally. Our goal is to deliver high-quality products that meet the highest standards of performance, reliability, and safety, ensuring long-term value for industries across diverse sectors.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We take pride in our strong focus on quality at every stage of our operations — from product sourcing to delivery, installation, and after-sales support. Our dedicated team of professionals works relentlessly to innovate, continuously improving our processes to ensure that each product or service delivered is engineered for excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Contact Details</h3>
              <p className="text-silver/80">
                PORT OF BLYTH<br />
                WIMBOURNE QUAY<br />
                REGENTS STREET<br />
                BLYTH<br />
                NORTHUMBERLAND<br />
                NE24 1PX
              </p>
            </div>
            <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
              <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Get In Touch</h3>
              <p className="text-silver/80 mb-2">
                <span className="text-gold">Phone:</span> 0333 772 3903
              </p>
              <p className="text-silver/80">
                <span className="text-gold">Email:</span> info@hazelriggenterprises.co.uk
              </p>
            </div>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">Useful Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/privacy-policy" className="text-silver hover:text-gold py-2">Privacy Policy</Link>
              <Link href="/cookie-policy" className="text-silver hover:text-gold py-2">Cookie Policy</Link>
              <Link href="/disclaimer" className="text-silver hover:text-gold py-2">Disclaimer</Link>
              <Link href="/terms-and-conditions" className="text-silver hover:text-gold py-2">Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}