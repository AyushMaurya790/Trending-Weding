'use client';
import TempHero from "@/components/tempHero";
import EventShow from "@/components/EventShow";
import ImageSection from "@/components/ImageSection";
import InviteSection from "@/components/inviteSection";
import SubDetails from "@/components/SubDetails";
import EndDetails from "@/components/EndDetails";

export default function ClassicTemplate() {
  return (
    <div className="min-h-screen bg-[#f2e5d9] overflow-hidden">
      <TempHero />
      <InviteSection />
      <EventShow />
      <ImageSection />
      <SubDetails />
      <EndDetails/>
    </div>
  );
}
