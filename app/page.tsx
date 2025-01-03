"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useThrottledScroll } from "./hooks/useThrottledScroll";

// Constants
const PARALLAX_FACTOR = 0.5;
const BACKGROUND_SHIFT = 0.1;
const INITIAL_BACKGROUND_POSITION = 20;

// Image data with descriptive alt texts
const IMAGES = {
  mainBg: { 
    src: "/main-bg.webp",
    alt: "Abstract background pattern" 
  }
};

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

interface HeroSectionProps {
  scrollY: number;
}
const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="relative h-screen flex items-center"
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
      style={{
        backgroundImage: `url(${IMAGES.mainBg.src})`,
        backgroundPosition: `center ${INITIAL_BACKGROUND_POSITION - scrollY * BACKGROUND_SHIFT}%`,
        transform: `translateY(${scrollY * PARALLAX_FACTOR}px)`,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-55"
        style={{
          backdropFilter: "blur(4px)",
        }}
      />
    </div>

    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3 }}
      className="relative px-6 md:pl-40 pb-56 md:pb-20 flex flex-col gap-5 z-10 max-w-[750px]"
    >
      <h1 className="text-3xl md:text-[45px] text-white font-semibold leading-tight">
        OPSC VIT, Chennai was created to spread awareness of{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500 animate-gradient">
          {" "}
          Free and Open Source Software (FOSS).{" "}
        </span>
      </h1>
    </motion.div>
  </motion.div>
);

const DecorativeImages = () => (
  <>
    <motion.div
      className="absolute top-0 right-0 z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4.0 }}
    ></motion.div>

    <motion.div
      initial={{ rotate: -10, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 4.0}}
      className="absolute top-0 left-0 z-10"
    ></motion.div>
  </>
);

const AboutSection = () => (
  <motion.section
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative text-white py-16 backdrop-blur-sm"
  >
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        About OPSC
      </h2>
      <p className="mb-4 text-lg leading-relaxed">
        The Open Source Programming Club (OSPC) at VIT is a student-driven initiative aimed at fostering a culture of open-source development. Our mission is to empower members with practical skills, community-driven projects, and insights into collaborative software development.
      </p>
      <p className="mb-8 text-lg leading-relaxed">
        We believe in the power of open-source to bring about positive change and innovation. Whether you&apos;re an experienced developer or just getting started, join us in building a world where knowledge is freely shared, and everyone has the opportunity to contribute!
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          Explore OSPC
        </Link>
        <Link
          href="/events"
          className="px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-purple-300 focus:outline-none"
        >
          Upcoming Events
        </Link>
      </div>
    </div>
  </motion.section>
);

const EntryAnimation = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-dark-800 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
          Welcome to OPSC
        </h1>
        <p className="text-lg md:text-2xl text-gray-300">
          Empowering Open-Source at VIT, Chennai
        </p>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const scrollY = useThrottledScroll();

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowAnimation(true);
      localStorage.setItem("hasVisited", "true");
    } else {
      setShowAnimation(false);
    }
  }, []);

  if (showAnimation) {
    return <EntryAnimation onComplete={() => setShowAnimation(false)} />;
  }

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-dark-800 to-purple-400">
      <HeroSection scrollY={scrollY} />
      <DecorativeImages />
      <AboutSection />
    </main>
  );
}
