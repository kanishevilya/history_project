"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { CH3_IMAGES, CHAPTER3_META } from "@/constants/chapter3";
import {
  IntroSection,
  Crisis1914Section,
  RevolutionSection,
  VasilievSection,
  InterwarSection,
  EvacuationSection,
  RoadOfLifeSection,
  PipelineSection,
  FleetSection,
  MemoryWallSection,
  ConclusionSection,
} from "@/components/chapter3/chapter3Sections";
import "@/app/chapter-3/constructivist.css";
import { HomeLinkButton } from "@/components/chapter/HomeLinkButton";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

function Ch3BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={() =>
            document
              .getElementById("ch3-top")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="ch3-mono fixed bottom-6 right-5 z-[9999] border-2 border-[#262626] bg-[#ebe9e4] px-3 py-2 text-[0.65rem] uppercase tracking-widest text-[#262626] hover:border-[#b71c1c] hover:text-[#b71c1c]"
          aria-label="К началу главы"
        >
          ↑ Вверх
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function ChapterThreeView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayDark = useTransform(scrollYProgress, [0, 1], [0.35, 0.92]);

  return (
    <main className="ch3-root ch3-paper min-h-screen">
      <HomeLinkButton className="border-2 border-[#262626] bg-[#ebe9e4] text-[#262626] hover:border-[#b71c1c] hover:text-[#b71c1c] focus-visible:outline-[#b71c1c]" />
      <Ch3BackToTop />

      <section
        ref={heroRef}
        id="ch3-top"
        className="relative h-[70vh] min-h-[480px] overflow-hidden"
      >
        <Image
          src={CH3_IMAGES.hero}
          alt=""
          fill
          className="object-cover object-center contrast-110 grayscale"
          sizes="100vw"
          priority
        />
        <motion.div
          style={{ opacity: overlayDark }}
          className="absolute inset-0 bg-gradient-to-b from-[#ebe9e4]/20 via-[#262626]/50 to-[#141414]"
        />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 md:px-12 md:pb-20"
        >
          <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.35em] text-[#ebe9e4]/80">
            Глава {CHAPTER3_META.number} · {CHAPTER3_META.heroYear}
          </p>
          <h1 className="ch3-display mt-4 max-w-5xl text-4xl leading-[0.95] text-[#ebe9e4] sm:text-5xl md:text-7xl">
            {CHAPTER3_META.titleLine1}
            <span className="mt-2 block text-[#b71c1c]">
              {CHAPTER3_META.titleAccent}
            </span>
            <span className="mt-2 block text-3xl text-[#ebe9e4]/90 sm:text-4xl md:text-5xl">
              {CHAPTER3_META.titleLine2}
            </span>
          </h1>
          <p className="ch3-mono mt-6 text-sm uppercase tracking-[0.2em] text-[#ebe9e4]/70">
            {CHAPTER3_META.subtitle}
          </p>
        </motion.div>
      </section>

      <IntroSection />
      <div className="ch3-rule-red mx-auto max-w-6xl" />
      <Crisis1914Section />
      <RevolutionSection />
      <VasilievSection />
      <InterwarSection />
      <EvacuationSection />
      <RoadOfLifeSection />
      <PipelineSection />
      <FleetSection />
      <MemoryWallSection />
      <ConclusionSection />
    </main>
  );
}
