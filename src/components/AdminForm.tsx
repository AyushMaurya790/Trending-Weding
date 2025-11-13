// This component provides a form for admins to add new templates.
'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/cloudinary'; // Assuming you have a cloudinary utility

interface AdminFormProps {
  onSubmit: (newTemplateData: {
    title: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;
    jsonData: {
      fields: Array<{ name: string; label: string; type: string }>;
    };
    animationSettings: object;
  }) => Promise<void>;
}

export default function AdminForm({ onSubmit }: AdminFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [jsonData, setJsonData] = useState('{}'); // JSON string for fields
  const [animationSettings, setAnimationSettings] = useState('{}'); // JSON string for settings
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploading(true);
      try {
        // In a real application, you'd send the file to an API route
        // which then uploads to Cloudinary. For simplicity, we'll simulate.
        // const formData = new FormData();
        // formData.append('file', file);
        // const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
        // const data = await res.json();
        // setImageUrl(data.url); // Assuming API returns the URL
        
        // Placeholder for actual Cloudinary upload
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
          const base64EncodedImage = reader.result as string;
          const result = await uploadImage(base64EncodedImage);
          setImageUrl(result.secure_url);
        };

        alert('Image uploaded successfully (placeholder)!');
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Image upload failed.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTemplateData = {
        title,
        description,
        category,
        price: parseFloat(price),
        imageUrl,
        jsonData: JSON.parse(jsonData),
        animationSettings: JSON.parse(animationSettings),
      };
      await onSubmit(newTemplateData);
      // Clear form
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImageUrl('');
      setJsonData('{}');
      setAnimationSettings('{}');
      setImageFile(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to add template. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow-md bg-white">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Template Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
        {imageUrl && !uploading && (
          <div className="mt-2">
            <p className="text-sm text-green-600">Image uploaded: {imageUrl}</p>
            <img src={imageUrl} alt="Preview" className="mt-2 h-24 w-auto object-cover rounded-md" />
          </div>
        )}
      </div>
      <div>
        <label htmlFor="jsonData" className="block text-sm font-medium text-gray-700">
          JSON Data (for fields)
        </label>
        <textarea
          id="jsonData"
          value={jsonData}
          onChange={(e) => setJsonData(e.target.value)}
          required
          rows={5}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">
          Example: {'{"fields": [{"name": "groomName", "label": "Groom Name", "type": "text"}]}'}
        </p>
      </div>
      <div>
        <label htmlFor="animationSettings" className="block text-sm font-medium text-gray-700">
          Animation Settings (JSON)
        </label>
        <textarea
          id="animationSettings"
          value={animationSettings}
          onChange={(e) => setAnimationSettings(e.target.value)}
          required
          rows={5}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-mono text-sm"
        ></textarea>
        <p className="mt-1 text-xs text-gray-500">Example: {'{"initial": {"opacity": 0}, "animate": {"opacity": 1}}'}</p>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        disabled={uploading}
      >
        Add Template
      </button>
    </form>
  );
}
