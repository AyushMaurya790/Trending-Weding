// This page provides an admin dashboard for managing templates.
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AnimationWrapper from '@/components/AnimationWrapper';
import AdminForm from '@/components/AdminForm';
import TemplateCard from '@/components/TemplateCard'; // Reusing TemplateCard for display

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

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !(session.user as any).isAdmin) {
      router.push('/login');
      return;
    }

    async function fetchTemplates() {
      try {
        const res = await fetch('/api/templates');
        const data = await res.json();
        if (res.ok) {
          setTemplates(data);
        } else {
          setError(data.message || 'Failed to fetch templates');
        }
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('An error occurred while fetching templates.');
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, [session, status, router]);

  const handleAddTemplate = async (newTemplateData: Omit<TemplateData, '_id'>) => {
    try {
      const res = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTemplateData),
      });
      const data = await res.json();
      if (res.ok) {
        setTemplates((prev) => [...prev, data]);
        alert('Template added successfully!');
      } else {
        alert(data.message || 'Failed to add template');
      }
    } catch (err) {
      console.error('Error adding template:', err);
      alert('An error occurred while adding the template.');
    }
  };

  // Placeholder for edit/delete functionality
  const handleEditTemplate = (id: string, updatedData: Partial<TemplateData>) => {
    alert(`Edit template ${id} with data: ${JSON.stringify(updatedData)}`);
    // Implement API call to update template
  };

  const handleDeleteTemplate = (id: string) => {
    alert(`Delete template ${id}`);
    // Implement API call to delete template
  };

  if (loading) {
    return <div className="text-center py-10">Loading admin dashboard...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!session || !(session.user as any).isAdmin) {
    return <div className="text-center py-10 text-red-500">Access Denied. You must be an administrator.</div>;
  }

  return (
    <AnimationWrapper>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Add New Template</h2>
          <AdminForm onSubmit={handleAddTemplate} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Existing Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template._id} className="relative">
                <TemplateCard template={template} />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleEditTemplate(template._id, template)}
                    className="bg-yellow-500 text-white p-2 rounded-full text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template._id)}
                    className="bg-red-500 text-white p-2 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AnimationWrapper>
  );
}
