import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Terms and Conditions</h1>
          <p className="text-silver text-lg">Last updated: October 22, 2020</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">1. Introduction</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              These terms and conditions govern your use of this website; by using this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.
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
              You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">You must not:</p>
            <ul className="text-silver/80 mb-4 leading-relaxed list-disc list-inside space-y-2">
              <li>Republish material from this website (including republication on another website)</li>
              <li>Sell, rent or sub-license material from the website</li>
              <li>Show any material from the website in public</li>
              <li>Reproduce, duplicate, copy or otherwise exploit material on this website for a commercial purpose</li>
              <li>Edit or otherwise modify any material on the website</li>
              <li>Redistribute material from this website except for content specifically and expressly made available for redistribution</li>
            </ul>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">4. Acceptable Use</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">5. Restricted Access</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We reserve the right to restrict access to areas of this website, or indeed this whole website, at our discretion. If we provide you with a user ID and password to enable you to access restricted areas of this website or other content or services, you must ensure that that user ID and password is kept confidential.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">6. Limitation of Liability</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              To the extent permitted by law, we exclude all representations, warranties and conditions relating to this website and your use of it. Nothing in these terms and conditions will:
            </p>
            <ul className="text-silver/80 mb-4 leading-relaxed list-disc list-inside space-y-2">
              <li>Limit or exclude our or your liability for death or personal injury resulting from negligence</li>
              <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation</li>
              <li>Limit any of our or your liabilities in any way that is not permitted under applicable law</li>
              <li>Exclude any of our or your liabilities that may not be excluded under applicable law</li>
            </ul>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">7. Indemnity</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You hereby indemnify us and undertake to keep us indemnified against any losses, damages, costs, liabilities and expenses incurred or suffered by us arising out of any breach by you of any provision of these terms and conditions.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">8. Variation</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of this website from the date of publication of the revised terms and conditions on this website.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">9. Entire Agreement</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              These terms and conditions, together with our privacy policy, constitute the entire agreement between you and us in relation to your use of this website, and supersede all previous agreements in respect of your use of this website.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">10. Law and Jurisdiction</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              These terms and conditions will be governed by and construed in accordance with English law, and any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of England.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}