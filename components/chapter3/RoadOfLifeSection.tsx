"use client";

import Image from "next/image";
import { CH3_IMAGES, CH3_ROAD_OF_LIFE } from "@/constants/chapter3";
import { RevealWords } from "@/components/chapter/ChapterWordReveal";

const SECTION = "px-6 py-14 md:px-10";

export function RoadOfLifeSection() {
  return (
    <section className={`${SECTION} ch3-war`} aria-label="Дорога жизни">
      <div className="mx-auto max-w-5xl">
        <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#b71c1c]">
          {CH3_ROAD_OF_LIFE.subtitle}
        </p>
        <h2 className="ch3-display mt-2 text-3xl text-[#ebe9e4] md:text-5xl">
          {CH3_ROAD_OF_LIFE.title}
        </h2>
        <RevealWords
          text={CH3_ROAD_OF_LIFE.intro}
          className="mt-8 max-w-3xl leading-relaxed text-[#d8d6d0]"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-white/25 bg-black/40">
              <Image
                src={CH3_IMAGES.ladogaFleet}
                alt="Ладожская военная флотилия"
                fill
                className="object-cover object-center grayscale contrast-125"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            <figcaption className="ch3-mono mt-2 text-[0.65rem] uppercase tracking-widest text-white/70">
              {CH3_ROAD_OF_LIFE.summerLabel}
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden border-2 border-white/20 bg-[#141414]">
              <Image
                src={CH3_IMAGES.iceRoad}
                alt="По ледовой дороге"
                fill
                className="object-cover object-center grayscale contrast-125"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            <figcaption className="ch3-mono mt-2 text-[0.65rem] uppercase tracking-widest text-white/70">
              {CH3_ROAD_OF_LIFE.winterLabel}
            </figcaption>
          </figure>
        </div>
        <div className="relative mt-10 aspect-[16/9] max-h-[280px] w-full overflow-hidden border border-white/15 opacity-90">
          <Image
            src={CH3_IMAGES.roadMap}
            alt="Карта Дороги жизни"
            fill
            className="object-contain object-center contrast-125 grayscale"
            sizes="900px"
          />
        </div>
        <div className="mt-10 grid gap-4 border-t-2 border-[#b71c1c] pt-8 sm:grid-cols-3">
          {CH3_ROAD_OF_LIFE.stats.map((s) => (
            <div
              key={s.stamp}
              className="border-2 border-dashed border-white/40 px-4 py-3"
            >
              <p className="ch3-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/60">
                {s.stamp}
              </p>
              <p className="ch3-display mt-1 text-2xl text-white md:text-3xl">{s.value}</p>
              <p className="ch3-mono text-xs text-white/70">{s.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
