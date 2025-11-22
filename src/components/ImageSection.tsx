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
    }, 5000);

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
        className="object-cover absolute md:top-9 md:right-9 top-2 right-2 w-auto md:h-106 h-30"
      />
      <img
        src="/assets/img/event/headerImg.png"
        alt="wedding-photo"
        className="object-cover absolute md:top-9 md:left-9 top-2 left-2 w-auto md:h-106 h-30 scale-x-[-1]"
      />
      <p className=" md:text-[42px] text-xl  text-center absolute left-1/2 -translate-x-1/2 md:top-[294px] top-2/20 uppercase leading-[120%]">
        meet the <br />
        <span className="md:text-[78px] leading-[120%]">
          bridge and
          <br /> groom
        </span>
      </p>
      <p className=" md:text-[27px] text-xs  text-center absolute left-1/2 -translate-x-1/2 md:top-[570px] top-4/20 leading-[120%] w-full px-5 md:max-w-6xl">
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
      </div>
      <p className=" md:text-5xl text-xl  text-center absolute left-1/2 -translate-x-1/2 md:top-12/18 top-12/20">
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
        className="absolute  left-1/2 -translate-x-1/2 md:top-13/18 mt-10 top-14/20"
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
        className="absolute -bottom-3 right-0 w-auto h-70 md:h-auto "
      />
      <motion.img
        src="/assets/img/event/dummyTree2.png"
        alt="fountain"
        className="absolute -bottom-3 left-0 w-auto h-70 md:h-auto"
      />

      <motion.img
        src="/assets/img/event/horse1.png"
        alt="wedding-photo"
        className="object-cover absolute md:-bottom-10 -bottom-5 left-1/2 -translate-x-1/2 md:h-132 h-40 z-100"
      />
    </section>
  );
};
export default ImageSection;
