"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { CH5_IMAGES, CHAPTER5_META } from "@/constants/chapter5";
import {
  IntroSection,
  MarineFacadeSection,
  ReclamationSection,
  LogisticsSection,
  TransitSection,
  MeteorSection,
  ConclusionSection,
} from "@/components/chapter5/chapter5Sections";
import "@/app/chapter-5/digital.css";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

function Ch5BackToTop() {
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
            document.getElementById("ch5-top")?.scrollIntoView({ behavior: "smooth" })
          }
          className="ch5-meta fixed bottom-6 right-5 z-[9999] border border-[#0f172a] bg-white px-3 py-2 text-[#0f172a] hover:border-[#00e5ff] hover:text-[#00e5ff]"
          aria-label="К началу главы"
        >
          ↑ Вверх
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function ChapterFiveView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const washWhite = useTransform(scrollYProgress, [0, 0.85], [0.15, 0.92]);

  return (
    <main className="ch5-root ch5-light min-h-screen bg-white">
      <Ch5BackToTop />

      <section
        ref={heroRef}
        id="ch5-top"
        className="relative h-[70vh] min-h-[480px] overflow-hidden border-b border-[#0f172a]"
      >
        <Image
          src={CH5_IMAGES.hero}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <motion.div
          style={{ opacity: washWhite }}
          className="absolute inset-0 bg-white"
        />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col justify-end pl-12 pr-6 pb-14 md:pr-12 md:pb-20"
        >
          <p className="ch5-meta text-[#0f172a]/70">
            Глава {CHAPTER5_META.number} · {CHAPTER5_META.heroYear}
          </p>
          <h1 className="ch5-hero-title mt-5 max-w-5xl text-[#0f172a]">
            {CHAPTER5_META.titleLine1}
            <span className="mt-2 block text-[#00e5ff]">{CHAPTER5_META.titleAccent}</span>
            <span className="ch5-hero-sub mt-3 block text-[#0f172a]/85">
              {CHAPTER5_META.titleLine2}
            </span>
          </h1>
          <p className="ch5-meta mt-8 text-[#0f172a]/55">{CHAPTER5_META.subtitle}</p>
        </motion.div>
      </section>

      <IntroSection />
      <MarineFacadeSection />
      <ReclamationSection />
      <LogisticsSection />
      <TransitSection />
      <MeteorSection />
      <ConclusionSection />
    </main>
  );
}
