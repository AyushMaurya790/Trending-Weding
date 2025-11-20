import TempHero from "@/components/tempHero";
import InviteSection from "@/components/inviteSection";
import EventShow from "@/components/EventShow";
import ImageSection from "@/components/ImageSection";

export default function TemplateDetail() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <TempHero />
      <InviteSection />
      <EventShow />
      <ImageSection />
    </div>
  );
}
