"use client";

import { motion } from "framer-motion";
import SvgIcon from "./SvgIcon";

const EASE_SOFT_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_BOUNCE = [0.68, -0.55, 0.265, 1.55] as const;

const events = [
  {
    id: 1,
    title: "Mehandi",
    date: "Friday, December 25th 2025",
    venue: "Taj Exotica Resort, Goa",
    time: "6pm Onwards",
    img: "/assets/img/event/mehandi.png",
  },
  {
    id: 2,
    title: "Haldi",
    date: "Friday, December 25th 2025",
    venue: "Taj Exotica Resort, Goa",
    time: "6pm Onwards",
    img: "/assets/img/event/haldi.png",
  },
  {
    id: 3,
    title: "Cocktail",
    date: "Friday, December 25th 2025",
    venue: "Taj Exotica Resort, Goa",
    time: "6pm Onwards",
    img: "/assets/img/event/cocktails.png",
  },
  {
    id: 4,
    title: "Pre-wedding",
    date: "Friday, December 25th 2025",
    venue: "Taj Exotica Resort, Goa",
    time: "6pm Onwards",
    img: "/assets/img/event/Pre-wedding.png",
  },
  {
    id: 5,
    title: "Shaddi",
    date: "Friday, December 25th 2025",
    venue: "Taj Exotica Resort, Goa",
    time: "6pm Onwards",
    img: "/assets/img/event/shaddi.png",
  },
  {
    id: 6,
    title: "Reception",
    date: "Friday, December 25th 2025",
    venue: "Taj Exotica Resort, Goa",
    time: "6pm Onwards",
    img: "/assets/img/event/reception.png",
  },
];

const EventShow = () => {
  return (
    <section className="w-full relative text-[#7A5192] h-full overflow-hidden">
      <img
        src="/assets/eventBg.png"
        alt="background"
        className="w-full contain-content h-570 md:h-auto"
      />
      <motion.img
        src="/assets/img/event/birdCouple.png"
        alt="bird couple"
        className="absolute md:top-10 top-5 right-0 md:w-70 md:h-60 w-20 h-15"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 4,
          ease: EASE_SOFT_OUT,
          repeat: Infinity,
          repeatDelay: 0,
        }}
      />

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bird-heart-${i}`}
          className="absolute md:top-10 top-5 right-0 text-xl md:text-3xl pointer-events-none"
          style={{
            right: `${10 + i * 15}px`,
            top: `${30 + i * 20}px`,
          }}
          animate={{
            opacity: [0, 0.8, 1, 0.5, 0],
            y: [0, -40, -80],
            x: [0, Math.sin(i) * 20, Math.sin(i) * -10],
            scale: [0.3, 1, 0.5, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          💕
        </motion.div>
      ))}
      <p className="font-Jacques-plain md:text-5xl text-sm text-[#BD8C1C] text-center absolute  left-1/2  -translate-x-1/2 md:top-[330px] top-[70px]">
        On the following events
      </p>

      <div className="absolute  font-Jacques-plain  left-3/6 -translate-x-1/2 md:top-[620px] top-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-20 gap-5 place-items-center">
        {events.map((ev, index) => (
          <motion.section
            key={ev.id}
            className="text-center"
            whileHover={{
              scale: 1.08,
              rotate: [0, -2, 2, 0],
              transition: { duration: 0.4, ease: EASE_SOFT_OUT },
            }}
          >
            <motion.img
              src={ev.img}
              alt={ev.title}
              className="w-84 object-contain"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + index * 0.3,
                ease: EASE_SOFT_OUT,
                repeat: Infinity,
                repeatDelay: 0,
              }}
            />
            <h4 className="md:text-[42px] text-xl md:mt-4 mt-0">{ev.title}</h4>
            <div className="md:text-xl text-sm leading-[120%] mt-2">
              {ev.date} <br />
              {ev.venue} <br />
              {ev.time}
            </div>
          </motion.section>
        ))}
      </div>
      <p className="font-Jacques-plain md:text-5xl text-xl text-[#BD8C1C] text-center absolute left-1/2 -translate-x-1/2 md:top-12/18 top-17/20">
        See the <br /> route <br />
        <span className="md:text-2xl text-xs">Click to open the map</span>
        <br />
      </p>
      <motion.a
        href="#"
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
        <SvgIcon name="Location" className="w-15 h-10 md:w-18 md:h-18" />
      </motion.a>
      <motion.img
        src="/assets/img/event/fountainleft.png"
        alt="fountain"
        className="absolute -bottom-3 left-0 w-40 md:w-xl md:h-206"
      />
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`water-left-${i}`}
          className="absolute w-1.5 h-1.5 md:w-3 md:h-3 rounded-full pointer-events-none"
          style={{
            left: `${5 + (i % 8) * 20}px`,
            bottom: `${60 + (i % 6) * 50}px`,
            background:
              i % 2 === 0
                ? "rgba(147, 197, 253, 0.8)"
                : "rgba(191, 219, 254, 0.9)",
          }}
          animate={{
            y: [-50, -150, -100, 0],
            x: [0, Math.sin(i) * 20, Math.cos(i) * -15, 0],
            opacity: [0, 1, 0.8, 0],
            scale: [0.3, 1.8, 1.2, 0.2],
          }}
          transition={{
            duration: 2 + (i % 4) * 0.3,
            delay: i * 0.05,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        />
      ))}

      <motion.img
        src="/assets/img/event/fountainright.png"
        alt="fountain"
        className="absolute -bottom-3 right-0 w-40 md:w-xl md:h-115"
      />
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`water-right-${i}`}
          className="absolute w-1.5 h-1.5 md:w-3 md:h-3 rounded-full pointer-events-none"
          style={{
            right: `${5 + (i % 8) * 50}px`,
            bottom: `${40 + (i % 6) * 50}px`,
            background:
              i % 2 === 0
                ? "rgba(147, 197, 253, 0.8)"
                : "rgba(191, 219, 254, 0.9)",
          }}
          animate={{
            y: [-40, -130, -80, 0],
            x: [0, Math.cos(i) * -18, Math.sin(i) * 12, 0],
            opacity: [0, 1, 0.7, 0],
            scale: [0.3, 1.6, 1, 0.2],
          }}
          transition={{
            duration: 2.2 + (i % 4) * 0.3,
            delay: i * 0.05,
            ease: EASE_SOFT_OUT,
            repeat: Infinity,
            repeatDelay: 0,
          }}
        />
      ))}
      <motion.img
        src="/assets/img/event/horse.png"
        alt="wedding-photo"
        className="object-cover absolute md:-bottom-10 -bottom-5 left-1/2 -translate-x-1/2 md:h-132 h-40 z-100"
        animate={{
          y: [0, -12, -6, 0, -10, 0],
          scale: [1, 1.05, 0.98, 1.02, 1],
          rotate: [0, 1, -1, 0.5, 0],
        }}
        transition={{
          duration: 0.8,
          ease: EASE_SOFT_OUT,
          repeat: Infinity,
          repeatDelay: 0,
        }}
      />
      {[...Array(60)].map((_, i) => {
        const randomLeft = Math.random() * 300 - 150;
         const randomSize = Math.random() * 10 + 6; 
        const randomOpacity = Math.random() * 0.5 + 0.2;
        const randomDuration = Math.random() * 1 + 1.2;
        const randomDelay = Math.random() * 0.5;

        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute bottom-0 rounded-full pointer-events-none"
            style={{
              width: randomSize,
              height: randomSize,
              left: `calc(50% + ${randomLeft}px)`,
              background: `rgba(251, 191, 36, ${randomOpacity})`,
              filter: "blur(1px)",
            }}
            animate={{
              x: [0, -20 + Math.random() * -40, -10],
              y: [0, -40 - Math.random() * 20, 10],
              opacity: [randomOpacity, 0.2, 0],
              scale: [0.5, 1.5 + Math.random(), 0.4],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              ease: "easeOut",
              repeat: Infinity,
            }}
          />
        );
      })}
    </section>
  );
};

export default EventShow;
