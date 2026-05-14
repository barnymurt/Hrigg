import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Privacy Policy</h1>
          <p className="text-silver text-lg">Last updated: October 22, 2020</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">1. What Information Do We Collect?</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We may collect, store and use the following kinds of personal data:
            </p>
            <ul className="text-silver/80 mb-4 leading-relaxed list-disc list-inside space-y-2">
              <li>Information about your visits to and use of this website</li>
              <li>Information about any transactions carried out between you and us on or in relation to this website, including information relating to any purchases you make of our goods or services</li>
              <li>Information that you provide to us for the purpose of registering with us and/or subscribing to our website services and/or email notifications</li>
            </ul>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">2. Information About Website Visits</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We may collect information about you computer and your visits to this website such as your IP address, geographical location, browser type, referral source, length of visit and number of page views. We may use this information in the administration of this website, to improve the website's usability, and for marketing purposes.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We use cookies on this website. A cookie is a text file sent by a web server to a web browser, and stored by the browser. The text file is then sent back to the server each time the browser requests a page from the server.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">3. Using Your Personal Data</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              Personal data submitted on this website will be used for the purposes specified in this privacy policy or in relevant parts of the website.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              In addition to the uses identified elsewhere in this privacy policy, we may use your personal information to improve your browsing experience by personalising the website, send information (other than marketing communications) to you which we think may be of interest to you, and provide other companies with statistical information about our users.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We will not without your express consent provide your personal information to any third parties for the purpose of direct marketing.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">4. Other Disclosures</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              In addition to the disclosures reasonably necessary for the purposes identified elsewhere in this privacy policy, we may disclose information about you to the extent that we are required to do so by law, in connection with any legal proceedings or prospective legal proceedings, and in order to establish, exercise or defend our legal rights.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">5. Security of Your Personal Data</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We will take reasonable precautions to prevent the loss, misuse or alteration of your personal information. Of course, data transmission over the internet is inherently insecure, and we cannot guarantee the security of data sent over the internet.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">6. Third Party Websites</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              The website contains links to other websites. We are not responsible for the privacy policies of third party websites.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">7. Contact</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              If you have any questions about this privacy policy or our treatment of your personal data, please write to us using our contact email address.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}