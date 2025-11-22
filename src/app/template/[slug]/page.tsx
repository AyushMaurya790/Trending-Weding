"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export default function TemplateDetail({ params }: TemplatePageProps) {
  const [slug, setSlug] = useState<string>("");
  const [TemplateComponent, setTemplateComponent] =useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    params.then(async (p) => {
      setSlug(p.slug);
      try {
        const DynamicTemplate = dynamic(() =>
          import(`../templates/${p.slug}/index`).catch(() => {
            setError(true);
            return { default: () => null };
          })
        );
        setTemplateComponent(() => DynamicTemplate);
        setLoading(false);
      } catch (err) {
        console.error("Template load error:", err);
        setError(true);
        setLoading(false);
      }
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  if (error || !TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
          <p className="text-gray-600 mb-6">
            The template &quot;{slug}&quot; does not exist or has been removed.
          </p>
          <a
            href="/template"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Browse Templates
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <TemplateComponent />
    </div>
  );
}
