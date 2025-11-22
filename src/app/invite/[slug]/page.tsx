'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import TempHero from '@/components/tempHero';
import InviteSection from '@/components/inviteSection';
import EventShow from '@/components/EventShow';
import ImageSection from '@/components/ImageSection';
import SubDetails from '@/components/SubDetails';
import EndDetails from '@/components/EndDetails';

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
  eventsSectionTitle: string;
  mapSectionText: string;
  mapClickText: string;
  images: string[];
  socialLinks: SocialLink[];
  counterDate: string;
  locationLink?: string;
  temprature?: string;
  staffDetails?: string;
  parkingDetails?: string;
}

export default function PublicInvite({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchInvite();
    }
  }, [slug]);

  const fetchInvite = async () => {
    try {
      const { data } = await axios.get(`/api/invites/slug/${slug}`);
      setInviteData(data);
    } catch (error) {
      console.error('Error fetching invite:', error);
      toast.error('Failed to load invitation');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (!inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Invitation Not Found</h1>
          <p className="text-gray-600">This invitation may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <TempHero 
        groomName={inviteData.heroGroomName || 'Abhishek'}
        brideName={inviteData.heroBrideName || 'Kanika'}
        heroImage={inviteData.heroImage || '/assets/couple.png'}
      />
      <InviteSection 
        shlok={inviteData.shlok || 'ॐ श्री गणेशाय नम'}
        blessingsText={inviteData.blessingsText || 'With the heavenly blessings of'}
        grandparents={inviteData.grandparents || 'Smt. Lata Devi & Sm. Kamal Kapoor'}
        groomParents={inviteData.groomParents || 'Mrs. Reena & Mr. Rajiv Kapoor'}
        brideParents={inviteData.brideParents || 'Mrs. Reena & Mr. Rajiv Kapoor'}
        inviteText={inviteData.inviteText || 'You to join us in the wedding celebrations of'}
        daughterOfText={inviteData.daughterOfText || 'Daughter of'}
        coupleName1={inviteData.coupleName1 || 'Abhishek'}
        coupleName2={inviteData.coupleName2 || 'Anjali'}
        weddingDate={inviteData.weddingDate || 'Saturday, 21 June 2035'}
        weddingVenue={inviteData.weddingVenue || '123 Anywhere St., City, ST 12345'}
      />
      <EventShow 
        events={inviteData.events || []}
        eventsSectionTitle={inviteData.eventsSectionTitle || 'On the following events'}
        mapSectionText={inviteData.mapSectionText || 'See the route'}
        mapClickText={inviteData.mapClickText || 'Click to open the map'}
      />
      <ImageSection 
        whatsappLink={inviteData.socialLinks || []}
        images={inviteData.images || []}
      />
      <SubDetails 
        socialLinks={inviteData.socialLinks || []}
        temprature={inviteData.temprature}
        staffDetails={inviteData.staffDetails}
        parkingDetails={inviteData.parkingDetails}
      />
      <EndDetails 
        counterDate={inviteData.counterDate || ''}
        locationLink={inviteData.locationLink}
        socialLinks={inviteData.socialLinks || []}
      />
    </div>
  );
}
