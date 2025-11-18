'use client';
import { motion } from "framer-motion";
import SvgIcon from "./SvgIcon";

const EASE_SOFT_OUT = [0.16, 1, 0.3, 1] as const;

const InviteSection = () => {
  return (
    <section className="w-full relative text-[#7A5192]">
      <img
        src="/assets/inviteSectionBg.png"
        alt="wedding-photo"
        className="object-cover h-556"
      />
      <img
        src="/assets/HeaderImg.png"
        alt="wedding-photo"
        className="object-cover absolute -top-10 mx-auto w-full"
      />
      <p
        className="
        font-Jacques-plain text-[26px] leading-[150%] absolute top-10 left-1/2 -translate-x-1/2 text-center text-[#BD8C1C]"
      >
        ॐ श्री गणेशाय नम
      </p>
      <SvgIcon
        name="LordGanesh"
        className="w-41 h-53 absolute top-20 left-1/2 -translate-x-1/2"
      />
      <p
        className="
        font-Jacques-plain  text-[42px] leading-[150%] absolute top-3/18 left-1/2 -translate-x-1/2 text-center "
      >
        With the heavenly blessings of <br />
        Smt. Lata Devi & Sm. Kamal Kapoor <br /> and <br />
        Mrs. Reena & Mr. Rajiv Kapoor
      </p>
      <p
        className="
        font-Jacques-plain text-8xl leading-[150%] absolute top-6/20 left-1/2 -translate-x-1/2 text-center text-[#BD8C1C]"
      >
        WE <br /> INVITE
      </p>
      <div
        className="
        font-Jacques-plain text-[42px] leading-[150%] absolute top-8/18 left-1/2 -translate-x-1/2 text-center "
      >
        You to join us in the wedding celebrations of <br />
        <p className="mt-8">
          Daughter of <br />
        Mrs. Reena & Mr. Rajiv Kapoor  
        </p>
        
      </div>
      <p
        className="font-Parisienne text-[42px] leading-[150%] text-center absolute top-11/18 left-2/8 -translate-x-1/2"
      >
        Abhishek <br /> & <br /> Anjali
      </p>
      <p
        className="font-Jacques-plain text-[42px] leading-[150%] text-center absolute top-11/18 left-6/8 -translate-x-1/2"
      >
       Saturday, 21 June 2035 <br /> 123 Anywhere St., City, <br /> ST 12345
      </p>

      <img
        src="/assets/boundaryImg.png"
        alt="wedding-photo"
        className="object-cover absolute bottom-0 h-auto w-full z-20"
      />
      <img
        src="/assets/coupleImg.png"
        alt="wedding-photo"
        className="object-cover absolute bottom-0 left-1/2 -translate-x-1/2 md:h-240 h-auto"
      />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-bottom-${i}`}
          className="absolute bottom-0 pointer-events-none z-30"
          style={{
            left: `${i * 6.5}%`,
            fontSize: i % 3 === 0 ? '2rem' : i % 3 === 1 ? '2.5rem' : '3rem',
          }}
          animate={{
            opacity: [0, 0.6, 1, 0.6, 0],
            y: [0, -150, -300, -500],
            x: [0, Math.sin(i * 0.5) * 20, Math.sin(i * 0.5) * -20, 0],
            scale: [0.3, 0.8, 1.2, 0.6, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 6 + (i % 3),
            delay: i * 0.4,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          ❤️
        </motion.div>
      ))}
      
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-bottom-layer2-${i}`}
          className="absolute bottom-0 pointer-events-none z-30"
          style={{
            left: `${5 + i * 7.5}%`,
            fontSize: i % 2 === 0 ? '1.5rem' : '2rem',
          }}
          animate={{
            opacity: [0, 0.8, 1, 0.5, 0],
            y: [0, -200, -400, -600],
            x: [0, Math.cos(i * 0.7) * -15, Math.cos(i * 0.7) * 15, 0],
            scale: [0.2, 1, 0.8, 0.4, 0.1],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 7 + (i % 2),
            delay: 0.3 + i * 0.5,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          ❤️
        </motion.div>
      ))}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-top-${i}`}
          className="absolute top-0 pointer-events-none z-30"
          style={{
            left: `${i * 6.5}%`,
            fontSize: i % 3 === 0 ? '2rem' : i % 3 === 1 ? '2.5rem' : '3rem',
          }}
          animate={{
            opacity: [0, 0.6, 1, 0.6, 0],
            y: [0, 150, 300, 500],
            x: [0, Math.sin(i * 0.5) * 20, Math.sin(i * 0.5) * -20, 0],
            scale: [0.3, 0.8, 1.2, 0.6, 0.2],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 6 + (i % 3),
            delay: i * 0.4,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          ❤️
        </motion.div>
      ))}
      
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`heart-top-layer2-${i}`}
          className="absolute top-0 pointer-events-none z-30"
          style={{
            left: `${5 + i * 7.5}%`,
            fontSize: i % 2 === 0 ? '1.5rem' : '2rem',
          }}
          animate={{
            opacity: [0, 0.8, 1, 0.5, 0],
            y: [0, 200, 400, 600],
            x: [0, Math.cos(i * 0.7) * -15, Math.cos(i * 0.7) * 15, 0],
            scale: [0.2, 1, 0.8, 0.4, 0.1],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 7 + (i % 2),
            delay: 0.3 + i * 0.5,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </section>
  );
};
export default InviteSection;
