"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HOME_ERA_CONFIG,
  CHAPTER_SWITCHER,
  type EraId,
  type MapNode,
} from "@/constants/homeMap";
import { HOME_BEFORE_MAP, HOME_AFTER_MAP } from "@/constants/homeIntro";
import "@/app/home-gis.css";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export default function HomeGISDashboard() {
  const [eraId, setEraId] = useState<EraId>("1725");
  const [selected, setSelected] = useState<MapNode | null>(null);

  const era = useMemo(
    () => HOME_ERA_CONFIG.find((e) => e.id === eraId) ?? HOME_ERA_CONFIG[0],
    [eraId],
  );

  const onEraChange = useCallback((id: EraId) => {
    setEraId(id);
    setSelected(null);
  }, []);

  return (
    <div className="home-gis home-gis-shell min-h-screen">
      <header className="border-b border-[#D4CFC0]">
        <div className="grid min-h-[auto] grid-cols-[3rem_1fr] pl-12 md:grid-cols-[3.5rem_1fr]">
          <aside className="home-gis-gutter flex justify-center py-8">
            <span className="home-gis-tag sticky top-24 text-[11px]">
              [ГЛАВНЫЙ УЗЕЛ ПОРТА]
            </span>
          </aside>
          <div className="home-gis-manifest pr-4 pb-10 pt-10 md:pr-12 lg:pr-16">
            <p className="home-gis-terminal mb-4 uppercase text-[#8B7355]">
              Хронология · Санкт-Петербург · Нева и Балтика
            </p>
            <h1 className="home-gis-title text-3xl font-black uppercase leading-none tracking-tight text-[#1B365D] md:text-5xl md:tracking-tighter">
              Основание Санкт-Петербурга изменило историю страны
            </h1>
            <p className="home-gis-prose home-gis-prose--lead mt-8 max-w-3xl text-lg md:text-xl">
              Новый город стал портом, верфью и морскими воротами России в
              Европу.
            </p>

            <div className="chapter-rule mx-0 mb-12 mt-10 max-w-md" />

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">
              {CHAPTER_SWITCHER.map((ch) => (
                <Link
                  key={ch.n}
                  href={ch.href}
                  className={`group border border-[#D4CFC0] bg-[#FDFBF7] p-4 transition-colors hover:border-[#B8860B] hover:shadow-none ${
                    ch.priority ? "md:col-span-2" : ""
                  } ${ch.priority ? "home-gis-priority-ring bg-[#FFFCF8]" : ""}`}
                >
                  {ch.priority && (
                    <p className="home-gis-terminal mb-2 text-[10px] font-semibold uppercase text-[#B8860B]">
                      [Приоритетный маршрут]
                    </p>
                  )}
                  <p className="home-gis-terminal text-[10px] uppercase text-[#5A6C7D]">
                    {ch.tech}
                  </p>
                  <p className="mt-3 font-serif text-base font-black uppercase tracking-tight text-[#1B365D] group-hover:text-[#B8860B] md:text-lg">
                    {ch.title}
                  </p>
                  <p className="home-gis-terminal mt-2 text-[10px] text-[#5A6C7D]">
                    {ch.subtitle}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/sources"
                className="home-gis-terminal inline-flex items-center gap-2 border-2 border-[#1B365D] bg-[#FDFBF7] px-5 py-3 uppercase text-[#1B365D] no-underline transition-colors hover:border-[#B8860B] hover:bg-[#FFFCF8] hover:text-[#B8860B]"
              >
                Источники и материалы →
              </Link>
              <p className="home-gis-terminal max-w-md text-[10px] normal-case leading-relaxed text-[#5A6C7D]">
                Архивы, литература, карты и сноски к текстам глав
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-[#D4CFC0] py-12 md:py-16">
        <div className="grid grid-cols-[3rem_1fr] pl-12 md:grid-cols-[3.5rem_1fr]">
          <aside className="home-gis-gutter flex justify-center py-4">
            <span className="home-gis-tag sticky top-24 opacity-90">
              [СЛОЙ КАРТЫ]
            </span>
          </aside>
          <div className="min-w-0 pr-4 md:pr-8 lg:pr-14">
            <div className="mb-12 max-w-4xl space-y-5">
              {HOME_BEFORE_MAP.lines.map((line, i) =>
                line.trim() === "" ? (
                  <div key={`sp-${i}`} className="h-2" />
                ) : (
                  <p
                    key={`l-${i}`}
                    className={
                      line.startsWith(`Основание`) ||
                      line.startsWith(`Эта карта`)
                        ? "home-gis-prose text-lg font-medium text-[#1B365D]"
                        : "home-gis-prose"
                    }
                  >
                    {line}
                  </p>
                ),
              )}
            </div>

            <p className="home-gis-terminal uppercase text-[#8B7355]">
              Интерактивная хронология
            </p>

            <div className="mt-4 flex flex-wrap gap-0 border border-[#D4CFC0] bg-[#FDFBF7] md:inline-flex md:flex-nowrap">
              {HOME_ERA_CONFIG.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => onEraChange(e.id)}
                  className={`home-gis-terminal shrink-0 border-b border-[#D4CFC0] px-4 py-3 text-left last:border-b-0 md:border-b-0 md:border-r md:border-[#D4CFC0] md:last:border-r-0 ${
                    eraId === e.id
                      ? "bg-[#1B365D] text-[#FAF8F3]"
                      : "text-[#2C3E50] hover:bg-[#F0EDE4]"
                  }`}
                >
                  [{e.label}]
                  <span className="ml-2 hidden text-[9px] opacity-75 lg:inline">
                    · гл.{e.chapter}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-0 lg:flex-row lg:items-stretch">
              <div className="relative w-full lg:w-[70%] lg:shrink-0">
                <div className="relative aspect-video w-full overflow-hidden border-2 border-[#1B365D] bg-[#e8e4dc] shadow-[inset_0_0_0_1px_rgba(184,134,11,0.25)]">
                  {HOME_ERA_CONFIG.map((layer) => (
                    <motion.div
                      key={layer.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: eraId === layer.id ? 1 : 0 }}
                      transition={{ duration: 0.75, ease: "easeInOut" }}
                    >
                      <Image
                        src={layer.mapSrc}
                        alt={layer.mapAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 70vw"
                        priority={layer.id === "1725"}
                      />
                    </motion.div>
                  ))}
                  <div
                    className="pointer-events-none absolute inset-0 home-gis-map-grid"
                    style={{
                      backgroundImage:
                        "linear-gradient(#1b365d 1px, transparent 1px), linear-gradient(90deg, #1b365d 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                    aria-hidden
                  />

                  {era.nodes.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setSelected(node)}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2"
                      style={{
                        left: `${node.leftPct}%`,
                        top: `${node.topPct}%`,
                      }}
                      aria-label={node.name}
                      title={node.name}
                    >
                      <span
                        className={`home-gis-pin-wrap relative ${
                          selected?.id === node.id
                            ? "home-gis-pin-wrap--selected"
                            : ""
                        }`}
                      >
                        <span className="home-gis-pin-core" />
                      </span>
                    </button>
                  ))}
                </div>
                <p className="home-gis-terminal mt-3 uppercase text-[#5A6C7D]">
                  Карта: {era.mapAlt} · объектов: {era.nodes.length}
                </p>
              </div>

              <div
                className={`flex min-h-[320px] flex-1 flex-col border border-t-0 border-[#D4CFC0] bg-[#FDFBF7] lg:min-h-0 lg:border-l-0 lg:border-t lg:border-[#D4CFC0] ${
                  selected ? "home-gis-sidebar-active" : ""
                }`}
              >
                <div className="border-b border-[#D4CFC0] bg-[#F0EDE4] px-4 py-2">
                  <p className="home-gis-terminal uppercase text-[#5A6C7D]">
                    Справка по объекту
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <AnimatePresence mode="wait">
                    {!selected ? (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="home-gis-terminal uppercase leading-relaxed text-[#5A6C7D]"
                      >
                        Система готова. Выберите метку на карте.
                      </motion.div>
                    ) : (
                      <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="flex flex-1 flex-col"
                      >
                        <h2 className="home-gis-title text-lg font-bold uppercase leading-tight tracking-tight text-[#1B365D]">
                          {selected.name}
                        </h2>
                        <p className="home-gis-terminal mt-4 uppercase text-[#B8860B]">
                          Период: {selected.period}
                        </p>
                        <div className="mt-3 border-l-[3px] border-[#EA580C] pl-4">
                          <p className="home-gis-terminal mb-2 uppercase text-[#5A6C7D]">
                            Техническое значение
                          </p>
                          <p className="text-sm leading-relaxed text-[#2C3E50] md:text-[0.95rem]">
                            {selected.technicalImpact}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelected(null)}
                          className="home-gis-terminal mt-auto border border-[#D4CFC0] bg-transparent px-3 py-2 text-left uppercase text-[#5A6C7D] transition-colors hover:border-[#B8860B] hover:text-[#1B365D]"
                        >
                          Сбросить выбор
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-16 max-w-4xl space-y-8 border-t border-[#D4CFC0] pt-12">
              {HOME_AFTER_MAP.paragraphs.map((p, i) => (
                <p key={i} className="home-gis-prose text-[1.03rem]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="home-gis-terminal border-t border-[#D4CFC0] px-6 py-8 pl-[calc(3rem+3rem)] text-center uppercase text-[10px] text-[#8B7355] md:pl-[calc(3.5rem+3rem)]">
        Навигационный стол проекта · Судоходная история Санкт-Петербурга
      </footer>
    </div>
  );
}
