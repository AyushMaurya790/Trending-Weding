'use client';
import { useEffect, useState } from 'react';
import TemplateCard from '@/components/TemplateCard';
import AnimationWrapper from '@/components/AnimationWrapper';

interface TemplateData {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function Template() {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);
 const template=([
          {
            _id: '1',
            title: 'Classic Elegance',
            description: 'A timeless design for your special day.',
            imageUrl: '/assets/1.avif',
            price: 1999,
          },
          {
            _id: '2',
            title: 'Modern Minimalist',
            description: 'Sleek and simple, yet profoundly beautiful.',
            imageUrl: '/assets/1.avif',
            price: 2499,
          },
          {
            _id: '3',
            title: 'Floral Fantasy',
            description: 'Embrace the beauty of nature with vibrant florals.',
            imageUrl: '/assets/1.avif',
            price: 2999,
          },
          {
            _id: '4',
            title: 'Royal Heritage',
            description: 'Traditional designs with a regal touch.',
            imageUrl: '/assets/1.avif',
            price: 3499,
          },
        ]);
  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      } else {
        setTemplates([
          {
            _id: '1',
            title: 'Classic Elegance',
            description: 'A timeless design for your special day.',
            imageUrl: 'https://plus.unsplash.com/premium_photo-1757322537445-892532434841?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 1999,
          },
          {
            _id: '2',
            title: 'Modern Minimalist',
            description: 'Sleek and simple, yet profoundly beautiful.',
            imageUrl: 'https://plus.unsplash.com/premium_photo-1757322537445-892532434841?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 2499,
          },
          {
            _id: '3',
            title: 'Floral Fantasy',
            description: 'Embrace the beauty of nature with vibrant florals.',
            imageUrl: 'https://plus.unsplash.com/premium_photo-1757322537445-892532434841?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 2999,
          },
          {
            _id: '4',
            title: 'Royal Heritage',
            description: 'Traditional designs with a regal touch.',
            imageUrl: 'https://plus.unsplash.com/premium_photo-1757322537445-892532434841?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price: 3499,
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      setTemplates([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-linear-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wedding Invitation Templates
              </h1>
              <p className="text-xl">
                Choose from our beautiful collection of professionally designed templates
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading templates...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {templates.length} Templates Available
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {template.map((template, index) => (
                <AnimationWrapper key={template._id} delay={index * 0.1}>
                  <TemplateCard template={template} />
                </AnimationWrapper>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
