'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface Event {
  eventName: string;
  weekDay: string;
  date: string;
  location: string;
  locationLink: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface InviteData {
  groomName: string;
  bridalName: string;
  shlok: string;
  groomFamilyName: string;
  bridalFamilyName: string;
  familyDetails: string;
  events: Event[];
  images: string[];
  whatsappLink: string;
  socialLinks: SocialLink[];
  counterDate: string;
  extraField1: string;
  extraField2: string;
  extraField3: string;
  extraField4: string;
  slug: string;
}

export default function Editor({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [inviteData, setInviteData] = useState<InviteData>({
    groomName: '',
    bridalName: '',
    shlok: '',
    groomFamilyName: '',
    bridalFamilyName: '',
    familyDetails: '',
    events: [{ eventName: '', weekDay: '', date: '', location: '', locationLink: '' }],
    images: [],
    whatsappLink: '',
    socialLinks: [{ platform: '', url: '' }],
    counterDate: '',
    extraField1: '',
    extraField2: '',
    extraField3: '',
    extraField4: '',
    slug: '',
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Auto-save effect (5 seconds after last change)
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        saveInvite();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [inviteData, loading]);

  // Fetch invite data
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchInvite();
    }
  }, [status]);

  const fetchInvite = async () => {
    try {
      const response = await fetch(`/api/invites/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setInviteData({
          groomName: data.groomName || '',
          bridalName: data.bridalName || '',
          shlok: data.shlok || '',
          groomFamilyName: data.groomFamilyName || '',
          bridalFamilyName: data.bridalFamilyName || '',
          familyDetails: data.familyDetails || '',
          events: data.events.length > 0 ? data.events : [{ eventName: '', weekDay: '', date: '', location: '', locationLink: '' }],
          images: data.images || [],
          whatsappLink: data.whatsappLink || '',
          socialLinks: data.socialLinks.length > 0 ? data.socialLinks : [{ platform: '', url: '' }],
          counterDate: data.counterDate || '',
          extraField1: data.extraField1 || '',
          extraField2: data.extraField2 || '',
          extraField3: data.extraField3 || '',
          extraField4: data.extraField4 || '',
          slug: data.slug || '',
        });
      } else {
        router.push('/template');
      }
    } catch (error) {
      console.error('Error fetching invite:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveInvite = useCallback(async () => {
    if (saving) return;
    
    setSaving(true);
    try {
      await fetch(`/api/invites/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inviteData),
      });
    } catch (error) {
      console.error('Error saving invite:', error);
    } finally {
      setSaving(false);
    }
  }, [inviteData, params.id, saving]);

  const handleInputChange = (field: keyof InviteData, value: string) => {
    setInviteData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEventChange = (index: number, field: keyof Event, value: string) => {
    const newEvents = [...inviteData.events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    
    // Auto-populate weekday when date changes
    if (field === 'date' && value) {
      const weekDay = dayjs(value).format('dddd');
      newEvents[index].weekDay = weekDay;
    }
    
    setInviteData((prev) => ({ ...prev, events: newEvents }));
  };

  const addEvent = () => {
    setInviteData((prev) => ({
      ...prev,
      events: [...prev.events, { eventName: '', weekDay: '', date: '', location: '', locationLink: '' }],
    }));
  };

  const removeEvent = (index: number) => {
    if (inviteData.events.length > 1) {
      const newEvents = inviteData.events.filter((_, i) => i !== index);
      setInviteData((prev) => ({ ...prev, events: newEvents }));
    }
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...inviteData.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setInviteData((prev) => ({ ...prev, socialLinks: newLinks }));
  };

  const addSocialLink = () => {
    setInviteData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }],
    }));
  };

  const removeSocialLink = (index: number) => {
    if (inviteData.socialLinks.length > 1) {
      const newLinks = inviteData.socialLinks.filter((_, i) => i !== index);
      setInviteData((prev) => ({ ...prev, socialLinks: newLinks }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Limit to 10 images
    if (inviteData.images.length + files.length > 10) {
      alert('Maximum 10 images allowed');
      return;
    }

    setUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];
      
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          uploadedUrls.push(data.secure_url);
        }
      }

      setInviteData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = inviteData.images.filter((_, i) => i !== index);
    setInviteData((prev) => ({ ...prev, images: newImages }));
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/invite/${inviteData.slug}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Your Invitation</h1>
          <div className="flex items-center gap-4">
            {saving && <span className="text-sm text-gray-500">Saving...</span>}
            <button
              onClick={copyShareLink}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Copy Share Link
            </button>
            <button
              onClick={saveInvite}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
            >
              Save Now
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Couple Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Groom Name *</label>
                  <input
                    type="text"
                    value={inviteData.groomName}
                    onChange={(e) => handleInputChange('groomName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter groom's name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Bride Name *</label>
                  <input
                    type="text"
                    value={inviteData.bridalName}
                    onChange={(e) => handleInputChange('bridalName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter bride's name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Shlok / Quote</label>
                  <textarea
                    value={inviteData.shlok}
                    onChange={(e) => handleInputChange('shlok', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter shlok or quote"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Family Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Groom Family Name</label>
                  <input
                    type="text"
                    value={inviteData.groomFamilyName}
                    onChange={(e) => handleInputChange('groomFamilyName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter groom's family name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Bride Family Name</label>
                  <input
                    type="text"
                    value={inviteData.bridalFamilyName}
                    onChange={(e) => handleInputChange('bridalFamilyName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter bride's family name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Family Details</label>
                  <textarea
                    value={inviteData.familyDetails}
                    onChange={(e) => handleInputChange('familyDetails', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter family details"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Events</h2>
                <button
                  onClick={addEvent}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm"
                >
                  + Add Event
                </button>
              </div>
              <div className="space-y-6">
                {inviteData.events.map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Event {index + 1}</h3>
                      {inviteData.events.length > 1 && (
                        <button
                          onClick={() => removeEvent(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={event.eventName}
                        onChange={(e) => handleEventChange(index, 'eventName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Event name (e.g., Mehendi, Sangeet)"
                      />
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        value={event.weekDay}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="Week day (auto-filled)"
                      />
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Location"
                      />
                      <input
                        type="url"
                        value={event.locationLink}
                        onChange={(e) => handleEventChange(index, 'locationLink', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Location link (Google Maps)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Images (Max 10)</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={uploadingImage || inviteData.images.length >= 10}
                  />
                  {uploadingImage && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {inviteData.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Contact & Social</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">WhatsApp Link</label>
                  <input
                    type="url"
                    value={inviteData.whatsappLink}
                    onChange={(e) => handleInputChange('whatsappLink', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://wa.me/..."
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-gray-700 font-medium">Social Media Links</label>
                    <button
                      onClick={addSocialLink}
                      className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-opacity-90 transition text-sm"
                    >
                      + Add Link
                    </button>
                  </div>
                  {inviteData.socialLinks.map((link, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={link.platform}
                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Platform (e.g., Instagram)"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                        className="grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="URL"
                      />
                      {inviteData.socialLinks.length > 1 && (
                        <button
                          onClick={() => removeSocialLink(index)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Counter & Extras</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Counter Date</label>
                  <input
                    type="date"
                    value={inviteData.counterDate}
                    onChange={(e) => handleInputChange('counterDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Extra Field 1</label>
                  <input
                    type="text"
                    value={inviteData.extraField1}
                    onChange={(e) => handleInputChange('extraField1', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Custom field 1"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Extra Field 2</label>
                  <input
                    type="text"
                    value={inviteData.extraField2}
                    onChange={(e) => handleInputChange('extraField2', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Custom field 2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Extra Field 3</label>
                  <input
                    type="text"
                    value={inviteData.extraField3}
                    onChange={(e) => handleInputChange('extraField3', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Custom field 3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Extra Field 4</label>
                  <input
                    type="text"
                    value={inviteData.extraField4}
                    onChange={(e) => handleInputChange('extraField4', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Custom field 4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-20 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Live Preview</h2>
              <div className="border border-gray-300 rounded-lg p-6 bg-linear-to-br from-pink-50 to-purple-50 min-h-[600px]">
                <div className="text-center space-y-6">
                  {inviteData.shlok && (
                    <div className="italic text-gray-700 text-sm">&quot;{inviteData.shlok}&quot;</div>
                  )}
                  
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-2">
                      {inviteData.groomName || 'Groom Name'} & {inviteData.bridalName || 'Bride Name'}
                    </h3>
                    {(inviteData.groomFamilyName || inviteData.bridalFamilyName) && (
                      <p className="text-gray-600">
                        {inviteData.groomFamilyName && `S/O ${inviteData.groomFamilyName}`}
                        {inviteData.groomFamilyName && inviteData.bridalFamilyName && ' & '}
                        {inviteData.bridalFamilyName && `D/O ${inviteData.bridalFamilyName}`}
                      </p>
                    )}
                  </div>

                  {inviteData.familyDetails && (
                    <p className="text-gray-700 text-sm">{inviteData.familyDetails}</p>
                  )}

                  {inviteData.events.length > 0 && inviteData.events[0].eventName && (
                    <div className="space-y-4 mt-6">
                      <h4 className="font-semibold text-lg">Events</h4>
                      {inviteData.events.map((event, index) => (
                        event.eventName && (
                          <div key={index} className="bg-white rounded-lg p-4 text-left">
                            <h5 className="font-semibold text-primary">{event.eventName}</h5>
                            {event.date && (
                              <p className="text-sm text-gray-600">
                                {dayjs(event.date).format('MMMM DD, YYYY')} ({event.weekDay})
                              </p>
                            )}
                            {event.location && <p className="text-sm text-gray-600">{event.location}</p>}
                            {event.locationLink && (
                              <a
                                href={event.locationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                View Location →
                              </a>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {inviteData.counterDate && (
                    <div className="bg-white rounded-lg p-4 mt-6">
                      <p className="text-sm text-gray-600 mb-2">Days Until Wedding</p>
                      <p className="text-3xl font-bold text-primary">
                        {dayjs(inviteData.counterDate).diff(dayjs(), 'day')} Days
                      </p>
                    </div>
                  )}

                  {inviteData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-6">
                      {inviteData.images.slice(0, 4).map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {(inviteData.whatsappLink || inviteData.socialLinks.some(l => l.url)) && (
                    <div className="flex justify-center gap-4 mt-6">
                      {inviteData.whatsappLink && (
                        <a
                          href={inviteData.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
                        >
                          WhatsApp
                        </a>
                      )}
                      {inviteData.socialLinks.map((link, index) => (
                        link.url && (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90"
                          >
                            {link.platform || 'Link'}
                          </a>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Changes auto-save every 5 seconds. Click &quot;Save Now&quot; to save immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
