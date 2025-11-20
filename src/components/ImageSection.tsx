"use client";
import { motion } from "framer-motion";
import SvgIcon from "./SvgIcon";
const EASE_BOUNCE = [0.68, -0.55, 0.265, 1.55] as const;
const ImageSection = () => {
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
        className="object-cover absolute top-9 right-9 w-auto h-106"
      />
      <img
        src="/assets/img/event/headerImg.png"
        alt="wedding-photo"
        className="object-cover absolute top-9 left-9 w-auto h-106 scale-x-[-1]"
      />
      <p className=" md:text-[42px] text-xl  text-center absolute left-1/2 -translate-x-1/2 md:top-[294px] top-17/20 uppercase leading-[120%]">
        meet the <br />
        <span className="md:text-[78px] leading-[120%]">
          bridge and
          <br /> groom
        </span>
      </p>
      <p className=" md:text-[27px] text-xl  text-center absolute left-1/2 -translate-x-1/2 md:top-[570px] top-17/20 leading-[120%]">
        We are both so delighted that you are able to join us in celebrating
        what we hope will be one of the happiest days of our lives. The
        affection shown to us by so many people since our roka has been
        incredibly moving, and has touched us both deeply. We would like to take
        this opportunity to thank everyone most sincerely for their kindness.We
        are looking forward to see you at the wedding.
      </p>
      <img
        src="/assets/img/event/imageFrame.png"
        alt="wedding-photo"
        className="object-cover absolute top-5/18 left-1/2 -translate-x-1/2"
      />
      <p className=" md:text-5xl text-xl  text-center absolute left-1/2 -translate-x-1/2 md:top-12/18 top-17/20">
        Please <br /> rsvp
        <br />
        <span className="md:text-2xl text-xs">
          Click to message on WhatsApp
        </span>
        <br />
      </p>
      <motion.a
        href="https://wa.me/1234567890"
        className="absolute  left-1/2 -translate-x-1/2 md:top-13/18 mt-10 top-500"
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
        className="absolute -bottom-3 right-0 w-auto h-auto "
      />
      <motion.img
        src="/assets/img/event/dummyTree2.png"
        alt="fountain"
        className="absolute -bottom-3 left-0 w-auto h-auto"
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
