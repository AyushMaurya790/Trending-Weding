'use client';
import TempHero from "@/components/tempHero";
import EventShow from "@/components/EventShow";
import ImageSection from "@/components/ImageSection";
import InviteSection from "@/components/inviteSection";
import SubDetails from "@/components/SubDetails";
import EndDetails from "@/components/EndDetails";

export default function ModernTemplate() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <TempHero />
      <InviteSection />
      <EventShow />
      <ImageSection />
      <SubDetails />
      <EndDetails />
    </div>
  );
}
