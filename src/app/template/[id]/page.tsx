// This page displays details of a specific wedding template, including a demo view and purchase option.
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import TemplatePreview from '@/components/TemplatePreview';
import AnimationWrapper from '@/components/AnimationWrapper';
import { formatCurrency } from '@/lib/utils';
import InvitationForm from '@/components/InvitationForm'; // Import the new form component

interface TemplateData {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  jsonData: {
    fields: Array<{ name: string; label: string; type: string }>;
  };
  animationSettings: object;
}

export default function TemplateDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [showPreview, setShowPreview] = useState(false);

  // In a real application, fetch template details from API using `id`
  const template: TemplateData = {
    _id: id,
    title: 'Classic Elegance',
    description: 'A timeless design for your special day.',
    category: 'Classic',
    price: 1999,
    imageUrl: '/assets/template-classic.jpg',
    jsonData: {
      fields: [
        { name: 'groomName', label: 'Groom Name', type: 'text' },
        { name: 'brideName', label: 'Bride Name', type: 'text' },
        { name: 'venue', label: 'Venue', type: 'text' },
        { name: 'date', label: 'Date', type: 'date' },
        { name: 'time', label: 'Time', type: 'text' },
      ],
    },
    animationSettings: {},
  };

  // Initialize formData based on the template's fields, but InvitationForm will manage its own state
  // We still need this for TemplatePreview and potentially for handleBuyNow logic if it relies on these fields
  const initialFormData = template.jsonData.fields.reduce((acc, field) => {
    acc[field.name] = ''; // Initialize all fields as empty strings
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);

  useEffect(() => {
    // Update formData if template changes (e.g., if fetching from API)
    setFormData(initialFormData);
  }, [template._id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Renamed to onFormChange to better reflect its purpose when passed to InvitationForm
  const handleFormChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBuyNow = async () => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Initiate Razorpay payment
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: template.price, templateId: template._id }),
      });

      const order = await res.json();

      if (res.ok) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'ShaadiCard.in',
          description: `Purchase of ${template.title} template`,
          order_id: order.id,
          handler: async function (response: any) {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verifyRes.ok) {
              router.push(`/editor/${template._id}`);
            } else {
              alert('Payment verification failed!');
            }
          },
          prefill: {
            name: session?.user?.name || '',
            email: session?.user?.email || '',
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        alert(order.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('An error occurred during payment.');
    }
  };

  if (searchParams.get('action') === 'buy' && status !== 'loading') {
    handleBuyNow();
    router.replace(`/template/${id}`);
  }

  if (!template) {
    return <div className="text-center py-10">Template not found.</div>;
  }
  return (
    <AnimationWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">{template.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <TemplatePreview template={template} formData={formData} />
          </div>
          <div className="md:w-1/2 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Customize Template</h2>
            {/* Replaced the old form with the new InvitationForm component */}
            <InvitationForm
              formData={formData}
              onFormChange={handleFormChange}
              // Pass any other necessary props if InvitationForm needs them
            />

            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 mb-6">{template.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-green-600">{formatCurrency(template.price)}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Demo View
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-3xl w-full relative">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>
              <TemplatePreview template={template} formData={formData} />
            </div>
          </div>
        )}
      </div>
    </AnimationWrapper>
  );
}
