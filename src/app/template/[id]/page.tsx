import TempHero from "@/components/tempHero";
import EventShow from "@/components/EventShow";
import ImageSection from "@/components/ImageSection";
import InviteSection from "@/components/inviteSection";
import SubDetails from "@/components/SubDetails";

export default function TemplateDetail() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <TempHero />
      <InviteSection />
      <EventShow />
      <ImageSection />
      <SubDetails />
    </div>
  );
}
