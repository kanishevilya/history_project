"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CH4_POSTWAR,
  CH4_RIVER_SEA,
  CH4_CONTAINER_ERA,
  CH4_GOLDEN_AGE,
  CH4_CRISIS,
  CH4_CONCLUSION,
  CH4_IMAGES,
  CHAPTER4_CONCLUSION,
} from "@/constants/chapter4";
import { RevealWords } from "@/components/chapter/ChapterWordReveal";
import { Chapter4Section } from "@/components/chapter4/Chapter4Layout";
import { FleetLedgerTable } from "@/components/chapter4/FleetLedgerTable";
import { TechnicalPassport } from "@/components/chapter4/TechnicalPassport";
import { EgsMapSection } from "@/components/chapter4/EgsMapSection";
import { VesselDashboard } from "@/components/chapter4/VesselDashboard";
import { RoRoRamp } from "@/components/chapter4/RoRoRamp";
import { CurrencyTicker } from "@/components/chapter4/CurrencyTicker";
import { RebootPulseBar } from "@/components/chapter4/RebootPulseBar";

export function IntroSection() {
  return (
    <section className="ch4-paper border-b-2 border-black py-12 pl-12 pr-6 md:pr-10">
      <Link
        href="/chapter-3"
        className="ch4-meta inline-block border-b-2 border-black pb-1 text-[#141414] no-underline hover:border-[#0284c7] hover:text-[#0284c7]"
      >
        ← Глава III
      </Link>
      <p className="ch4-lead mt-8 max-w-2xl text-[#141414]/90">
        Послевоенное восстановление, технологическая революция в логистике,
        золотой век Балтийского морского пароходства и перелом 1990-х.
      </p>
    </section>
  );
}

export function PostWarSection() {
  return (
    <Chapter4Section
      gutter={CH4_POSTWAR.gutter}
      timeline={CH4_POSTWAR.timeline}
    >
      <header className="max-w-4xl">
        <p className="ch4-kicker text-[#141414]/70">Секция 01 · Госплан</p>
        <h2 className="ch4-title mt-3">
          Послевоенное
          <br />
          возрождение
        </h2>
        <p className="ch4-kicker mt-4 text-[#141414]/80">1945–1955</p>
      </header>
      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          {CH4_POSTWAR.paragraphs.map((p) => (
            <RevealWords key={p.slice(0, 48)} text={p} className="ch4-body" />
          ))}
        </div>
        <div className="hidden lg:col-span-1 lg:block" aria-hidden />
        <div className="lg:col-span-4">
          <p className="ch4-meta border-l-4 border-black pl-4">
            IV пятилетка · реконструкция причалов
          </p>
        </div>
      </div>
      <FleetLedgerTable
        title={CH4_POSTWAR.ledgerTitle}
        rows={CH4_POSTWAR.ledgerRows}
      />
      <TechnicalPassport
        intro={CH4_POSTWAR.passportIntro}
        ships={CH4_POSTWAR.ships}
      />
    </Chapter4Section>
  );
}

export function RiverSeaSection() {
  return (
    <Chapter4Section gutter={CH4_RIVER_SEA.gutter}>
      <header>
        <p className="ch4-kicker text-[#141414]/70">Секция 02 · ЕГС</p>
        <h2 className="ch4-title mt-3">Инженерный прорыв</h2>
        <p className="ch4-kicker mt-4">Флот «река-море» · 1950–1960-е</p>
      </header>
      <div className="mt-10 max-w-3xl space-y-8">
        {CH4_RIVER_SEA.paragraphs.map((p) => (
          <RevealWords key={p.slice(0, 48)} text={p} className="ch4-body" />
        ))}
      </div>
      <EgsMapSection
        src={CH4_IMAGES.egsMap}
        caption={CH4_RIVER_SEA.egsCaption}
      />
      <VesselDashboard
        text={CH4_RIVER_SEA.engineeringText}
        projects={CH4_RIVER_SEA.projects}
      />
    </Chapter4Section>
  );
}

export function ContainerEraSection() {
  const { terminal, roro } = CH4_CONTAINER_ERA;
  return (
    <Chapter4Section gutter={CH4_CONTAINER_ERA.gutter}>
      <header>
        <p className="ch4-kicker text-[#0284c7]">Секция 03 · ISO</p>
        <h2 className="ch4-title mt-3">Технологическая трансформация</h2>
        <p className="ch4-kicker mt-4 text-[#0284c7]">
          1970-е · контейнеризация
        </p>
      </header>

      <div className="ch4-iso-plate ch4-plate--2 mt-12">
        <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
          <div className="border-b-2 border-[#0284c7] p-6 lg:border-b-0 lg:border-r-2">
            <p className="ch4-meta text-[#0284c7]">{terminal.date}</p>
            <h3 className="ch4-title-sm mt-3 text-[#141414]">
              {terminal.title}
            </h3>
            <div className="mt-8 space-y-6">
              {terminal.paragraphs.map((p) => (
                <RevealWords
                  key={p.slice(0, 40)}
                  text={p}
                  className="ch4-body max-w-none"
                />
              ))}
            </div>
            <div className="ch4-stat-strip">
              {terminal.stats.map((s) => (
                <div key={s.label}>
                  <span className="ch4-stat-value">{s.value}</span>
                  <span className="ch4-meta mt-2 block text-[#141414]/65">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="ch4-corrugated relative min-h-[280px] lg:min-h-full">
            <Image
              src={CH4_IMAGES.containerTerminal}
              alt="Контейнерный терминал на Турухтанных островах"
              fill
              className="object-cover object-center"
              sizes="300px"
            />
          </div>
        </div>
      </div>

      <RoRoRamp
        imageSrc={CH4_IMAGES.apparelShip}
        alt="Судно типа ро-ро с аппарелью"
      >
        <p className="ch4-meta text-[#0284c7]">
          Ро-ро · горизонтальная погрузка
        </p>
        <h3 className="ch4-title-sm mt-3">{roro.title}</h3>
        <div className="mt-6 space-y-6">
          {roro.paragraphs.map((p) => (
            <RevealWords
              key={p.slice(0, 40)}
              text={p}
              className="ch4-body max-w-none"
            />
          ))}
        </div>
      </RoRoRamp>
    </Chapter4Section>
  );
}

export function GoldenAgeSection() {
  return (
    <Chapter4Section gutter={CH4_GOLDEN_AGE.gutter} zone="inverted">
      <header>
        <p className="ch4-kicker text-white/50">Секция 04 · валютный фонд</p>
        <h2 className="ch4-title mt-3 text-white">Золотой век БМП</h2>
        <p className="ch4-kicker mt-4 text-white/55">1980-е</p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="space-y-8 lg:col-span-7">
          {CH4_GOLDEN_AGE.paragraphs.map((p) => (
            <RevealWords
              key={p.slice(0, 48)}
              text={p}
              className="ch4-body max-w-none text-white/88"
            />
          ))}
        </div>
        <figure className="lg:col-span-5 lg:col-start-8">
          <div className="ch4-portrait-frame relative aspect-[3/4] w-full max-w-[300px] overflow-hidden bg-black lg:ml-auto">
            <Image
              src={CH4_GOLDEN_AGE.leader.image}
              alt={CH4_GOLDEN_AGE.leader.name}
              fill
              className="object-cover object-top contrast-125 grayscale"
              sizes="300px"
            />
          </div>
          <figcaption className="ch4-meta mt-5 text-white/65 lg:text-right">
            {CH4_GOLDEN_AGE.leader.name}
            <span className="mt-2 block tracking-[0.2em] text-white/40">
              {CH4_GOLDEN_AGE.leader.role}
            </span>
          </figcaption>
        </figure>
      </div>

      <CurrencyTicker
        amount={CH4_GOLDEN_AGE.profit.amount}
        label={CH4_GOLDEN_AGE.profit.label}
        year={CH4_GOLDEN_AGE.profit.year}
      />
    </Chapter4Section>
  );
}

export function CrisisSection() {
  const { port, bmpCollapse } = CH4_CRISIS;
  return (
    <Chapter4Section
      gutter={CH4_CRISIS.gutter}
      gutterVariant="warn"
      zone="dark"
    >
      <p className="ch4-kicker text-[#f97316]">Секция 05 · системный крах</p>
      <p className="ch4-body mt-6 max-w-3xl text-white/80">
        {CH4_CRISIS.intro}
      </p>

      <div className="mt-16 grid gap-0 border-2 border-white/30 lg:grid-cols-12">
        <div className="border-b-2 border-white/30 p-6 lg:col-span-7 lg:border-b-0 lg:border-r-2">
          <h3 className="ch4-title-sm text-white">{port.title}</h3>
          <p className="ch4-meta mt-3 text-white/45">
            Стабильный сектор · порт
          </p>
          <div className="mt-8 space-y-6">
            {port.paragraphs.map((p) => (
              <RevealWords
                key={p.slice(0, 40)}
                text={p}
                className="ch4-body max-w-none text-white/82"
              />
            ))}
          </div>
          <div className="ch4-ledger-wrap mt-10 border-white/85">
            <table className="ch4-ledger">
              <thead>
                <tr>
                  <th className="w-[32%]">Период</th>
                  <th>Событие</th>
                </tr>
              </thead>
              <tbody>
                {port.tableRows.map((row) => (
                  <tr key={row.item}>
                    <td className="ch4-ledger-num">{row.item}</td>
                    <td className="ch4-sans text-[0.8rem] normal-case tracking-normal">
                      {row.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <figure className="p-6 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden border border-white/25 lg:ml-auto">
            <Image
              src={port.leader.image}
              alt={port.leader.name}
              fill
              className="object-cover object-center grayscale contrast-110"
              sizes="280px"
            />
          </div>
          <figcaption className="mt-5 lg:text-right">
            <p className="ch4-title-sm text-base text-white">
              {port.leader.name}
            </p>
            <p className="ch4-body mt-3 max-w-none text-sm text-white/65">
              {port.leader.bio}
            </p>
          </figcaption>
        </figure>
      </div>

      <div className="mt-20 border-t-2 border-[#f97316]/60 pt-12">
        <h3 className="ch4-title-sm text-[#f97316]">{bmpCollapse.title}</h3>
        <p className="ch4-meta mt-2 text-white/40">Сектор распада · БМП</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="space-y-0 lg:col-span-7">
            {bmpCollapse.paragraphs.map((p, i) => (
              <div
                key={p.slice(0, 36)}
                className={i % 2 === 0 ? "ch4-shatter" : "ch4-shatter-alt"}
              >
                <RevealWords
                  text={p}
                  className="ch4-body max-w-none text-white/78"
                />
              </div>
            ))}
            <div className="ch4-decree-out mt-8">
              <p className="ch4-meta text-[#f97316]">
                {bmpCollapse.decree.title}
              </p>
              <p className="ch4-body mt-4 max-w-none text-white/80">
                {bmpCollapse.decree.text}
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="ch4-crt relative aspect-[4/3] overflow-hidden">
              <Image
                src={CH4_IMAGES.volgoBalt}
                alt="Арестованный флот — символический кадр"
                fill
                className="object-cover object-center opacity-75 grayscale contrast-125"
                sizes="400px"
              />
            </div>
            <p className="ch4-meta mt-4 text-white/35">
              Архив · распродажа флота · 1993–1999
            </p>
          </div>
          <div className="hidden lg:col-span-1 lg:block" aria-hidden />
        </div>
      </div>
    </Chapter4Section>
  );
}

export function ConclusionSection() {
  const prev = CHAPTER4_CONCLUSION.prevChapter;
  const next = CHAPTER4_CONCLUSION.nextChapter;
  return (
    <Chapter4Section
      gutter={CH4_CONCLUSION.gutter}
      gutterVariant="neon"
      zone="dark"
      className="pb-6"
    >
      <header>
        <p className="ch4-kicker text-[#38bdf8]">Секция 06 · перезагрузка</p>
        <h2 className="ch4-title-sm mt-3 text-[#38bdf8] md:text-4xl">
          Переломный итог
        </h2>
      </header>
      <div className="mt-10 max-w-3xl space-y-8">
        {CH4_CONCLUSION.paragraphs.map((p, i) => (
          <RevealWords
            key={p.slice(0, 40)}
            text={p}
            className={`ch4-body max-w-none ${
              i === CH4_CONCLUSION.paragraphs.length - 1
                ? "text-[#38bdf8]"
                : "text-white/82"
            }`}
          />
        ))}
      </div>

      <RebootPulseBar label={CH4_CONCLUSION.rebootLabel} />

      <div className="border-t border-white/20 pt-12 text-center">
        <p className="ch4-meta mt-12 text-white/40">Предыдущая глава</p>
        <Link href={prev.href} className="group mt-4 inline-block no-underline">
          <p className="ch4-title-sm text-white/80 transition-colors group-hover:text-[#38bdf8]">
            Глава {prev.number}: {prev.title}
          </p>
          <p className="ch4-kicker mt-2 text-white/45 group-hover:text-[#38bdf8]">
            {prev.subtitle}
          </p>
        </Link>
        {next && (
          <div className="mt-16">
            <p className="ch4-meta text-[#38bdf8]">
              Следующая глава · перезагрузка завершена
            </p>
            <Link
              href={next.href}
              className="group mt-4 inline-block no-underline"
            >
              <p className="ch4-title-sm text-white transition-colors group-hover:text-[#38bdf8]">
                Глава {next.number}: {next.title}
              </p>
              <p className="ch4-kicker mt-2 text-white/45 group-hover:text-[#38bdf8]">
                {next.subtitle}
              </p>
            </Link>
          </div>
        )}
      </div>
    </Chapter4Section>
  );
}
