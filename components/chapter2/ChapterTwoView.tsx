"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CH2_IMAGES, CHAPTER2_META, CHAPTER2_HERO } from "@/constants/chapter2";
import { SectionDivider } from "@/components/chapter2/editorial";
import {
  IntroSection,
  BerdSection,
  ElizavetaSection,
  TimetableSection,
  MariinskySection,
  PutilovSection,
  GutuevskySection,
  ConclusionSection,
  FooterSection,
} from "@/components/chapter2/chapter2Sections";
import "@/app/chapter-2/editorial.css";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

function EditorialBackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const on = () => setVisible(window.scrollY > 360);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = () =>
    document.getElementById("ch2-top")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.35, ease: EASE }}
          onClick={go}
          className="ch2-back-to-top fixed bottom-6 right-5 z-[9999] flex h-11 w-11 items-center justify-center shadow-[0_4px_20px_var(--ch2-shadow)]"
          aria-label="К началу главы"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function ChapterTwoView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const smokeBlur = useTransform(scrollYProgress, [0, 1], [28, 48]);

  return (
    <main className="ch2-root ch2-paper-texture min-h-screen">
      <EditorialBackToTop />

      <section
        ref={heroRef}
        id="ch2-top"
        className="relative h-[70vh] min-h-[480px] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={CH2_IMAGES.hero}
            alt=""
            fill
            className="object-cover object-[60%_center] grayscale contrast-[1.2] brightness-[0.55]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0F4C75]/85 via-[#1B262C]/80 to-[#050608]" />
        <motion.div
          className="pointer-events-none absolute -left-1/4 top-1/4 z-[2] h-1/2 w-[70%] rounded-full bg-white/25"
          style={{ filter: useTransform(smokeBlur, (v) => `blur(${v}px)`) }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-1/4 bottom-0 z-[2] h-2/5 w-[60%] rounded-full bg-[#1a1a1a]/60"
          style={{ filter: useTransform(smokeBlur, (v) => `blur(${v * 0.9}px)`) }}
          aria-hidden
        />

        <motion.div
          style={{ opacity: heroTextOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#BBE1FA]/90">
              {CHAPTER2_HERO.chapterLabel}
            </p>
            <h1 className="mt-4 font-serif text-4xl font-black tracking-tight text-[#BBE1FA] drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl">
              {CHAPTER2_META.title}
            </h1>
            <p className="mt-3 font-serif text-lg italic text-[#BBE1FA]/85 md:text-xl">
              {CHAPTER2_META.subtitle}
            </p>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-[#9ec5e8]">
              {CHAPTER2_META.tagline}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <IntroSection />
      <SectionDivider />
      <BerdSection />
      <SectionDivider />
      <ElizavetaSection />
      <TimetableSection />
      <SectionDivider />
      <MariinskySection />
      <SectionDivider />
      <PutilovSection />
      <GutuevskySection />
      <ConclusionSection />
      <FooterSection />
    </main>
  );
}
