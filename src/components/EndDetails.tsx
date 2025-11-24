"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EndDetailsProps {
  counterDate?: string;
  locationLink?: string;
  socialLinks?: { platform: string; url: string }[];
}

const EndDetails = ({ counterDate, locationLink, socialLinks }: EndDetailsProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    if (!counterDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(counterDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [counterDate]);

  const instagramLink = socialLinks?.find(link => link.platform.toLowerCase() === 'instagram')?.url;
  const whatsappLink = socialLinks?.find(link => link.platform.toLowerCase() === 'whatsapp')?.url;

  return (
    <div className="relative text-[#280F56] font-Jacques-plain overflow-hidden ">
      <div className="flex justify-between w-full">
        <Image
          src="/assets/img/event/edgeBorder.png"
          alt="wedding-photo"
          width={1920}
          height={1080}
          className="object-cover h-full md:w-32 w-10"
        />
        <Image
          src="/assets/img/event/edgeBorder.png"
          alt="wedding-photo"
          width={1920}
          height={1080}
          className="object-cover h-full  scale-x-[-1] md:w-32 w-10"
        />
      </div>
      <p className="font-Jacques-plain md:text-[56px] text-sm leading-[120%] absolute md:top-1/12 left-1/2 -translate-x-1/2 text-center ">
        The countdown begins <br /> 
        {counterDate ? `${timeLeft.days}D ${timeLeft.hours}H ${timeLeft.minutes}M` : "118D 11H 47M"}
      </p>
      <p className=" md:text-[27px] text-xs  text-center absolute left-1/2 -translate-x-1/2 md:top-3/12 top-1/20 leading-[120%] w-full md:px-18 px-12 md:max-w-7xl">
        Mittal family is excited that you are able to join us in celebrating
        what
        <br />
        we hope will be one of the happiest days of our lives.
      </p>
      <div className="flex justify-between w-full max-w-3xl md:top-4/12 top-5/20 absolute left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 md:max-w-xs mx-auto">
          <h2 className="md:text-3xl text-lg">Links</h2>
            <a href={locationLink} target="_blank" rel="noopener noreferrer" className="md:text-xl text-xs hover:underline">
              Venue location
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="md:text-xl text-xs hover:underline">
              RSVP
            </a>
            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="md:text-xl text-xs hover:underline">
              Instagram
            </a>
        </div>

        <div className="flex flex-col items-center gap-2 md:max-w-xs mx-auto">
          <h2 className="md:text-3xl text-lg">Links</h2>
          <p className="md:text-xl text-xs">The invite</p>
          <p className="md:text-xl text-xs">Bride and Groom</p>
          <p className="md:text-xl text-xs">Things to know</p>
        </div>
      </div>
      <Image
        src="/assets/img/event/endCouple.png"
        alt="wedding-photo"
        width={1920}
        height={1080}
        className="object-cover h-[50%] scale-x-[-1] w-full absolute -bottom-2"
      />
    </div>
  );
};
export default EndDetails;
