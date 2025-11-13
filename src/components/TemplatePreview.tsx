// This component displays a read-only preview of a wedding template with custom fields.
interface TemplatePreviewProps {
  template?: {
    title: string;
    imageUrl: string;
    jsonData: {
      fields: Array<{ name: string; label: string; type: string }>;
    };
  };
  formData?: Record<string, string>;
}

export default function TemplatePreview({ template, formData }: TemplatePreviewProps) {
  if (!template) {
    return <div className="text-center py-4">Select a template to preview.</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">{template.title} - Preview</h2>
      <div className="relative w-full h-64 mb-4">
        {/* In a real app, this would render the actual animated template */}
        <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover rounded-md" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <p className="text-3xl font-serif">{formData?.brideName || 'Bride Name'}</p>
          <p className="text-3xl font-serif">& {formData?.groomName || 'Groom Name'}</p>
          <p className="text-lg mt-2">{formData?.date || 'Wedding Date'}</p>
          <p className="text-md">{formData?.time || 'Wedding Time'}</p>
          <p className="text-md">{formData?.venue || 'Wedding Venue'}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Custom Fields:</h3>
        {template.jsonData.fields.map((field) => (
          <p key={field.name} className="text-gray-700">
            <strong>{field.label}:</strong> {formData?.[field.name] || `[${field.label}]`}
          </p>
        ))}
      </div>
    </div>
  );
}
