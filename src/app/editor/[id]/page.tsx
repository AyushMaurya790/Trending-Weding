'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TempHero from '@/components/tempHero';
import InviteSection from '@/components/inviteSection';
import EventShow from '@/components/EventShow';

dayjs.extend(relativeTime);

interface Event {
  eventName: string;
  weekDay: string;
  date: string;
  location: string;
  locationLink: string;
  venue?: string;
  time?: string;
  img?: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface InviteData {
  heroGroomName: string;
  heroBrideName: string;
  heroImage: string;
  shlok: string;
  blessingsText: string;
  groomGrandparents: string;
  brideGrandparents: string;
  groomParents: string;
  brideParents: string;
  inviteText: string;
  daughterOfText: string;
  coupleName1: string;
  coupleName2: string;
  weddingDate: string;
  weddingVenue: string;
  events: Event[];
  eventsSectionTitle: string;
  mapSectionText: string;
  mapClickText: string;
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

export default function Editor({ params }: { params: Promise<{ id: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [inviteData, setInviteData] = useState<InviteData>({
    heroGroomName: 'Abhishek',
    heroBrideName: 'Kanika',
    heroImage: '/assets/couple.png',
    shlok: 'ॐ श्री गणेशाय नम',
    blessingsText: 'With the heavenly blessings of',
    groomGrandparents: 'Smt. Lata Devi & Sm. Kamal Kapoor',
    brideGrandparents: '',
    groomParents: 'Mrs. Reena & Mr. Rajiv Kapoor',
    brideParents: 'Mrs. Reena & Mr. Rajiv Kapoor',
    inviteText: 'You to join us in the wedding celebrations of',
    daughterOfText: 'Daughter of',
    coupleName1: 'Abhishek',
    coupleName2: 'Anjali',
    weddingDate: 'Saturday, 21 June 2035',
    weddingVenue: '123 Anywhere St., City, ST 12345',
    events: [],
    eventsSectionTitle: 'On the following events',
    mapSectionText: 'See the route',
    mapClickText: 'Click to open the map',
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
  useEffect(() => {
    params.then((p) => setInviteId(p.id));
  }, [params]);
  useEffect(() => {
    if (!loading && inviteId) {
      const timer = setTimeout(() => {
        saveInvite();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [inviteData, loading, inviteId]);
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated' && inviteId) {
      fetchInvite();
    }
  }, [status, inviteId]);

  const fetchInvite = async () => {
    if (!inviteId) return;
    
    try {
      const response = await fetch(`/api/invites/${inviteId}`);
      if (response.ok) {
        const data = await response.json();
        setInviteData({
          heroGroomName: data.heroGroomName || 'Abhishek',
          heroBrideName: data.heroBrideName || 'Kanika',
          heroImage: data.heroImage || '/assets/couple.png',
          shlok: data.shlok || 'ॐ श्री गणेशाय नम',
          blessingsText: data.blessingsText || 'With the heavenly blessings of',
          groomGrandparents: data.groomGrandparents || 'Smt. Lata Devi & Sm. Kamal Kapoor',
          brideGrandparents: data.brideGrandparents || '',
          groomParents: data.groomParents || 'Mrs. Reena & Mr. Rajiv Kapoor',
          brideParents: data.brideParents || 'Mrs. Reena & Mr. Rajiv Kapoor',
          inviteText: data.inviteText || 'You to join us in the wedding celebrations of',
          daughterOfText: data.daughterOfText || 'Daughter of',
          coupleName1: data.coupleName1 || 'Abhishek',
          coupleName2: data.coupleName2 || 'Anjali',
          weddingDate: data.weddingDate || 'Saturday, 21 June 2035',
          weddingVenue: data.weddingVenue || '123 Anywhere St., City, ST 12345',
          events: data.events?.length > 0 ? data.events : [],
          eventsSectionTitle: data.eventsSectionTitle || 'On the following events',
          mapSectionText: data.mapSectionText || 'See the route',
          mapClickText: data.mapClickText || 'Click to open the map',
          images: data.images || [],
          whatsappLink: data.whatsappLink || '',
          socialLinks: data.socialLinks?.length > 0 ? data.socialLinks : [{ platform: '', url: '' }],
          counterDate: data.counterDate || '',
          extraField1: data.extraField1 || '',
          extraField2: data.extraField2 || '',
          extraField3: data.extraField3 || '',
          extraField4: data.extraField4 || '',
          slug: data.slug || '',
        });
      } else {
        const errorData = await response.json();
        console.error('Fetch failed with status:', response.status, errorData);
        alert(`Failed to load invite: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching invite:', error);
      alert('Network error while fetching invite. Check console.');
    } finally {
      setLoading(false);
    }
  };

  const saveInvite = useCallback(async () => {
    if (saving || !inviteId) return;
    
    setSaving(true);
    try {
      await fetch(`/api/invites/${inviteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inviteData),
      });
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving invite:', error);
    } finally {
      setSaving(false);
    }
  }, [inviteData, inviteId, saving]);

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
      events: [...prev.events, { 
        eventName: '', 
        weekDay: '', 
        date: '', 
        location: '', 
        locationLink: '',
        venue: '',
        time: '',
        img: '/assets/img/event/mehandi.png'
      }],
    }));
  };

  const removeEvent = (index: number) => {
    if (inviteData.events.length > 0) {
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
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className=" mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Your Invitation</h1>
          <div className="flex items-center gap-4">
            {saving && <span className="text-sm text-gray-500">Saving...</span>}
            {!saving && lastSaved && (
              <span className="text-sm text-gray-500">
                Saved {dayjs(lastSaved).fromNow()}
              </span>
            )}
            <button
              onClick={saveInvite}
              disabled={saving}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              Save Now
            </button>
            <button
              onClick={copyShareLink}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
               Copy Share Link
            </button>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Groom Name (Hero) *</label>
                  <input
                    type="text"
                    value={inviteData.heroGroomName}
                    onChange={(e) => handleInputChange('heroGroomName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Abhishek"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Bride Name (Hero) *</label>
                  <input
                    type="text"
                    value={inviteData.heroBrideName}
                    onChange={(e) => handleInputChange('heroBrideName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Kanika"
                  />
                </div>
              </div>
            </div>

            {/* Invite Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Invitation Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Shlok / Sacred Text</label>
                  <input
                    type="text"
                    value={inviteData.shlok}
                    onChange={(e) => handleInputChange('shlok', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., ॐ श्री गणेशाय नम"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Blessings Text</label>
                  <input
                    type="text"
                    value={inviteData.blessingsText}
                    onChange={(e) => handleInputChange('blessingsText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., With the heavenly blessings of"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Groom Grandparents</label>
                  <input
                    type="text"
                    value={inviteData.groomGrandparents}
                    onChange={(e) => handleInputChange('groomGrandparents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Smt. Lata Devi & Sm. Kamal Kapoor"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Bride Grandparents</label>
                  <input
                    type="text"
                    value={inviteData.brideGrandparents}
                    onChange={(e) => handleInputChange('brideGrandparents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Groom Parents</label>
                  <input
                    type="text"
                    value={inviteData.groomParents}
                    onChange={(e) => handleInputChange('groomParents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Mrs. Reena & Mr. Rajiv Kapoor"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Bride Parents</label>
                  <input
                    type="text"
                    value={inviteData.brideParents}
                    onChange={(e) => handleInputChange('brideParents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Mrs. Reena & Mr. Rajiv Kapoor"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Invitation Text</label>
                  <input
                    type="text"
                    value={inviteData.inviteText}
                    onChange={(e) => handleInputChange('inviteText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., You to join us in the wedding celebrations of"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Daughter Of Text</label>
                  <input
                    type="text"
                    value={inviteData.daughterOfText}
                    onChange={(e) => handleInputChange('daughterOfText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Daughter of"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Couple Name 1</label>
                  <input
                    type="text"
                    value={inviteData.coupleName1}
                    onChange={(e) => handleInputChange('coupleName1', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Abhishek"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Couple Name 2</label>
                  <input
                    type="text"
                    value={inviteData.coupleName2}
                    onChange={(e) => handleInputChange('coupleName2', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Anjali"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Wedding Date & Time</label>
                  <input
                    type="text"
                    value={inviteData.weddingDate}
                    onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Saturday, 21 June 2035"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Wedding Venue</label>
                  <textarea
                    value={inviteData.weddingVenue}
                    onChange={(e) => handleInputChange('weddingVenue', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 123 Anywhere St., City, ST 12345"
                  />
                </div>
              </div>
            </div>

            {/* Events Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Events</h2>
                <button
                  onClick={addEvent}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm"
                >
                  + Add Event
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Events Section Title</label>
                  <input
                    type="text"
                    value={inviteData.eventsSectionTitle}
                    onChange={(e) => handleInputChange('eventsSectionTitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., On the following events"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Map Section Text</label>
                  <input
                    type="text"
                    value={inviteData.mapSectionText}
                    onChange={(e) => handleInputChange('mapSectionText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., See the route"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Map Click Text</label>
                  <input
                    type="text"
                    value={inviteData.mapClickText}
                    onChange={(e) => handleInputChange('mapClickText', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Click to open the map"
                  />
                </div>
              </div>

              <div className="space-y-6 mt-6">
                {inviteData.events.map((event, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Event {index + 1}</h3>
                      <button
                        onClick={() => removeEvent(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        placeholder="Week day (auto-filled)"
                      />
                      <input
                        type="text"
                        value={event.venue || ''}
                        onChange={(e) => handleEventChange(index, 'venue', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Venue"
                      />
                      <input
                        type="text"
                        value={event.time || ''}
                        onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Time (e.g., 6pm Onwards)"
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
                {inviteData.events.length === 0 && (
                  <p className="text-gray-500 text-sm text-center py-4">No events added yet. Click "Add Event" to start.</p>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Images (Max 10)</h2>
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

            {/* Contact & Social */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Contact & Social</h2>
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

            {/* Extra Fields */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Extra Fields</h2>
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
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-4 text-center">Live Preview</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <div className="scale-50 origin-top-left" style={{ width: '200%', height: 'auto' }}>
                  <TempHero 
                    groomName={inviteData.heroGroomName}
                    brideName={inviteData.heroBrideName}
                    heroImage={inviteData.heroImage}
                  />
                  <InviteSection 
                    shlok={inviteData.shlok}
                    blessingsText={inviteData.blessingsText}
                    groomGrandparents={inviteData.groomGrandparents}
                    brideGrandparents={inviteData.brideGrandparents}
                    groomParents={inviteData.groomParents}
                    brideParents={inviteData.brideParents}
                    inviteText={inviteData.inviteText}
                    daughterOfText={inviteData.daughterOfText}
                    coupleName1={inviteData.coupleName1}
                    coupleName2={inviteData.coupleName2}
                    weddingDate={inviteData.weddingDate}
                    weddingVenue={inviteData.weddingVenue}
                  />
                  <EventShow 
                    events={inviteData.events}
                    eventsSectionTitle={inviteData.eventsSectionTitle}
                    mapSectionText={inviteData.mapSectionText}
                    mapClickText={inviteData.mapClickText}
                  />
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
