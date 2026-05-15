"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CH3_INTRO,
  CH3_CRISIS_1914,
  CH3_REVOLUTION,
  CH3_VASILIEV,
  CH3_INTERWAR,
  CH3_EVACUATION,
  CH3_PIPELINE,
  CH3_FLEET,
  CH3_MEMORY_WALL,
  CHAPTER3_CONCLUSION,
  CH3_IMAGES,
} from "@/constants/chapter3";
import { RevealWords } from "@/components/chapter/ChapterWordReveal";
import { RoadOfLifeScroll } from "@/components/chapter3/RoadOfLifeScroll";

const SECTION = "px-6 py-14 md:px-10";

export function IntroSection() {
  return (
    <section className={SECTION}>
      <motion.div className="mx-auto max-w-3xl">
        <Link href="/chapter-2" className="ch3-link mb-8 inline-block">
          ← Глава II
        </Link>
        <RevealWords
          dropCap
          text={CH3_INTRO.lead}
          className="text-lg leading-relaxed text-[#262626]"
        />
      </motion.div>
    </section>
  );
}

export function Crisis1914Section() {
  return (
    <section className={`${SECTION} border-t-2 border-[#262626]`}>
      <div className="mx-auto max-w-4xl">
        <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#b71c1c]">
          {CH3_CRISIS_1914.subtitle}
        </p>
        <h2 className="ch3-display mt-2 text-3xl md:text-5xl">{CH3_CRISIS_1914.title}</h2>
        <div className="mt-8 space-y-6">
          {CH3_CRISIS_1914.paragraphs.map((p) => (
            <RevealWords key={p.slice(0, 40)} text={p} className="leading-relaxed" />
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {CH3_CRISIS_1914.stats.map((s) => (
            <div
              key={s.label}
              className="border-2 border-[#262626] bg-[#141414] px-6 py-5 text-[#ebe9e4]"
            >
              <p className="ch3-display text-4xl text-[#b71c1c]">
                {s.value}
                <span className="ml-2 text-2xl text-[#ebe9e4]">{s.unit}</span>
              </p>
              <p className="ch3-mono mt-2 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RevolutionSection() {
  return (
    <section className={`${SECTION} ch3-war`}>
      <div className="mx-auto max-w-5xl">
        <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#b71c1c]">
          {CH3_REVOLUTION.subtitle}
        </p>
        <h2 className="ch3-display mt-2 text-3xl text-[#ebe9e4] md:text-5xl">
          {CH3_REVOLUTION.title}
        </h2>
        <div className="relative mt-10 grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {CH3_REVOLUTION.body.map((p) => (
              <RevealWords
                key={p.slice(0, 36)}
                text={p}
                className="leading-relaxed text-[#d8d6d0]"
              />
            ))}
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <figure className="ch3-archive-doc relative mx-auto max-w-sm bg-[#e8e4d8] p-3">
              <Image
                src={CH3_IMAGES.decree}
                alt={CH3_REVOLUTION.decreeCaption}
                width={480}
                height={640}
                className="h-auto w-full sepia contrast-110"
              />
              <div className="ch3-stamp absolute -right-3 -top-3 rotate-6 bg-[#141414] px-3 py-2 text-[0.55rem]">
                {CH3_REVOLUTION.stampDate}
              </div>
              <figcaption className="ch3-mono mt-3 border-t border-[#262626]/30 pt-2 text-[0.7rem] leading-snug text-[#262626]">
                <strong className="block uppercase tracking-wide">
                  {CH3_REVOLUTION.decreeCaption}
                </strong>
                {CH3_REVOLUTION.decreeNote}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VasilievSection() {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-12">
          <figure className="lg:col-span-4">
            <div className="overflow-hidden border-2 border-[#262626]">
              <Image
                src={CH3_IMAGES.vasiliev}
                alt={CH3_VASILIEV.name}
                width={500}
                height={650}
                className="h-auto w-full contrast-125 grayscale"
              />
            </div>
            <figcaption className="ch3-mono mt-3 text-xs uppercase tracking-wider">
              {CH3_VASILIEV.name}
            </figcaption>
          </figure>
          <div className="lg:col-span-8">
            <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#b71c1c]">
              {CH3_VASILIEV.role}
            </p>
            <RevealWords text={CH3_VASILIEV.bio} className="mt-4 leading-relaxed" />
            <div className="ch3-rule-thick mt-10" />
            <h3 className="ch3-display mt-6 text-2xl md:text-3xl">
              {CH3_VASILIEV.manifestTitle}
            </h3>
            <ul className="mt-8 space-y-0">
              {CH3_VASILIEV.reforms.map((item, i) => (
                <li
                  key={item.n}
                  className={`grid gap-4 border-t-2 border-[#262626] py-8 md:grid-cols-[5rem_1fr] ${
                    i === CH3_VASILIEV.reforms.length - 1 ? "border-b-2" : ""
                  }`}
                >
                  <span className="ch3-manifest-num">{item.n}</span>
                  <div>
                    <h4 className="ch3-display text-xl">{item.title}</h4>
                    <p className="mt-3 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <RevealWords text={CH3_VASILIEV.outcome} className="mt-8 italic" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function InterwarSection() {
  return (
    <section className={`${SECTION} border-y-2 border-[#262626] bg-[#141414] text-[#ebe9e4]`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#b71c1c]">
          {CH3_INTERWAR.subtitle}
        </p>
        <h2 className="ch3-display mt-3 text-3xl md:text-4xl">{CH3_INTERWAR.title}</h2>
        <RevealWords
          text={CH3_INTERWAR.body}
          className="mt-6 text-left leading-relaxed text-[#d8d6d0] md:text-center md:text-lg"
        />
      </div>
    </section>
  );
}

export function EvacuationSection() {
  return (
    <section className={SECTION}>
      <div className="mx-auto max-w-4xl">
        <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#b71c1c]">
          {CH3_EVACUATION.subtitle}
        </p>
        <h2 className="ch3-display mt-2 text-3xl md:text-5xl">{CH3_EVACUATION.title}</h2>
        <RevealWords text={CH3_EVACUATION.intro} className="mt-6 leading-relaxed" />
        <div className="mt-10 overflow-x-auto">
          <table className="ch3-bulletin-table">
            <thead>
              <tr>
                <th>Этап</th>
                <th>Задачи и достижения</th>
              </tr>
            </thead>
            <tbody>
              {CH3_EVACUATION.rows.map((row) => (
                <tr key={row.phase}>
                  <td className="ch3-mono whitespace-nowrap font-bold uppercase">
                    {row.phase}
                  </td>
                  <td>{row.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function RoadOfLifeSection() {
  return <RoadOfLifeScroll />;
}

export function PipelineSection() {
  return (
    <section className="grid min-h-[70vh] grid-rows-2 border-t-2 border-[#262626]">
      <div className={`${SECTION} flex flex-col justify-center bg-[#ebe9e4]`}>
        <div className="mx-auto max-w-3xl">
          <p className="ch3-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#b71c1c]">
            {CH3_PIPELINE.subtitle}
          </p>
          <h2 className="ch3-display mt-2 text-3xl md:text-5xl">{CH3_PIPELINE.title}</h2>
          <RevealWords text={CH3_PIPELINE.topText} className="mt-6 leading-relaxed" />
        </div>
      </div>
      <div className="relative flex items-end bg-[#0a0f14] px-6 py-10 md:px-12">
        <div className="absolute inset-0 opacity-50">
          <Image
            src={CH3_IMAGES.pipeline}
            alt={CH3_PIPELINE.imageCaption}
            fill
            className="object-cover object-center contrast-125 grayscale"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 max-w-lg border-l-4 border-[#b71c1c] bg-black/60 p-6 backdrop-blur-sm">
          <p className="ch3-mono text-[0.65rem] uppercase tracking-widest text-[#b71c1c]">
            Глубина · Ладога
          </p>
          <p className="ch3-mono mt-2 text-sm text-[#ebe9e4]">{CH3_PIPELINE.imageCaption}</p>
        </div>
      </div>
    </section>
  );
}

export function FleetSection() {
  return (
    <section className={`${SECTION} border-t-2 border-[#262626]`}>
      <div className="mx-auto max-w-3xl">
        <h2 className="ch3-display text-3xl md:text-4xl">{CH3_FLEET.title}</h2>
        <RevealWords text={CH3_FLEET.body} className="mt-6 leading-relaxed" />
      </div>
    </section>
  );
}

export function MemoryWallSection() {
  return (
    <section className="ch3-memory-wall px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="ch3-display text-center text-2xl tracking-[0.2em] text-[#6a6560] md:text-3xl">
          {CH3_MEMORY_WALL.title}
        </h2>
        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {CH3_MEMORY_WALL.items.map((item) => (
            <div key={item.label} className="text-center sm:text-left">
              <p className="ch3-memory-value">{item.value}</p>
              <p className="ch3-mono mt-3 text-xs uppercase tracking-[0.25em] text-[#6a6560]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <p className="ch3-mono mx-auto mt-20 max-w-2xl text-center text-sm leading-relaxed text-[#5a5550]">
          {CH3_MEMORY_WALL.closing}
        </p>
      </div>
    </section>
  );
}

export function ConclusionSection() {
  const prev = CHAPTER3_CONCLUSION.prevChapter;
  const next = CHAPTER3_CONCLUSION.nextChapter;
  return (
    <section className={`${SECTION} border-t border-[#262626]/20`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="ch3-mono text-xs uppercase tracking-widest text-[#6a6560]">
          Предыдущая глава
        </p>
        <Link href={prev.href} className="group mt-3 inline-block">
          <p className="ch3-display text-2xl transition-colors group-hover:text-[#b71c1c] md:text-3xl">
            Глава {prev.number}: {prev.title}
          </p>
          <p className="ch3-mono mt-1 text-sm text-[#6a6560] group-hover:text-[#b71c1c]">
            {prev.subtitle}
          </p>
        </Link>
        {next && (
          <>
            <p className="ch3-mono mt-12 text-xs uppercase tracking-widest text-[#6a6560]">
              Следующая глава
            </p>
            <Link href={next.href} className="group mt-3 inline-block">
              <p className="ch3-display text-2xl transition-colors group-hover:text-[#b71c1c] md:text-3xl">
                Глава {next.number}: {next.title}
              </p>
              <p className="ch3-mono mt-1 text-sm text-[#6a6560] group-hover:text-[#b71c1c]">
                {next.subtitle}
              </p>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
