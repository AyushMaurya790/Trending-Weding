import Image from "next/image";
import SvgIcon from "./SvgIcon";

interface SubDetailsProps {
  socialLinks?: { platform: string; url: string }[];
  temprature?: string;
  staffDetails?: string;
  parkingDetails?: string;
}

const SubDetails = ({ socialLinks, temprature, staffDetails, parkingDetails }: SubDetailsProps) => {
  const instagramLink = socialLinks?.find(link => link.platform.toLowerCase() === 'instagram');
  const instagramHashtag = instagramLink?.url ? `Please use ${instagramLink.url}` : "#abkan";

  const items = [
    {
      icon: "Instagram",
      title: "Instagram",
      className: "md:w-20 md:h-20 w-10 h-10",
      desc: `While posting photos on social media please use the hashtag - ${instagramHashtag}`,
    },
    {
      icon: "Weather",
      title: "Weather",
      className: "md:w-22 md:h-21 w-10 h-10",
      desc: temprature || "It will be mostly sunny with temperature reaching up to 28 degrees.",
    },
    {
      icon: "Staff",
      title: "Staff",
      className: "md:w-16 md:h-20 w-10 h-10",
      desc: staffDetails || "We recommend the nearby hotel called Bhola Bhawan near the venue for the staff members",
    },
    {
      icon: "Parking",
      title: "Parking",
      className: "md:w-28 md:h-20 w-10 h-10",
      desc: parkingDetails || "Valet parking for all our guests will be available at the venue",
    },
  ];
  return (
    <section className="w-full relative text-[#5B78A6] font-Jacques-plain overflow-hidden">
      <Image
        src="/assets/img/event/eventDetails.png"
        alt="wedding-photo"
        width={1920}
        height={1080}
        className="object-cover md:h-full h-220 w-full"
      />
      <img
        src="/assets/img/event/flowerSet.png"
        alt="flower set"
        className="w-full absolute md:-bottom-40 -bottom-10 z-50 object-cover"
      />
      <div className="maxcontainer mx-auto bg-white h-[1000px] absolute md:top-[200px] top-10 left-5 right-5 md:left-40 md:right-40"></div>
      <Image
        src="/assets/img/event/flower.png"
        alt="wedding-photo"
        width={1920}
        height={1080}
        className="object-cover absolute w-80 md:h-120 h-20 top-15 right-10"
      />
        <Image
        src="/assets/img/event/flower.png"
        alt="wedding-photo"
        width={1920}
        height={1080}
        className="object-cover absolute w-80 md:h-120 h-20 top-15 left-10 scale-x-[-1]"
      />
      <p
        className="
        font-Jacques-plain md:text-[56px] text-sm leading-[120%] absolute md:top-2/8 left-1/2 -translate-x-1/2 text-center "
      >
        Things To  Know
      </p>
      <p className=" md:text-[27px] text-[10px]  text-center absolute left-1/2 -translate-x-1/2 md:top-4/12 top-4/20 leading-[120%] w-full px-18 md:max-w-6xl">
        To help you feel at ease and enjoy every moment of the celebrations,
        <br />
        we’ve gathered a few thoughtful details we’d love for you to know before
        the big day.
      </p>
      <div
        className="absolute left-1/2 -translate-x-1/2 md:text-xl text-xs text-center md:top-[450px] top-2/20 leading-[120%]
         grid md:grid-cols-4 grid-cols-1 md:gap-x-20 gap-x-10 w-full md:px-60 px-15 mt-40 gap-"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2  md:max-w-xs mx-auto"
          >
            <SvgIcon name={item.icon} className={item.className} />
            <h2 className="md:text-3xl text-xl">{item.title}</h2>
            <p className="md:text-xl text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
      
    </section>
  );
};
export default SubDetails;
