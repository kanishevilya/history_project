"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { CH4_IMAGES, CHAPTER4_META } from "@/constants/chapter4";
import {
  IntroSection,
  PostWarSection,
  RiverSeaSection,
  ContainerEraSection,
  GoldenAgeSection,
  CrisisSection,
  ConclusionSection,
} from "@/components/chapter4/chapter4Sections";
import "@/app/chapter-4/gosplan.css";
import { HomeLinkButton } from "@/components/chapter/HomeLinkButton";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

function Ch4BackToTop() {
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
            document.getElementById("ch4-top")?.scrollIntoView({ behavior: "smooth" })
          }
          className="ch4-meta fixed bottom-6 right-5 z-[9999] border-2 border-black bg-[#eceff1] px-3 py-2 text-black hover:border-[#0284c7] hover:text-[#0284c7] rounded-none"
          aria-label="К началу главы"
        >
          ↑ Вверх
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function ChapterFourView() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayDark = useTransform(scrollYProgress, [0, 1], [0.25, 0.88]);

  return (
    <main className="ch4-root ch4-paper min-h-screen">
      <HomeLinkButton className="border-2 border-black bg-[#eceff1] text-[#141414] hover:border-[#0284c7] hover:text-[#0284c7] focus-visible:outline-[#0284c7]" />
      <Ch4BackToTop />

      <section
        ref={heroRef}
        id="ch4-top"
        className="relative h-[70vh] min-h-[480px] overflow-hidden border-b-2 border-black"
      >
        <Image
          src={CH4_IMAGES.hero}
          alt=""
          fill
          className="object-cover object-center contrast-110 grayscale"
          sizes="100vw"
          priority
        />
        <motion.div
          style={{ opacity: overlayDark }}
          className="absolute inset-0 bg-gradient-to-b from-[#eceff1]/30 via-[#141414]/55 to-[#141414]"
        />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col justify-end pl-12 pr-6 pb-14 md:pr-12 md:pb-20"
        >
          <p className="ch4-meta text-[#eceff1]/85">
            Глава {CHAPTER4_META.number} · {CHAPTER4_META.heroYear}
          </p>
          <h1 className="ch4-hero-title mt-5 max-w-5xl text-[#eceff1]">
            {CHAPTER4_META.titleLine1}
            <span className="mt-2 block text-[#0284c7]">{CHAPTER4_META.titleAccent}</span>
            <span className="ch4-hero-sub mt-3 block text-[#eceff1]/90">
              {CHAPTER4_META.titleLine2}
            </span>
          </h1>
          <p className="ch4-kicker mt-8 text-[#eceff1]/65">
            {CHAPTER4_META.subtitle}
          </p>
        </motion.div>
      </section>

      <IntroSection />
      <PostWarSection />
      <RiverSeaSection />
      <ContainerEraSection />
      <GoldenAgeSection />
      <CrisisSection />
      <ConclusionSection />
    </main>
  );
}
