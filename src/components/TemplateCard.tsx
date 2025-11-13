// This component displays a single wedding template with a demo view option.
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

interface TemplateCardProps {
  template: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
  };
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      <Image
        src={template.imageUrl}
        alt={template.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{template.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{template.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold">{formatCurrency(template.price)}</span>
          <Link href={`/template/${template._id}`} className="text-blue-600 hover:underline">
            Demo View
          </Link>
        </div>
        <Link
          href={`/template/${template._id}?action=buy`} // Link to template details page with buy action
          className="block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
