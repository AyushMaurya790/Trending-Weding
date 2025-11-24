'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'templates' | 'contacts'>('templates');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingTemplate, setUploadingTemplate] = useState(false);

  const [templateData, setTemplateData] = useState({
    title: '',
    description: '',
    slug: '',
    price: '',
    imageFile: null as File | null,
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login?callbackUrl=/admin');
      return;
    }

    // Check if user is admin (you'll need to add this to session)
    // For now, we'll fetch contacts if logged in
    if (activeTab === 'contacts') {
      fetchContacts();
    }
  }, [session, status, router, activeTab]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/admin/contacts');
      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!templateData.imageFile) {
      toast.error('Please select a template image');
      return;
    }

    setUploadingTemplate(true);

    try {
      // Upload image first
      const formData = new FormData();
      formData.append('file', templateData.imageFile);
      
      const uploadRes = await axios.post('/api/upload', formData);
      const imageUrl = uploadRes.data.url;

      // Create template
      await axios.post('/api/admin/templates', {
        title: templateData.title,
        description: templateData.description,
        slug: templateData.slug,
        price: parseFloat(templateData.price),
        imageUrl,
      });

      toast.success('Template created successfully!');
      setTemplateData({
        title: '',
        description: '',
        slug: '',
        price: '',
        imageFile: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('templateImage') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error: any) {
      console.error('Template creation error:', error);
      toast.error(error.response?.data?.message || 'Failed to create template');
    } finally {
      setUploadingTemplate(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      await axios.patch(`/api/admin/contacts/${contactId}`, { status: newStatus });
      setContacts(contacts.map(c => c._id === contactId ? { ...c, status: newStatus } : c));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome, {session.user?.name}</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('templates')}
              className={`${
                activeTab === 'templates'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upload Templates
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`${
                activeTab === 'contacts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Contact Submissions
              {contacts.filter(c => c.status === 'new').length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {contacts.filter(c => c.status === 'new').length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Templates Upload Section */}
        {activeTab === 'templates' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Upload New Template</h2>
            <form onSubmit={handleTemplateSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Template Title *</label>
                <input
                  type="text"
                  value={templateData.title}
                  onChange={(e) => setTemplateData({ ...templateData, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Royal Gold Wedding"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Slug (URL) *</label>
                <input
                  type="text"
                  value={templateData.slug}
                  onChange={(e) => setTemplateData({ ...templateData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  required
                  pattern="[a-z0-9-]+"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="royal-gold-wedding"
                />
                <p className="text-sm text-gray-500 mt-1">Use lowercase with hyphens (e.g., royal-gold)</p>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Description *</label>
                <textarea
                  value={templateData.description}
                  onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Elegant royal gold themed wedding invitation..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Price (₹) *</label>
                <input
                  type="number"
                  value={templateData.price}
                  onChange={(e) => setTemplateData({ ...templateData, price: e.target.value })}
                  required
                  min="0"
                  step="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="999"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Template Preview Image *</label>
                <input
                  type="file"
                  id="templateImage"
                  accept="image/*"
                  onChange={(e) => setTemplateData({ ...templateData, imageFile: e.target.files?.[0] || null })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-gray-500 mt-1">Recommended: 800x600px or larger</p>
              </div>

              <button
                type="submit"
                disabled={uploadingTemplate}
                className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingTemplate ? 'Uploading...' : 'Upload Template'}
              </button>
            </form>
          </div>
        )}

        {/* Contact Submissions Section */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-gray-600">Loading contacts...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No contact submissions yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contacts.map((contact) => (
                      <tr key={contact._id} className={contact.status === 'new' ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contact.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                            {contact.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contact.phone || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {contact.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <select
                            value={contact.status}
                            onChange={(e) => updateContactStatus(contact._id, e.target.value as any)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              contact.status === 'new'
                                ? 'bg-blue-100 text-blue-800'
                                : contact.status === 'read'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
