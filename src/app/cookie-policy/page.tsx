import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navigation />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-montserrat text-5xl font-bold text-off-white mb-4">Cookie Policy</h1>
          <p className="text-silver text-lg">Last updated: October 22, 2020</p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <p className="text-silver/80 mb-4 leading-relaxed">
              We use a number of different cookies on our site. If you do not know what cookies are, or how to control or delete them, then we recommend you visit <a href="http://www.aboutcookies.org" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">http://www.aboutcookies.org</a> for detailed guidance.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              The list below describe the cookies we use on this site and what we use them for. Currently we operate an 'implied consent' policy which means that we assume you are happy with this usage. If you are not happy, then you should either not use this site, or you should delete the cookies having visited the site, or you should browse the site using your browser's anonymous usage setting (called "Incognito" in Chrome, "InPrivate" for Internet Explorer, "Private Browsing" in Firefox and Safari etc.)
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10 mb-8">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">First Party Cookies</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              These are cookies that are set by this website directly.
            </p>
            <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">Google Analytics</h3>
            <p className="text-silver/80 mb-4 leading-relaxed">
              We use Google Analytics to collect information about visitor behaviour on our website. Google Analytics stores information about what pages you visit, how long you are on the site, how you got here and what you click on. This Analytics data is collected via a JavaScript tag in the pages of our site and is not tied to personally identifiable information. We therefore do not collect or store your personal information (e.g. your name or address) so this information cannot be used to identify who you are.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You can find out more about Google's position on privacy as regards its analytics service at <a href="http://www.google.com/intl/en_uk/analytics/privacyoverview.html" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">http://www.google.com/intl/en_uk/analytics/privacyoverview.html</a>
            </p>
            <h3 className="font-montserrat text-xl font-semibold text-off-white mb-4">WordPress</h3>
            <p className="text-silver/80 mb-4 leading-relaxed">
              Our websites run the popular WordPress CMS and cookies are used to store basic data on your interactions with WordPress, and whether you have logged into WordPress. We use a session cookie to remember your log-in for you if you are a registered user and we deem these as being strictly necessary to the working of the website. If these are disabled then various functionality on the site will be broken.
            </p>
          </div>

          <div className="bg-charcoal/50 rounded-xl p-8 border border-silver/10">
            <h2 className="font-montserrat text-2xl font-semibold text-off-white mb-6">Third Party Cookies</h2>
            <p className="text-silver/80 mb-4 leading-relaxed">
              These are cookies set on your machine by external websites whose services are used on this site. Cookies of this type are the sharing buttons across the site allow visitors to share content onto social networks. Cookies are currently set by LinkedIn, Twitter, Facebook, Google+ and Pinterest. In order to implement these buttons, and connect them to the relevant social networks and external sites, there are scripts from domains outside of our website. You should be aware that these sites are likely to be collecting information about what you are doing all around the internet, including on this website.
            </p>
            <p className="text-silver/80 mb-4 leading-relaxed">
              You should check the respective policies of each of these sites to see how exactly they use your information and to find out how to opt out, or delete, such information.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}