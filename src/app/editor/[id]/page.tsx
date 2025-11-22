'use client';
import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TempHero from '@/components/tempHero';
import InviteSection from '@/components/inviteSection';
import EventShow from '@/components/EventShow';
import ImageSection from '@/components/ImageSection';
import SubDetails from '@/components/SubDetails';
import EndDetails from '@/components/EndDetails';

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
  grandparents: string;
  groomParents: string;
  brideParents: string;
  inviteText: string;
  daughterOfText: string;
  coupleName1: string;
  coupleName2: string;
  weddingDate: string;
  weddingVenue: string;
  events: Event[];
  images: string[];
  whatsappLink: string;
  socialLinks: SocialLink[];
  counterDate: string;
  temprature?: string;
  staffDetails?: string;
  parkingDetails?: string;
  locationLink?: string;
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
    grandparents: 'Smt. Lata Devi & Sm. Kamal Kapoor',
    groomParents: 'Mrs. Reena & Mr. Rajiv Kapoor',
    brideParents: 'Mrs. Reena & Mr. Rajiv Kapoor',
    inviteText: 'You to join us in the wedding celebrations of',
    daughterOfText: 'Daughter of',
    coupleName1: 'Abhishek',
    coupleName2: 'Anjali',
    weddingDate: 'Saturday, 21 June 2035',
    weddingVenue: '123 Anywhere St., City, ST 12345',
    events: [],
    images: [],
    whatsappLink: `https://wa.me/`,
    socialLinks: [{ platform: '', url: '' }],
    counterDate: '',
    temprature: '',
    staffDetails: '',
    parkingDetails: '',
    locationLink: '',
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
      const { data } = await axios.get(`/api/invites/${inviteId}`);
      setInviteData({
        heroGroomName: data.heroGroomName || 'Abhishek',
        heroBrideName: data.heroBrideName || 'Kanika',
        heroImage: data.heroImage || '/assets/couple.png',
        grandparents: data.grandparents || 'Smt. Lata Devi & Sm. Kamal Kapoor',
        groomParents: data.groomParents || 'Mrs. Reena & Mr. Rajiv Kapoor',
        brideParents: data.brideParents || 'Mrs. Reena & Mr. Rajiv Kapoor',
        inviteText: data.inviteText || 'You to join us in the wedding celebrations of',
        daughterOfText: data.daughterOfText || 'Daughter of',
        coupleName1: data.coupleName1 || 'Abhishek',
        coupleName2: data.coupleName2 || 'Anjali',
        weddingDate: data.weddingDate || 'Saturday, 21 June 2035',
        weddingVenue: data.weddingVenue || '123 Anywhere St., City, ST 12345',
        events: data.events?.length > 0 ? data.events : [],
        images: data.images || [],
        whatsappLink: data.whatsappLink || '',
        socialLinks: data.socialLinks?.length > 0 ? data.socialLinks : [{ platform: '', url: '' }],
        counterDate: data.counterDate || '',
        temprature: data.temprature || '',
        staffDetails: data.staffDetails || '',
        parkingDetails: data.parkingDetails || '',
        locationLink: data.locationLink || '',
        slug: data.slug || '',
      });
      console.log('Invite data loaded:', data);
    } catch (error) {
      console.error('Error fetching invite:', error);
      toast.error('Failed to load invite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveInvite = useCallback(async () => {
    if (saving || !inviteId) return;
    
    setSaving(true);
    try {
      await axios.put(`/api/invites/${inviteId}`, inviteData);
      setLastSaved(new Date());
      toast.success('Saved successfully');
    } catch (error) {
      console.error('Error saving invite:', error);
      toast.error('Failed to save. Please try again.');
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
    if (field === 'date' && value) {
      const weekDay = dayjs(value).format('dddd');
      newEvents[index].weekDay = weekDay;
    }
    
    setInviteData((prev) => ({ ...prev, events: newEvents }));
  };

  const addEvent = () => {
    if (inviteData.events.length >= 6) {
      toast.error('Maximum 6 events allowed');
      return;
    }
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
    if (inviteData.images.length + files.length > 6) {
      toast.error('Maximum 6 images allowed for carousel');
      return;
    }

    setUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];
      
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.post('/api/upload', formData);
        uploadedUrls.push(data.url);
      }

      setInviteData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please check your connection.');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = inviteData.images.filter((_, i) => i !== index);
    setInviteData((prev) => ({ ...prev, images: newImages }));
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post('/api/upload', formData);
      setInviteData((prev) => ({ ...prev, heroImage: data.url }));
      toast.success('Hero image uploaded successfully');
    } catch (error) {
      console.error('Error uploading hero image:', error);
      toast.error('Failed to upload image. Please check your connection.');
    } finally {
      setUploadingImage(false);
    }
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/invite/${inviteData.slug}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Share link copied to clipboard!');
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
        <div className="grid grid-cols-1 lg:grid-cols-[20%_80%] gap-8">
          <div className="space-y-6 ">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Hero Image (Couple Photo)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleHeroImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={uploadingImage}
                  />
                  {inviteData.heroImage && (
                    <div className="mt-2 relative inline-block">
                      <img src={inviteData.heroImage} alt="Hero" className="w-32 h-32 object-cover rounded-lg" />
                    </div>
                  )}
                  {uploadingImage && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                </div>

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
                  <label className="block text-gray-700 mb-2 font-medium">Grandparents</label>
                  <input
                    type="text"
                    value={inviteData.grandparents}
                    onChange={(e) => handleInputChange('grandparents', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Smt. Lata Devi & Sm. Kamal Kapoor"
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
                <h2 className="text-xl font-bold text-primary">Events (Max 6)</h2>
                <button
                  onClick={addEvent}
                  disabled={inviteData.events.length >= 6}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add Event
                </button>
              </div>
              <div className="space-y-4">
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
              <h2 className="text-xl font-bold mb-4 text-primary">Carousel Images (Max 6)</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={uploadingImage || inviteData.images.length >= 6}
                  />
                  {uploadingImage && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                  <p className="text-sm text-gray-500 mt-1">{inviteData.images.length}/6 images uploaded</p>
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

            {/* Additional Details */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-primary">Additional Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Temperature/Weather Info</label>
                  <input
                    type="text"
                    value={inviteData.temprature || ''}
                    onChange={(e) => handleInputChange('temprature', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., It will be mostly sunny with temperature reaching up to 28 degrees."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Staff Accommodation Details</label>
                  <textarea
                    value={inviteData.staffDetails || ''}
                    onChange={(e) => handleInputChange('staffDetails', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., We recommend the nearby hotel called Bhola Bhawan near the venue for the staff members"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Parking Details</label>
                  <textarea
                    value={inviteData.parkingDetails || ''}
                    onChange={(e) => handleInputChange('parkingDetails', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Valet parking for all our guests will be available at the venue"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Venue Location Link (Google Maps)</label>
                  <input
                    type="url"
                    value={inviteData.locationLink || ''}
                    onChange={(e) => handleInputChange('locationLink', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            </div>
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
              </div>
            </div>
          </div>
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-4 text-center">Live Preview</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                <div >
                  <TempHero 
                    groomName={inviteData.heroGroomName}
                    brideName={inviteData.heroBrideName}
                    heroImage={inviteData.heroImage}
                  />
                  <InviteSection 
                    grandparents={inviteData.grandparents}
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
                  />
                  <ImageSection 
                    whatsappLink={inviteData.socialLinks}
                    images={inviteData.images}
                  />
                  <SubDetails 
                   socialLinks={inviteData.socialLinks}
                   temprature={inviteData.temprature}
                   staffDetails={inviteData.staffDetails}
                   parkingDetails={inviteData.parkingDetails}
                  />
                  <EndDetails 
                    counterDate={inviteData.counterDate}
                    locationLink={inviteData.locationLink}
                    socialLinks={inviteData.socialLinks}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Changes auto-save every 5 seconds. Click &quot;Save Now&quot; to save immediately
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
