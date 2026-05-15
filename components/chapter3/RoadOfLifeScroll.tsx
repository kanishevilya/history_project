"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CH3_IMAGES, CH3_ROAD_OF_LIFE } from "@/constants/chapter3";

export function RoadOfLifeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    ["#0a1628", "#0a1628", "#b8bcc4", "#d4d8de"],
  );
  const fleetOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const iceOpacity = useTransform(scrollYProgress, [0.4, 0.55, 1], [0, 1, 1]);
  const crackOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 0.85]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.3], [0.55, 0.25]);
  const labelSummer = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const labelWinter = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[280vh]"
      aria-label="Дорога жизни — сезонный скролл"
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
      >
        <div className="ch3-mono border-b-2 border-white/20 px-6 py-3 text-[0.65rem] uppercase tracking-[0.25em] text-white/70">
          {CH3_ROAD_OF_LIFE.subtitle}
        </div>

        <div className="relative flex flex-1 flex-col justify-center px-6 py-8 md:px-12">
          <h2 className="ch3-display relative z-10 text-4xl text-white md:text-6xl">
            {CH3_ROAD_OF_LIFE.title}
          </h2>
          <p className="ch3-mono relative z-10 mt-4 max-w-xl text-sm leading-relaxed text-white/75">
            {CH3_ROAD_OF_LIFE.intro}
          </p>

          <motion.div
            style={{ opacity: mapOpacity }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40"
          >
            <Image
              src={CH3_IMAGES.roadMap}
              alt="Карта Дороги жизни"
              width={900}
              height={600}
              className="max-h-[70%] w-auto object-contain contrast-125 grayscale"
            />
          </motion.div>

          <motion.div
            style={{ opacity: fleetOpacity }}
            className="absolute bottom-[12%] right-6 w-[min(100%,420px)] md:right-12"
          >
            <div className="border-2 border-white/30 bg-black/40 p-1">
              <Image
                src={CH3_IMAGES.ladogaFleet}
                alt="Ладожская военная флотилия"
                width={640}
                height={400}
                className="h-auto w-full grayscale contrast-125"
              />
            </div>
            <motion.p
              style={{ opacity: labelSummer }}
              className="ch3-mono mt-2 text-[0.65rem] uppercase tracking-widest text-white/80"
            >
              {CH3_ROAD_OF_LIFE.summerLabel}
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: iceOpacity }}
            className="absolute bottom-[12%] left-6 w-[min(100%,420px)] md:left-12"
          >
            <div className="border-2 border-[#262626] bg-[#ebe9e4]/90 p-1">
              <Image
                src={CH3_IMAGES.iceRoad}
                alt="По ледовой дороге"
                width={640}
                height={400}
                className="h-auto w-full contrast-125 grayscale"
              />
            </div>
            <motion.p
              style={{ opacity: labelWinter }}
              className="ch3-mono mt-2 text-[0.65rem] uppercase tracking-widest text-[#262626]"
            >
              {CH3_ROAD_OF_LIFE.winterLabel}
            </motion.p>
          </motion.div>

          <motion.div
            style={{ opacity: crackOpacity }}
            className="ch3-ice-crack absolute inset-0 z-20"
            aria-hidden
          />
        </div>

        <div className="relative z-30 grid gap-4 border-t-2 border-[#b71c1c] bg-[#141414] px-6 py-6 sm:grid-cols-3 md:px-12">
          {CH3_ROAD_OF_LIFE.stats.map((s) => (
            <div
              key={s.stamp}
              className="border-2 border-dashed border-white/40 px-4 py-3 text-center sm:text-left"
            >
              <p className="ch3-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
                {s.stamp}
              </p>
              <p className="ch3-display mt-1 text-3xl text-white md:text-4xl">{s.value}</p>
              <p className="ch3-mono text-xs text-white/70">{s.unit}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
