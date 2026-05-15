"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CH5_INTRO,
  CH5_MARINE_FACADE,
  CH5_RECLAMATION,
  CH5_LOGISTICS,
  CH5_TRANSIT,
  CH5_METEOR,
  CH5_CONCLUSION,
  CH5_IMAGES,
  CHAPTER5_CONCLUSION,
} from "@/constants/chapter5";
import { RevealWords } from "@/components/chapter/ChapterWordReveal";
import { Chapter5Section } from "@/components/chapter5/Chapter5Layout";
import { CadSpecTable } from "@/components/chapter5/CadSpecTable";
import { BlueprintCallouts } from "@/components/chapter5/BlueprintCallouts";
import { LiveTracker } from "@/components/chapter5/LiveTracker";
import { HudFrame } from "@/components/chapter5/HudFrame";
import { ArcticHorizon } from "@/components/chapter5/ArcticHorizon";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export function IntroSection() {
  return (
    <section className="ch5-light ch5-grid-bg border-b border-[#0f172a] py-12 pl-12 pr-6 md:pr-10">
      <Link
        href="/chapter-4"
        className="ch5-meta inline-block border-b border-[#0f172a] pb-1 text-[#0f172a] no-underline hover:border-[#00e5ff] hover:text-[#00e5ff]"
      >
        ← Глава IV
      </Link>
      <RevealWords
        text={CH5_INTRO.lead}
        className="ch5-body mt-8 max-w-3xl text-[#0f172a]/90"
      />
    </section>
  );
}

export function MarineFacadeSection() {
  const d = CH5_MARINE_FACADE;
  return (
    <Chapter5Section gutter={d.gutter}>
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        viewport={{ once: true }}
      >
        <p className="ch5-meta text-[#0f172a]/55">Секция 01 · CAD</p>
        <h2 className="ch5-title mt-3">
          Инфраструктурные
          <br />
          мегапроекты
        </h2>
        <p className="ch5-meta mt-4">Морской фасад · пассажирский порт</p>
      </motion.header>

      <motion.div
        className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        viewport={{ once: true }}
      >
        <div className="space-y-8 lg:col-span-1">
          {d.intro.slice(0, 2).map((p) => (
            <RevealWords key={p.slice(0, 40)} text={p} className="ch5-body max-w-none" />
          ))}
        </div>
        <figure className="ch5-plate relative aspect-[4/5] w-full max-w-[280px] lg:ml-auto">
          <Image
            src={CH5_IMAGES.oldTerminal}
            alt="Устаревший Морской вокзал"
            fill
            className="object-cover object-center grayscale contrast-125"
            sizes="280px"
          />
          <figcaption className="ch5-meta mt-3 border-l-2 border-[#0f172a] pl-3">
            Архив · устаревший вокзал
          </figcaption>
        </figure>
      </motion.div>

      <div className="mt-10 space-y-8">
        {d.intro.slice(2).map((p) => (
          <RevealWords key={p.slice(0, 40)} text={p} className="ch5-body" />
        ))}
      </div>

      <div className="mt-14 grid gap-0 border border-[#0f172a] lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="relative min-h-[320px] border-b border-[#0f172a] lg:border-b-0 lg:border-r">
          <Image
            src={CH5_IMAGES.marineFacade}
            alt="Пассажирский порт Морской фасад"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
        </div>
        <div className="p-4 lg:p-5">
          <CadSpecTable title={d.cadTitle} subtitle={d.cadSubtitle} rows={d.cadRows} />
        </div>
      </div>
    </Chapter5Section>
  );
}

export function ReclamationSection() {
  const d = CH5_RECLAMATION;
  return (
    <Chapter5Section gutter={d.gutter}>
      <p className="ch5-meta text-[#0f172a]/55">Секция 02 · девелопмент</p>
      <h2 className="ch5-title-sm mt-3">Намыв Васильевского острова</h2>
      <div className="mt-10 max-w-3xl space-y-8">
        {d.paragraphs.map((p) => (
          <RevealWords key={p.slice(0, 40)} text={p} className="ch5-body max-w-none" />
        ))}
      </div>
      <BlueprintCallouts
        imageSrc={CH5_IMAGES.morNab}
        alt="Школа и детский сад, Морская набережная"
        callouts={d.callouts}
      />
    </Chapter5Section>
  );
}

export function LogisticsSection() {
  const d = CH5_LOGISTICS;
  return (
    <Chapter5Section gutter={d.gutter}>
      <p className="ch5-meta text-[#0f172a]/55">Секция 03 · live tracker</p>
      <h2 className="ch5-title-sm mt-3">Адаптация грузооборота</h2>
      <p className="ch5-meta mt-3 text-[#00e5ff]">FESCO · Baltorient Line</p>
      <div className="mt-10 max-w-3xl space-y-8">
        {d.paragraphs.map((p) => (
          <RevealWords key={p.slice(0, 40)} text={p} className="ch5-body max-w-none" />
        ))}
      </div>
      <LiveTracker
        teuValue={d.teu.value}
        teuUnit={d.teu.unit}
        period={d.teu.period}
        routeLabel={d.routeLabel}
        ports={d.route}
      />
    </Chapter5Section>
  );
}

export function TransitSection() {
  const d = CH5_TRANSIT;
  return (
    <Chapter5Section gutter={d.gutter}>
      <p className="ch5-meta text-[#0f172a]/55">Секция 04 · коридор</p>
      <h2 className="ch5-title-sm mt-3">Внутреннее судоходство</h2>
      <p className="ch5-meta mt-3">Нева · разводные мосты</p>

      <div className="ch5-plate ch5-plate--2 relative mt-10 aspect-[21/9] w-full overflow-hidden">
        <Image
          src={CH5_IMAGES.volgoBaltPath}
          alt="Волго-Балтийский водный путь"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <p className="ch5-meta mt-4 border-l-2 border-[#0f172a] pl-4 max-w-2xl leading-relaxed">
        {d.volgoCaption}
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-8">
          {d.paragraphs.map((p) => (
            <RevealWords key={p.slice(0, 40)} text={p} className="ch5-body max-w-none" />
          ))}
        </div>
        <div className="ch5-dispatch lg:sticky lg:top-24 lg:self-start">
          <p className="ch5-meta text-[#00e5ff]">DISPATCH_LOG · {d.dispatcher.period}</p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <p className="ch5-dispatch-value">{d.dispatcher.openings}</p>
              <p className="ch5-dispatch-label">{d.dispatcher.openingsLabel}</p>
            </div>
            <div>
              <p className="ch5-dispatch-value">{d.dispatcher.vessels}</p>
              <p className="ch5-dispatch-label">{d.dispatcher.vesselsLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </Chapter5Section>
  );
}

export function MeteorSection() {
  const d = CH5_METEOR;
  return (
    <Chapter5Section gutter={d.gutter}>
      <p className="ch5-meta text-[#0f172a]/55">Секция 05 · HUD</p>
      <h2 className="ch5-title-sm mt-3">Туристический флот</h2>
      <p className="ch5-meta mt-3">Метеор-120Р · подводные крылья</p>
      <div className="mt-10 max-w-3xl space-y-8">
        {d.paragraphs.map((p) => (
          <RevealWords key={p.slice(0, 40)} text={p} className="ch5-body max-w-none" />
        ))}
      </div>
      <div className="mt-12">
        <HudFrame
          src={CH5_IMAGES.meteor120r}
          alt="Метеор-120Р"
          model={d.hud.model}
          year={d.hud.year}
          speed={d.hud.speed}
          capacity={d.hud.capacity}
        />
      </div>
    </Chapter5Section>
  );
}

export function ConclusionSection() {
  const prev = CHAPTER5_CONCLUSION.prevChapter;
  const d = CH5_CONCLUSION;
  return (
    <Chapter5Section gutter={d.gutter} zone="arctic" className="ch5-grid-bg !bg-[#0f172a] pb-0">
      <p className="ch5-meta text-[#00e5ff]">Секция 06 · горизонт СМП</p>
      <h2 className="ch5-title mt-4 text-white md:text-5xl">Заключение и будущее</h2>

      <div className="mt-12 max-w-4xl space-y-8">
        {d.summary.map((p) => (
          <RevealWords
            key={p.slice(0, 40)}
            text={p}
            className="ch5-body max-w-none text-lg leading-loose text-white/88"
          />
        ))}
      </div>

      <div className="mt-14 border-t border-[#00e5ff]/30 pt-12">
        <p className="ch5-meta text-[#00e5ff]/70">Перспективы · СМП · цифровизация</p>
        <div className="mt-8 space-y-8">
          {d.future.map((p, i) => (
            <RevealWords
              key={p.slice(0, 40)}
              text={p}
              className={`ch5-body max-w-none ${
                i === d.future.length - 1
                  ? "text-xl font-medium leading-loose text-white md:text-2xl"
                  : "text-white/82"
              }`}
            />
          ))}
        </div>
      </div>

      <ArcticHorizon />

      <div className="border-t border-[#00e5ff]/20 py-12 text-center">
        <p className="ch5-meta text-white/40">Предыдущая глава</p>
        <Link href={prev.href} className="group mt-4 inline-block no-underline">
          <p className="ch5-title-sm text-white group-hover:text-[#00e5ff]">
            Глава {prev.number}: {prev.title}
          </p>
          <p className="ch5-meta mt-2 text-white/45 group-hover:text-[#00e5ff]">
            {prev.subtitle}
          </p>
        </Link>
      </div>
    </Chapter5Section>
  );
}
