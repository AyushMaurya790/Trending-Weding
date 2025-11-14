import Image from 'next/image';
import Link from 'next/link';
import AnimationWrapper from '@/components/AnimationWrapper';

// Mock template data - in production, this would fetch from DB
const templates = [
  {
    _id: '1',
    title: 'Classic Elegance',
    description: 'A timeless design for your special day.',
    imageUrl: '/assets/template-classic.jpg',
    price: 1999,
  },
  {
    _id: '2',
    title: 'Modern Minimalist',
    description: 'Sleek and simple, yet profoundly beautiful.',
    imageUrl: '/assets/template-modern.jpg',
    price: 2499,
  },
  {
    _id: '3',
    title: 'Floral Fantasy',
    description: 'Embrace the beauty of nature with vibrant florals.',
    imageUrl: '/assets/template-floral.jpg',
    price: 2999,
  },
  {
    _id: '4',
    title: 'Royal Heritage',
    description: 'Traditional designs with a regal touch.',
    imageUrl: '/assets/template-royal.jpg',
    price: 3499,
  },
  {
    _id: '5',
    title: 'Garden Romance',
    description: 'Fresh and romantic botanical themes.',
    imageUrl: '/assets/template-garden.jpg',
    price: 2799,
  },
  {
    _id: '6',
    title: 'Vintage Charm',
    description: 'Nostalgic designs with classic appeal.',
    imageUrl: '/assets/template-vintage.jpg',
    price: 2599,
  },
];

export default function TemplateDetail({ params }: { params: { id: string } }) {
  const template = templates.find((t) => t._id === params.id);

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
          <Link href="/template" className="text-primary hover:underline">
            ← Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/template" className="text-primary hover:underline inline-flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Templates
          </Link>
        </div>
      </section>

      {/* Template Preview */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Image */}
            <AnimationWrapper>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-[600px]">
                  <Image
                    src={template.imageUrl}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </AnimationWrapper>

            {/* Details */}
            <AnimationWrapper delay={0.2}>
              <div>
                <h1 className="text-4xl font-bold mb-4">{template.title}</h1>
                <p className="text-xl text-gray-600 mb-6">{template.description}</p>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-primary">₹{template.price}</span>
                    <span className="text-gray-500 ml-2">one-time payment</span>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Fully Customizable</p>
                        <p className="text-gray-600 text-sm">Edit all text, images, and details</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Auto-Save Feature</p>
                        <p className="text-gray-600 text-sm">Changes saved automatically</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Easy Sharing</p>
                        <p className="text-gray-600 text-sm">Share via WhatsApp & social media</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Mobile Responsive</p>
                        <p className="text-gray-600 text-sm">Perfect on all devices</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/login?callbackUrl=/template/${template._id}`}
                    className="block w-full bg-primary text-white text-center px-6 py-4 rounded-lg hover:bg-opacity-90 transition font-semibold text-lg"
                  >
                    Purchase & Customize
                  </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This is a demo preview. After purchase, you'll be able to 
                    customize all details including names, dates, events, images, and more.
                  </p>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>
    </div>
  );
}
