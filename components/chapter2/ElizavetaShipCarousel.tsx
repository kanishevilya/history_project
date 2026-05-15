"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CH2_IMAGES } from "@/constants/chapter2";

const SLIDES = [
  {
    src: CH2_IMAGES.elizavetaSide,
    alt: "Пароход «Елизавета»",
    caption: "«Елизавета» — вид сбоку",
  },
  {
    src: CH2_IMAGES.elizavetaFortress,
    alt: "Рейс мимо Кронштадта",
    caption: "Кронштадт на маршруте буксира",
  },
] as const;

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export function ElizavetaShipCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <figure className="mx-auto w-full max-w-2xl">
      <motion.div className="image-frame-corners relative aspect-[4/3] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <figcaption className="figure-caption-museum mt-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.caption}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-1.5 text-sm italic leading-relaxed text-foreground/75"
          >
            {slide.caption}
          </motion.p>
        </AnimatePresence>
      </figcaption>
      <div
        className="mt-4 flex justify-center gap-2"
        role="tablist"
        aria-label="Слайды парохода"
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Слайд ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}
