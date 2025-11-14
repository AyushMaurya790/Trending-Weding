import AnimationWrapper from '@/components/AnimationWrapper';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-xl">
                Creating beautiful memories, one invitation at a time
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimationWrapper>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                WeddingInvites was born from a simple belief: every couple deserves beautiful, 
                personalized wedding invitations that reflect their unique love story. We understand 
                that your wedding day is one of the most important moments in your life, and the 
                invitation is the first glimpse your guests get of your celebration.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our journey began when we realized that creating beautiful wedding invitations 
                shouldn't be complicated or expensive. We combined professional design expertise 
                with easy-to-use technology to create a platform where anyone can design stunning 
                invitations in minutes.
              </p>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Mission & Values
            </h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimationWrapper delay={0.1}>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-primary mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Quality</h3>
                <p className="text-gray-600 text-center">
                  We're committed to providing premium templates designed by professionals
                </p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.2}>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-primary mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Customer Focus</h3>
                <p className="text-gray-600 text-center">
                  Your satisfaction is our priority. We're here to help every step of the way
                </p>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.3}>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-primary mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">Innovation</h3>
                <p className="text-gray-600 text-center">
                  We continuously improve our platform with the latest design trends
                </p>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <AnimationWrapper delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
                <div className="text-gray-600">Happy Couples</div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.2}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Templates</div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.3}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.4}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What Our Customers Say
            </h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimationWrapper delay={0.1}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Absolutely loved the templates! Creating our wedding invitation was so easy 
                  and the result was stunning. Highly recommended!"
                </p>
                <div className="font-semibold">Priya & Rahul</div>
                <div className="text-sm text-gray-500">Mumbai</div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.2}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "The customization options were perfect! We could add all our wedding details 
                  and share it instantly with our family and friends."
                </p>
                <div className="font-semibold">Anjali & Vikram</div>
                <div className="text-sm text-gray-500">Delhi</div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={0.3}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Beautiful designs and great customer support! The whole process was seamless 
                  from start to finish. Thank you!"
                </p>
                <div className="font-semibold">Neha & Arjun</div>
                <div className="text-sm text-gray-500">Bangalore</div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
