// This component provides input fields for users to customize their wedding invite.
interface EditorFormProps {
  template: {
    jsonData: {
      fields: Array<{ name: string; label: string; type: string }>;
    };
  };
  customFields: Record<string, string>;
  onFieldChange: (fieldName: string, value: string) => void;
}

export default function EditorForm({ template, customFields, onFieldChange }: EditorFormProps) {
  return (
    <div className="space-y-4">
      {template.jsonData.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'text' && (
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={customFields[field.name] || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          )}
          {field.type === 'date' && (
            <input
              type="date"
              id={field.name}
              name={field.name}
              value={customFields[field.name] || ''}
              onChange={(e) => onFieldChange(field.name, e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          )}
          {/* Add more input types as needed */}
        </div>
      ))}
    </div>
  );
}
