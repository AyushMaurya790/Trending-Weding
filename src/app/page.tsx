import Link from 'next/link';
import AnimationWrapper from '@/components/AnimationWrapper';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-pink-50 via-purple-50 to-pink-100 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <AnimationWrapper>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Create Beautiful Wedding Invitations
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Customize stunning templates for your special day with ease
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/template"
                  className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition shadow-lg"
                >
                  Browse Templates
                </Link>
                <Link
                  href="/about"
                  className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-primary"
                >
                  Learn More
                </Link>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Us?
            </h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimationWrapper delay={0.1}>
              <div className="text-center p-6">
                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Customization</h3>
                <p className="text-gray-600">
                  Personalize every detail of your invitation with our intuitive editor
                </p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.2}>
              <div className="text-center p-6">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Beautiful Designs</h3>
                <p className="text-gray-600">
                  Choose from our collection of professionally designed templates
                </p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.3}>
              <div className="text-center p-6">
                <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share your invitation with guests via WhatsApp or social media
                </p>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimationWrapper delay={0.1}>
              <div className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
                <p className="text-gray-600">Browse our beautiful collection</p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.2}>
              <div className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Login & Purchase</h3>
                <p className="text-gray-600">Secure payment process</p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.3}>
              <div className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Customize</h3>
                <p className="text-gray-600">Add your personal details</p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.4}>
              <div className="text-center">
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-2">Share</h3>
                <p className="text-gray-600">Send to your loved ones</p>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Create Your Perfect Invitation?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of happy couples who created their dream wedding invitations with us
            </p>
            <Link
              href="/template"
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Get Started Now
            </Link>
          </AnimationWrapper>
        </div>
      </section>
    </div>
  );
}
