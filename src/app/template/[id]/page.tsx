import Image from 'next/image';
import Link from 'next/link';
import AnimationWrapper from '@/components/AnimationWrapper';
import TempHero from '@/components/tempHero';
import InviteSection from '@/components/inviteSection';
import EventShow from '@/components/EventShow';

export default function TemplateDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <TempHero />
      <InviteSection />
      <EventShow />
 
    </div>
  );
}
