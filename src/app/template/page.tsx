'use client';
import TemplateCard from '@/components/TemplateCard';
import AnimationWrapper from '@/components/AnimationWrapper';

interface TemplateData {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function Templete() {
  const templates: TemplateData[] = [
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
  ];

  return (
      <main className=" container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Perfect Wedding Invitation</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <AnimationWrapper key={template._id}>
              <TemplateCard template={template} />
            </AnimationWrapper>
          ))}
        </div>
      </main>
  );
}
