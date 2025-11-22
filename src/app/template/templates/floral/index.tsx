'use client';
import TempHero from "@/components/tempHero";
import EventShow from "@/components/EventShow";
import InviteSection from "@/components/inviteSection";

export default function FloralTemplate() {
  return (
    <div className="min-h-screen bg-[#f2e5d9] overflow-hidden">
      <TempHero />
      <InviteSection />
      <EventShow />
    </div>
  );
}
