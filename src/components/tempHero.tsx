"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SvgIcon from "./SvgIcon";

type IconAnimation = "floatSlow" | "floatMedium" | "sway" | "pulse" |"none";

interface IconConfig {
  name: string;
  wrapperClass: string;
  iconClass: string;
  animation: IconAnimation;
  delay?: number;
}

const ICON_CONFIG: IconConfig[] = [
  {
    name: "FlowerYellow",
    wrapperClass: "absolute top-0 left-24 z-10",
    iconClass: "w-40 h-37",
    animation: "floatMedium",
    delay: 0.15,
  },
  {
    name: "BigLeave",
    wrapperClass: "absolute -top-40 -right-2 z-10",
    iconClass: "w-90 h-120",
    animation: "sway",
    delay: 0.25,
  },
  {
    name: "SmallLeave",
    wrapperClass: "absolute top-30 left-101 z-10",
    iconClass: "w-28 h-32",
    animation: "floatSlow",
    delay: 0.35,
  },
  {
    name: "SmallLeave",
    wrapperClass: "absolute top-[45%] right-101 z-10",
    iconClass: "w-28 h-32",
    animation: "floatSlow",
    delay: 0.6,
  },
  {
    name: "CompleteLeave",
    wrapperClass: "absolute bottom-0 -left-10 z-10",
    iconClass: "w-107 h-113",
    animation: "floatMedium",
    delay: 0.4,
  },
  {
    name: "CompleteLeave2",
    wrapperClass: "absolute bottom-0 right-0 z-10",
    iconClass: "w-100 h-106",
    animation: "floatMedium",
    delay: 0.55,
  },
  {
    name: "RoseImg",
    wrapperClass: "absolute top-3/16 left-0 z-10",
    iconClass: "w-179 h-293",
    animation: "sway",
    delay: 0.5,
  },
  {
    name: "RoseImg1",
    wrapperClass: "absolute top-10/16 right-0 z-10",
    iconClass: "w-132 h-213",
    animation: "sway",
    delay: 0.65,
  },
  {
    name: "Desginer",
    wrapperClass: "absolute left-1/2 bottom-0 -translate-x-1/2 z-20",
    iconClass: "h-350",
    animation: "none",
    delay:0,
  },
];

const EASE_SOFT_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_FLOAT = [0.445, 0.05, 0.55, 0.95] as const;
const EASE_SWAY = [0.25, 0.1, 0.25, 1] as const;

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
        y: [0, -30, 0],
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

const TempHero = () => {
  return (
    <section  className="relative w-full overflow-hidden">
      <motion.img
        src="/assets/couple.png"
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
          className="font-Jacques font-normal text-[216px] leading-[90%] tracking-[0px] text-[#53602B]
               text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 1.1, delay: 0.4, ease: EASE_SOFT_OUT },
          }}
        >
          Abhishek <span className="opacity-55"> Weds</span> Kanika
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default TempHero;
