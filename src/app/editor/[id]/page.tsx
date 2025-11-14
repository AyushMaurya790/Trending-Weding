
'use client';

import { useState, useEffect, useRef, useCallback } from 'react'; 
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AnimationWrapper from '@/components/AnimationWrapper';
import TemplatePreview from '@/components/TemplatePreview';
import EditorForm from '@/components/EditorForm';

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

export default function EditorPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { data: session, status } = useSession();
  const [template, setTemplate] = useState<TemplateData | null>(null);
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);

  const localStorageKey = `templateEditor_${id}`;

  // Effect to load saved data from localStorage on mount
  useEffect(() => {
    isMounted.current = true; // Set mounted ref to true

    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    // Load saved data from localStorage
    if (isMounted.current && session) {
      const savedFields = localStorage.getItem(localStorageKey);
      if (savedFields) {
        try {
          const parsedFields = JSON.parse(savedFields);
          setCustomFields(parsedFields);
          console.log('Loaded from localStorage:', parsedFields);
        } catch (e) {
          console.error("Failed to parse saved fields from localStorage:", e);
          localStorage.removeItem(localStorageKey);
        }
      }
    }

    // Dummy template data (replace with actual API fetch in a real app)
    const dummyTemplate: TemplateData = {
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
    setTemplate(dummyTemplate);
    setLoading(false);

    // Cleanup function to set isMounted to false
    return () => {
      isMounted.current = false;
    };
  }, [id, session, status, router, localStorageKey]); // Removed customFields and template from dependencies

  // Effect to save customFields to localStorage whenever they change
  useEffect(() => {
    if (isMounted.current && session && template) { // Ensure session and template are available
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(customFields));
        console.log('Saved to localStorage:', customFields);
      } catch (e) {
        console.error("Failed to save fields to localStorage:", e);
      }
    }
  }, [customFields, session, template, localStorageKey, isMounted]); // Dependencies for saving

  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setCustomFields((prev) => {
      const newFields = { ...prev, [fieldName]: value };
      // The saving logic is now handled by the dedicated useEffect above.
      // We just need to update the state here.
      return newFields;
    });
  }, []); // Empty dependency array as it doesn't depend on external state that changes

  const handleSaveInvite = async () => {
    if (!session || !template) return;

    try {
      const res = await fetch('/api/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          templateId: template._id,
          customFields,
          publicUrl: `/invite/${template._id}-${Date.now()}`,
          isPaid: true,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Invite saved successfully! Shareable link: ' + data.publicUrl);
        // Clear localStorage after successful save to backend
        if (isMounted.current) {
          localStorage.removeItem(localStorageKey);
          console.log('Cleared localStorage after successful save.');
        }
        router.push(data.publicUrl);
      } else {
        alert(data.message || 'Failed to save invite');
      }
    } catch (err) {
      console.error('Error saving invite:', err);
      alert('An error occurred while saving the invite.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading editor...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!template) {
    return <div className="text-center py-10">Template not found or unauthorized access.</div>;
  }

  return (
    <AnimationWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Customize Your {template.title} Invitation</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Edit Details</h2>
            <EditorForm template={template} customFields={customFields} onFieldChange={handleFieldChange} />
            <button
              onClick={handleSaveInvite}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors text-lg"
            >
              Save & Get Shareable Link
            </button>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
            <TemplatePreview template={template} formData={customFields} />
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
}
