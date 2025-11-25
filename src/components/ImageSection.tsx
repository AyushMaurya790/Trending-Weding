"use client";
import { motion } from "framer-motion";
import SvgIcon from "./SvgIcon";
import { useState, useEffect } from "react";
const EASE_BOUNCE = [0.68, -0.55, 0.265, 1.55] as const;

interface ImageSectionProps {
  whatsappLink?: { platform: string; url: string }[];
  images?: string[];
}

const ImageSection = ({ whatsappLink, images }: ImageSectionProps) => {
  const staticImages = ["/assets/1.avif", "/assets/img/event/haldi.png"];
  const carouselImages = images && images.length > 0 ? images : staticImages;
  const whatsappUrl = whatsappLink?.find(link => link.platform.toLowerCase() === 'whatsapp')?.url || "https://wa.me/1234567890";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % carouselImages.length
    );
  };

  return (
    <section className="w-full relative text-[#F2CD93] font-Jacques-plain">
      <img
        src="/assets/img/event/ImageSectionBg.png"
        alt="wedding-photo"
        className="object-cover md:h-full h-200  w-full"
      />
      <img
        src="/assets/img/event/headerImg.png"
        alt="wedding-photo"
        className="object-cover absolute lg:top-9 md:top-4 lg:right-9 top-2 right-2 w-auto md:right-4 top-1 right-1 w-1.5 lg:h-106 h-30 md:h-50 h-15"
      />
      <img
        src="/assets/img/event/headerImg.png"
        alt="wedding-photo"
        className="object-cover absolute lg:top-9 md:top-4 lg:left-9 top-2 left-2 w-auto md:left-4 top-1 left-1 w-1.5 lg:h-106 h-30 scale-x-[-1] md:h-50 h-15"
      />
      <p className=" lg:text-[42px] text-xl  text-center absolute left-1/2 -translate-x-1/2 md:text-[21px] text-xl  text-center absolute left-1/2 -translate-x-1/2 lg:top-[294px] top-2/20 uppercase leading-[120%] md:top-[120px] top-2/20 uppercase leading-[120%]">
        meet the <br />
        <span className="lg:text-[78px] leading-[120%] md:text-[39px] text-xl leading-[120%]">
          bridge and
          <br /> groom
        </span>
      </p>
      <p className=" lg:text-[27px] text-xs  text-center absolute left-1/2 -translate-x-1/2 md:text-[14px] text-xs  text-center absolute left-0 -translate-x-0 lg:top-[570px] top-4/20 leading-[120%] w-full px-5 md:max-w-6xl md:top-[285px] top-4/20 leading-[60%] w-full px-3 md:max-w-3xl">
        We are both so delighted that you are able to join us in celebrating
        what we hope will be one of the happiest days of our lives. The
        affection shown to us by so many people since our roka has been
        incredibly moving, and has touched us both deeply. We would like to take
        this opportunity to thank everyone most sincerely for their kindness.We
        are looking forward to see you at the wedding.
      </p>

      <div 
        className="absolute md:top-6/18 top-6/18 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={handleNextImage}
      >
        <div className="relative inline-block">
          <img
            src="/assets/img/event/imageFrame.png"
            alt="frame"
            className="relative z-20 w-full h-auto object-contain pointer-events-none select-none"
          />
          <motion.img
            key={currentImageIndex}
            src={carouselImages[currentImageIndex]}
            alt="photo"
            className="absolute top-[14%] left-[14%] w-[72%] h-[72%] object-cover z-10 rounded-full overflow-hidden"
            style={{
              clipPath: "circle(50% at 50% 50%)",
            }}
            initial={{ opacity: 0, x: "10%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-10%" }}
          />
        </div>
      </div>
      <p className=" lg:text-5xl text-xl  text-center absolute left-1/2 -translate-x-1/2 md:text-2xl text-xl  text-center absolute left-1/2 -translate-x-1/2 lg:top-12/18 top-12/20 md:top-12/18 top-12/20">
        Please <br /> rsvp
        <br />
        <span className="md:text-2xl text-xs">
          Click to message on WhatsApp
        </span>
        <br />
      </p>
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute  left-1/2 -translate-x-1/2 lg:top-13/18 mt-10 top-14/20 md:top13/28 mt-5 top-14/20"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          ease: EASE_BOUNCE,
          repeat: Infinity,
          repeatDelay: 0,
        }}
      >
        <SvgIcon
          name="Location"
          className="w-15 h-10 md:w-18 md:h-18 text-[#F2CD93]"
        />
      </motion.a>
      <motion.img
        src="/assets/img/event/dummyTree1.png"
        alt="fountain"
        className="absolute -bottom-3 right-0 w-auto h-70 lg:h-auto md:h-110 w-auto"   
      />
      <motion.img
        src="/assets/img/event/dummyTree2.png"
        alt="fountain"
        className="absolute -bottom-3 left-0 w-auto h-70 lg:h-auto md:h-100 w-100"
      />

      <motion.img
        src="/assets/img/event/horse1.png"
        alt="wedding-photo"
        className="object-cover absolute lg:-bottom-10 -bottom-5 left-1/2 -translate-x-1/2 md:-bottom-5 left-1/2 -translate-x-1/2 lg:h-132 h-40 z-100 md:h-65 h-20 z-50"
      />
    </section>
  );
};
export default ImageSection;
