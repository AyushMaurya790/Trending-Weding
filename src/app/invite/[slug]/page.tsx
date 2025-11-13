// This page displays a public, read-only view of a customized wedding invite.
'use client';

import { useState, useEffect } from 'react';
import AnimationWrapper from '@/components/AnimationWrapper';
import dbConnect from '@/lib/dbConnect';
import CustomInvite from '@/models/CustomInvite';
import Template from '@/models/Template';

interface CustomInviteData {
  _id: string;
  userId: string;
  templateId: string;
  customFields: Record<string, string>;
  publicUrl: string;
  isPaid: boolean;
  createdAt: Date;
}

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

export default function InvitePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [invite, setInvite] = useState<CustomInviteData | null>(null);
  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInviteData() {
      try {
        // In a real application, fetch invite details from API using `slug`
        // For now, we'll use dummy data and simulate API call
        await dbConnect(); // Ensure DB connection for server-side rendering (or API route)

        const dummyInvite: CustomInviteData = {
          _id: 'invite123',
          userId: 'user123',
          templateId: '1', // Corresponds to dummy template ID in page.tsx
          customFields: {
            groomName: 'John Doe',
            brideName: 'Jane Smith',
            venue: 'Grand Ballroom',
            date: '2024-12-25',
            time: '7:00 PM',
          },
          publicUrl: `/invite/${slug}`,
          isPaid: true,
          createdAt: new Date(),
        };

        const dummyTemplate: TemplateData = {
          _id: '1',
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

        setInvite(dummyInvite);
        setTemplate(dummyTemplate);
      } catch (err) {
        console.error('Error fetching invite:', err);
        setError('Failed to load invite.');
      } finally {
        setLoading(false);
      }
    }
    fetchInviteData();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-10">Loading invite...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!invite || !template) {
    return <div className="text-center py-10">Invite not found.</div>;
  }

  return (
    <AnimationWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Wedding Invitation</h1>
       
      </div>
    </AnimationWrapper>
  );
}
