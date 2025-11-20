"use client";
import { motion } from "framer-motion";
import SvgIcon from "./SvgIcon";

type IconAnimation = "floatSlow" | "floatMedium" | "sway" | "pulse" |"none";

interface IconConfig {
  name: string;
  wrapperClass: string;
  iconClass: string;
  animation: IconAnimation;
  delay?: number;
}

interface TempHeroProps {
  groomName?: string;
  brideName?: string;
  heroImage?: string;
}

const ICON_CONFIG: IconConfig[] = [
  {
    name: "FlowerYellow",
    wrapperClass: "absolute md:top-10 top-5 md:left-24 left-10 z-10",
    iconClass: "md:w-40 w-10 h-10 md:h-37",
    animation: "floatMedium",
    delay: 0.15,
  },
  {
    name: "BigLeave",
    wrapperClass: "absolute md:-top-35 -top-5 md:-right-2 -right-5 z-10",
    iconClass: "md:w-90 w-20 h-30 md:h-120",
    animation: "sway",
    delay: 0.25,
  },
  {
    name: "SmallLeave",
    wrapperClass: "absolute md:top-30 md:left-101 top-15 left-20 z-10",
    iconClass: "md:w-28 w-10 h-12 md:h-32",
    animation: "sway",
    delay: 0.35,
  },
  {
    name: "SmallLeave",
    wrapperClass: "absolute md:top-[45%] top-[50%] md:right-101 right-20 z-10",
    iconClass: "md:w-28 w-10 h-12 md:h-32",
    animation: "sway",
    delay: 0.6,
  },
  {
    name: "CompleteLeave",
    wrapperClass: "absolute  -bottom-4 md:-left-10 left-0 z-10",
    iconClass: "md:w-107 w-20 h-30 md:h-113",
    animation: "none",
    delay: 0.4,
  },
  {
    name: "CompleteLeave2",
    wrapperClass: "absolute bottom-0 right-0 z-10",
    iconClass: "md:w-100 w-20 h-30 md:h-106",
    animation: "none",
    delay: 0.55,
  },
  {
    name: "RoseImg",
    wrapperClass: "absolute top-3/16 left-0 z-10",
    iconClass: "md:w-179 w-40 h-60 md:h-293",
    animation: "sway",
    delay: 0.5,
  },
  {
    name: "RoseImg1",
    wrapperClass: "absolute md:top-10/16 top-8/16 md:right-0 -right-8 z-10",
    iconClass: "md:w-132 w-40 h-60 md:h-213",
    animation: "sway",
    delay: 0.65,
  },
  {
    name: "Desginer",
    wrapperClass: "absolute left-1/2 bottom-0 -translate-x-1/2 z-20",
    iconClass: "md:h-350 h-80 ",
    animation: "none",
    delay:0,
  },
];

const EASE_SOFT_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_FLOAT = [0.445, 0.05, 0.55, 0.95] as const;
const EASE_SWAY = [0.25, 0.1, 0.25, 1] as const;
const getResponsiveY = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;

  if (w < 640) return [0, -15, 0]; 
  if (w < 1024) return [0, -20, 0];  
  return [0, -30, 0];                 
};
const getIconAnimation = (type: IconAnimation, delay = 0) => {
  switch (type) {
    case "floatSlow":
      return {
        y: [0, -22, 0],
        scale: [1, 1.04, 1],
        transition: {
          duration: 8,
          ease: EASE_FLOAT,
          repeat: Infinity,
          delay,
        },
      };
    case "floatMedium":
      return {
         y: getResponsiveY(),
        scale: [1, 1.06, 1],
        transition: {
          duration: 7,
          ease: EASE_FLOAT,
          repeat: Infinity,
          delay,
        },
      };
    case "sway":
      return {
        x: [0, -14, 8, 0],
        rotate: [0, -4, 3, 0],
        transition: {
          duration: 10,
          ease: EASE_SWAY,
          repeat: Infinity,
          delay,
        },
      };
    case "pulse":
    default:
      return {
        scale: [1, 1.05, 1],
        transition: {
          duration: 6,
          ease: EASE_FLOAT,
          repeat: Infinity,
          delay,
        },
      };
      case "none":
      return {
        x: [0, 0, 0, 0],
        rotate: [0, 0, 0, 0],
        transition: {
          duration: 6,
          ease: EASE_FLOAT,
          repeat: Infinity,
          delay,
        },
      };
  }
};

const TempHero = ({ groomName = 'Abhishek', brideName = 'Kanika', heroImage = '/assets/couple.png' }: TempHeroProps) => {
  return (
    <section  className="relative w-full overflow-hidden">
      <motion.img
        src={heroImage}
        alt="wedding-photo"
        initial={{ opacity: 0, y: -30, scale: 1.08 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 1.4, ease: EASE_SOFT_OUT },
        }}
        className="absolute z-50 w-full max-h-264 object-cover curved-edge"
      />

      <motion.img
        src="/assets/img2.jpg"
        alt="wedding-photo"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 1.2, delay: 0.15, ease: EASE_SOFT_OUT },
        }}
        className="w-full object-cover"
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 0.2, ease: EASE_SOFT_OUT },
        }}
      >
        <motion.img
          src="/assets/img3.jpg"
          alt="wedding-photo"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 1.1, delay: 0.25, ease: EASE_SOFT_OUT },
          }}
          className="w-full object-cover"
        />

        {ICON_CONFIG.map((icon, index) => (
          <motion.div
            key={`${icon.name}-${index}`}
            className={`pointer-events-none ${icon.wrapperClass}`}
            animate={getIconAnimation(icon.animation, icon.delay || 0)}
          >
            <SvgIcon name={icon.name} className={icon.iconClass} />
          </motion.div>
        ))}

        <motion.h1
          className="font-Jacques font-normal md:text-[216px] text-5xl leading-[90%] tracking-[0px] text-[#53602B]
               text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.1, delay: 0.4, ease: EASE_SOFT_OUT },
          }}
        >
          {groomName} <span className="opacity-55 leading-6"><br /> Weds</span><br />  {brideName}
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default TempHero;
