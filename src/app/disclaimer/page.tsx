import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Disclaimer</h1>
          <p className="text-silver text-lg">Last updated: October 22, 2020</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">1. Introduction</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              This disclaimer governs your use of our website; by using our website, you accept this disclaimer in full. If you disagree with any part of this disclaimer, do not use our website.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">2. Intellectual Property Rights</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              Unless otherwise stated, we or our licensors own the intellectual property rights in the website and material on the website. Subject to the licence below, all our intellectual property rights are reserved.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">3. Licence to Use Website</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You may view, download for caching purposes only, and print pages from the website, provided that:
            </p>
            <ul className="text-silver/80 mb-4 leading-relaxed list-disc list-inside space-y-2">
              <li>You must not republish material from this website (including republication on another website), or reproduce or store material from this website in any public or private electronic retrieval system</li>
              <li>You must not reproduce, duplicate, copy, sell, resell, visit, or otherwise exploit our website or material on this website for a commercial purpose, without our express written consent</li>
              <li>You must not edit or otherwise modify any material on the website</li>
            </ul>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">4. Limitations of Liability</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              The information on this website is provided free-of-charge, and you acknowledge that it would be unreasonable to hold us liable in respect of this website and the information on this website.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on this website is kept up-to-date.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              To the maximum extent permitted by applicable law we exclude all representations, warranties and conditions (including, without limitation, the conditions implied by law of satisfactory quality, fitness for purpose and the use of reasonable care and skill).
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              Our liability is limited and excluded to the maximum extent permitted under applicable law. We will not be liable for any direct, indirect or consequential loss or damage arising under this disclaimer or in connection with our website, whether arising in tort, contract, or otherwise.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              However, nothing in this disclaimer shall exclude or limit our liability for fraud, for death or personal injury caused by our negligence, or for any other liability which cannot be excluded or limited under applicable law.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">5. Variation</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We may revise this disclaimer from time-to-time. Please check this page regularly to ensure you are familiar with the current version.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">6. Entire Agreement</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              This disclaimer constitutes the entire agreement between you and us in relation to your use of our website, and supersedes all previous agreements in respect of your use of this website.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">7. Law and Jurisdiction</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              This notice will be governed by and construed in accordance with English law, and any disputes relating to this notice shall be subject to the exclusive jurisdiction of the courts of England.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">8. Contact</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You can contact us on our contact page for details.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}