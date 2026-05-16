"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  CHAPTER_META,
  HISTORICAL_FIGURES,
  INTRO_TEXT,
  CANALS_SECTION,
  SURVIVING_CANALS,
  SHIPYARDS_SECTION,
  FLEET_DATA,
  GRANITE_SECTION,
  CONCLUSION,
} from "@/constants/chapter1";
import type { MuseumFigureId } from "@/constants/chapterReading";
import { HomeLinkButton } from "@/components/chapter/HomeLinkButton";
import {
  BackToTopButton,
  ChapterReadingProvider,
  EraSection,
  FigureCaption,
  GlossaryTerm,
} from "@/components/chapter/ChapterReadingChrome";

gsap.registerPlugin(ScrollTrigger);

const CINEMATIC_EASE: [number, number, number, number] = [
  0.43, 0.13, 0.23, 0.96,
];

const CANAL_FIGURE_IDS: MuseumFigureId[] = [
  "canalWinter",
  "canalSwan",
  "canalMoyka",
  "canalFontanka",
];
const FLEET_FIGURE_IDS: MuseumFigureId[] = [
  "fleetLine",
  "fleetFrigate",
  "fleetGalley",
];

// Historical figure tooltip — портал + fixed (выше stacking context секций с opacity) + задержка закрытия
function HistoricalTooltip({
  figure,
  children,
}: {
  figure: keyof typeof HISTORICAL_FIGURES;
  children: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const data = HISTORICAL_FIGURES[figure];

  const clearLeaveTimer = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  const updatePos = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ top: r.bottom + 10, left: r.left + r.width / 2 });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
    const onScrollOrResize = () => updatePos();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePos]);

  useEffect(() => () => clearLeaveTimer(), [clearLeaveTimer]);

  const scheduleClose = () => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setOpen(false);
      leaveTimerRef.current = null;
    }, 220);
  };

  const portal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open && pos ? (
              <motion.div
                key={figure}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
                className="fixed z-[10000] w-72 max-w-[calc(100vw-1.5rem)] -translate-x-1/2"
                style={{ top: pos.top, left: pos.left }}
                onMouseEnter={clearLeaveTimer}
                onMouseLeave={scheduleClose}
              >
                <div className="tooltip-card relative p-5 shadow-lg">
                  <p className="font-serif font-bold text-foreground text-lg">
                    {data.name}
                  </p>
                  <p className="text-sm text-accent mt-0.5">{data.years}</p>
                  <p className="text-sm mt-3 leading-relaxed text-foreground/80">
                    {data.bio}
                  </p>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#FDFBF7] border-l border-t border-[rgba(139,115,85,0.2)]" />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="golden-underline relative z-10 inline"
        onMouseEnter={() => {
          clearLeaveTimer();
          setOpen(true);
          queueMicrotask(updatePos);
        }}
        onMouseLeave={scheduleClose}
      >
        {children}
      </span>
      {portal}
    </>
  );
}

// Image comparison slider (Before/After)
function ImageComparison({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
  figureId,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
  figureId?: MuseumFigureId;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const endDrag = () => setIsDragging(false);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
    return () => {
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, [isDragging]);

  return (
    <figure className="m-0 w-full">
      <div
        ref={containerRef}
        className="image-frame-corners relative aspect-[4/3] overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After image (full) */}
        <div className="absolute inset-0 z-0">
          <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
        </div>

        {/* Before: ширина клипа = position%; внутренний блок растянут так, чтобы картинка заполняла высоту и левый край */}
        <div
          className="absolute inset-y-0 left-0 z-[2] overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div
            className="absolute left-0 top-0 h-full min-h-0 relative"
            style={{ width: `${(100 / position) * 100}%` }}
          >
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              fill
              className="object-cover object-left"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="comparison-handle z-30"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        />

        {/* Labels */}
        <div className="absolute bottom-4 left-4 z-20 text-box-overlay">
          <p className="text-sm font-serif font-medium text-foreground">
            {beforeLabel}
          </p>
        </div>
        <div className="absolute bottom-4 right-4 z-20 text-box-overlay">
          <p className="text-sm font-serif font-medium text-foreground">
            {afterLabel}
          </p>
        </div>
      </div>
      {figureId ? (
        <FigureCaption figureId={figureId} className="mt-3 px-0.5" />
      ) : null}
    </figure>
  );
}

// Archival scroll for fleet manifest
function FleetManifest() {
  const [selectedShip, setSelectedShip] = useState<number | null>(null);

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      {/* Ship list - archival style */}
      <div className="lg:col-span-4 archival-scroll pl-6 py-4">
        <p className="text-xs uppercase tracking-widest text-accent mb-6">
          Реестр судов
        </p>

        {FLEET_DATA.ships.map((ship, index) => (
          <motion.button
            key={ship.type}
            onClick={() =>
              setSelectedShip(selectedShip === index ? null : index)
            }
            className={`block w-full text-left py-4 border-b border-border/50 last:border-0 transition-all duration-500 pr-6 ${
              selectedShip === index ? "pl-4" : "pl-0"
            }`}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-baseline justify-between">
              <span
                className={`font-serif text-lg transition-colors duration-300 ${
                  selectedShip === index ? "text-accent" : "text-foreground"
                }`}
              >
                {index === 0 ? (
                  <GlossaryTerm id="lineShip">{ship.type}</GlossaryTerm>
                ) : index === 1 ? (
                  <GlossaryTerm id="frigate">{ship.type}</GlossaryTerm>
                ) : (
                  <GlossaryTerm id="galley">{ship.type}</GlossaryTerm>
                )}
              </span>
              <span className="font-serif text-3xl font-bold text-primary">
                {ship.count}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {ship.specification}
            </p>
          </motion.button>
        ))}

        <p className="text-xs text-muted-foreground mt-6 italic leading-relaxed">
          {FLEET_DATA.footnote}
        </p>
      </div>

      {/* Ship detail - large illustration */}
      <div className="lg:col-span-8 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {selectedShip !== null ? (
            <motion.div
              key={selectedShip}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: CINEMATIC_EASE }}
              className="flex flex-col"
            >
              <div className="image-frame-corners relative overflow-hidden">
                <div className="relative aspect-[10/10] w-full max-h-[min(75vh,800px)] bg-muted/10">
                  <Image
                    src={FLEET_DATA.ships[selectedShip].image}
                    alt={FLEET_DATA.ships[selectedShip].type}
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-10 sm:bottom-6 sm:left-6 sm:right-6 text-box-overlay">
                  <p className="text-foreground font-serif text-xl font-medium">
                    {FLEET_DATA.ships[selectedShip].type}
                  </p>
                  <p className="text-foreground/70 text-sm mt-1">
                    {FLEET_DATA.ships[selectedShip].description}
                  </p>
                </div>
              </div>
              <FigureCaption
                figureId={FLEET_FIGURE_IDS[selectedShip]}
                className="mt-4 px-1"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full min-h-[400px] flex items-center justify-center text-center p-12 border-2 border-dashed border-border/30"
            >
              <div>
                <p className="font-serif text-2xl text-muted-foreground/50 italic">
                  Выберите тип судна
                </p>
                <p className="text-sm text-muted-foreground/40 mt-2">
                  для просмотра чертежа
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Granite transformation with clip-path animation
function GraniteTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      end: "bottom 20%",
      scrub: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="image-frame-corners relative aspect-[16/9] w-full overflow-hidden"
    >
      {/* Wooden embankment (before) - always visible */}
      <Image
        src={GRANITE_SECTION.transformation.before.image}
        alt={GRANITE_SECTION.transformation.before.description}
        fill
        className="object-cover scale-x-[-1]"
      />

      {/* Stone embankment (after) - revealed by clip-path */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 0 0 ${100 - progress * 100}%)`,
        }}
      >
        <Image
          src={GRANITE_SECTION.transformation.after.image}
          alt={GRANITE_SECTION.transformation.after.description}
          fill
          className="object-cover scale-x-[-1]"
        />
      </motion.div>

      {/* Period labels with background */}
      <div className="absolute bottom-4 left-4 text-box-overlay">
        <p className="text-sm font-serif font-medium">
          {GRANITE_SECTION.transformation.before.period}
        </p>
        <p className="text-xs text-muted-foreground">Деревянные сваи</p>
      </div>

      <div
        className="absolute bottom-4 right-4 text-box-overlay transition-opacity duration-500"
        style={{ opacity: progress > 0.3 ? 1 : 0 }}
      >
        <p className="text-sm font-serif font-medium">
          {GRANITE_SECTION.transformation.after.period}
        </p>
        <p className="text-xs text-muted-foreground">Гранитные набережные</p>
      </div>
    </div>
  );
}

// Surviving canal card - with proper image frame
function CanalFloat({
  canal,
  index,
  figureId,
}: {
  canal: (typeof SURVIVING_CANALS)[0];
  index: number;
  figureId: MuseumFigureId;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: CINEMATIC_EASE, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <figure className="m-0">
        <div className="image-frame overflow-hidden">
          <Image
            src={canal.image}
            alt={canal.name}
            width={500}
            height={350}
            className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <FigureCaption figureId={figureId} className="mt-2 px-0.5" />
      </figure>

      <div className="px-1 mt-4">
        <p className="text-xs text-accent uppercase tracking-wider">
          {canal.year}
        </p>
        <h4 className="font-serif text-xl font-bold text-foreground mt-1">
          {canal.name}
        </h4>
        <p className="text-foreground/75 text-sm mt-2 leading-relaxed">
          {canal.description}
        </p>
      </div>
    </motion.article>
  );
}

// Industrial location - asymmetric layout
function IndustrialLocation({
  data,
  reverse = false,
  figureId,
}: {
  data: typeof SHIPYARDS_SECTION.admiralty;
  reverse?: boolean;
  figureId: MuseumFigureId;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: CINEMATIC_EASE }}
      viewport={{ once: true, margin: "-50px" }}
      className="grid lg:grid-cols-12 gap-6 items-center"
    >
      {/* Text column */}
      <div
        className={`lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}
      >
        <p className="text-xs text-accent uppercase tracking-widest">
          {data.year}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-2">
          {data.name}
        </h3>
        <p className="text-foreground/80 leading-relaxed mt-4">
          {data.description}
        </p>
      </div>

      {/* Image column */}
      <div
        className={`lg:col-span-6 ${reverse ? "lg:order-1" : "lg:col-start-7"}`}
      >
        <figure className="m-0">
          <div className="image-frame-corners">
            <Image
              src={data.image}
              alt={data.name}
              width={700}
              height={450}
              className="w-full h-auto"
            />
          </div>
          <FigureCaption figureId={figureId} className="mt-3" />
        </figure>
      </div>
    </motion.div>
  );
}

// Decorative ornament SVG
function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={`w-32 h-5 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10h45M75 10h45M52 10a8 8 0 1016 0 8 8 0 10-16 0"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <circle cx="60" cy="10" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export default function ChapterOnePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  return (
    <ChapterReadingProvider>
      <main className="paper-texture min-h-screen">
        <HomeLinkButton className="border-[#262626] bg-[#FAF8F3] text-[#262626] hover:border-[#B8860B] hover:text-[#B8860B] focus-visible:outline-[#B8860B]" />
        <BackToTopButton />
        {/* ========================================
          HERO SECTION - Fades to texture
          ======================================== */}
        <EraSection
          ref={heroRef}
          id="chapter-top"
          eraKey="hero"
          /* Изменено: h-[70dvh] вместо min-h-[100dvh] */
          className="relative h-[70dvh] overflow-hidden bg-[#FAF8F3]"
        >
          {/* Фон первого сектора — теперь он автоматически растянется на 70% высоты родителя */}
          <motion.div
            style={{ scale: heroScale }}
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden
          >
            <Image
              src="/assets/ch1/ch1_hero_engraving.jpg"
              alt=""
              fill
              className="object-cover object-center [filter:sepia(12%)_contrast(1.04)_saturate(0.92)]"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Градиент затухания — он подстроится под новую высоту в 70% */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(250,248,243,0.2)_0%,transparent_38%,transparent_52%,rgba(250,248,243,0.65)_78%,#faf8f3_100%)]"
            aria-hidden
          />

          {/* Контейнер с контентом */}
          <div className="relative z-10 flex h-[70dvh] flex-col">
            {" "}
            {/* Изменено: h-[70dvh] */}
            <motion.div
              style={{ opacity: heroOpacity }}
              className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.25 }}
                className="max-w-3xl font-black"
              >
                <p className="text-accent font-black tracking-[0.3em] uppercase text-md">
                  Глава {CHAPTER_META.number}
                </p>
                <h1 className="font-serif text-6xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 text-balance">
                  {CHAPTER_META.title}
                </h1>
                <p className="text-xl md:text-xl max-w-xl mx-auto mt-4 font-serif italic leading-snug">
                  {CHAPTER_META.subtitle}
                </p>
                <div
                  className="chapter-rule mt-8 max-w-xs mx-auto opacity-90"
                  aria-hidden
                />
              </motion.div>
            </motion.div>
            {/* Индикатор скролла — теперь он будет внизу 70%-й зоны */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="w-px h-10 bg-gradient-to-b from-accent to-transparent mx-auto"
              />
            </motion.div>
          </div>
        </EraSection>

        {/* ========================================
          INTRODUCTION
          ======================================== */}
        <EraSection
          id="intro"
          eraKey="intro"
          className="max-w-3xl mx-auto px-6 py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
          >
            <Ornament className="text-accent mx-auto mb-8" />
            <p className="text-lg md:text-xl leading-relaxed text-foreground drop-cap">
              {INTRO_TEXT.replace("Петром I", "")}
              <HistoricalTooltip figure="peterI">
                Петром I
              </HistoricalTooltip>{" "}
              как создание крупнейшего военного и торгового узла Балтики.
            </p>
          </motion.div>

          <div className="paper-texture py-6" aria-hidden>
            <div className="ledger-divider" />
          </div>
        </EraSection>

        {/* ========================================
          CANALS SECTION
          ======================================== */}
        <EraSection
          id="canals"
          eraKey="canals"
          className="max-w-6xl mx-auto px-6 py-12"
        >
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-3xl md:text-4xl font-black text-foreground">
                  {CANALS_SECTION.title}
                </h2>

                <p className="text-foreground/85 leading-relaxed mt-6 drop-cap-gold">
                  Одной из самых смелых идей{" "}
                  <HistoricalTooltip figure="peterI">Петра I</HistoricalTooltip>{" "}
                  было превращение Васильевского острова в{" "}
                  <GlossaryTerm id="venice">«русскую Венецию»</GlossaryTerm>.
                  Согласно{" "}
                  <GlossaryTerm id="generalPlan">
                    генеральному плану
                  </GlossaryTerm>{" "}
                  <HistoricalTooltip figure="trezzini">
                    Доменико Трезини
                  </HistoricalTooltip>
                  , утверждённому в 1715–1716 годах, остров должен был пересечь
                  сеть параллельных каналов.
                </p>
              </motion.div>

              {/* Canal purposes */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.15 }}
                viewport={{ once: true }}
                className="text-foreground/85 leading-relaxed mt-8"
              >
                Каналы решали три ключевые задачи.{" "}
                <span className="text-accent font-semibold">Логистическую</span>{" "}
                — доставка товаров от судов непосредственно к домам купцов и
                складам.{" "}
                <span className="text-accent font-semibold">
                  <GlossaryTerm id="melioration">Мелиоративную</GlossaryTerm>
                </span>{" "}
                — осушение болотистой почвы острова путём отвода лишней воды. И{" "}
                <span className="text-accent font-semibold">
                  противопожарную
                </span>{" "}
                — каналы служили естественной преградой для распространения
                огня.
              </motion.p>

              {/* Image comparison: Trezzini plan vs modern */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE }}
                viewport={{ once: true }}
                className="mt-10"
              >
                <ImageComparison
                  beforeSrc="/assets/ch1/ch1_trezzini_plan.jpg"
                  afterSrc="/assets/ch1/ch1_modern.jpg"
                  beforeLabel="План Трезини, 1716"
                  afterLabel="Современный вид"
                  beforeAlt="Генеральный план Трезини"
                  afterAlt="Современный Васильевский остров"
                  figureId="compareCanalPlan"
                />
                <p className="text-sm text-muted-foreground mt-3 italic text-center">
                  Перетащите ползунок для сравнения
                </p>
              </motion.div>

              {/* Failure text */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE }}
                viewport={{ once: true }}
                className="text-foreground/85 leading-relaxed mt-10"
              >
                К середине столетия было вырыто лишь около половины
                запланированных артерий. При{" "}
                <HistoricalTooltip figure="catherineII">
                  Екатерине II
                </HistoricalTooltip>{" "}
                каналы засыпали, а на их месте проложили знаменитые{" "}
                <GlossaryTerm id="linii">«линии»</GlossaryTerm> — улицы,
                сохранившие сетчатую планировку.
              </motion.p>
            </div>

            {/* Marginalia */}
            <aside className="lg:col-span-4 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.3 }}
                viewport={{ once: true }}
                className="sticky top-32 lg:top-36"
              >
                <div className="marginalia-handwritten transform -rotate-1 p-4 border-l-2 border-accent/30">
                  <p className="text-lg leading-relaxed">
                    {CANALS_SECTION.marginNote}
                  </p>
                </div>
              </motion.div>
            </aside>
          </div>
        </EraSection>

        {/* ========================================
          SURVIVING CANALS
          ======================================== */}
        <EraSection
          id="canals-surviving"
          eraKey="surviving"
          className="max-w-6xl mx-auto px-6 py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Сохранившиеся водные артерии
            </h3>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Немногие каналы дошли до наших дней, став украшением исторического
              центра
            </p>
          </motion.div>

          {/* Asymmetric grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            <div className="lg:col-span-5">
              <CanalFloat
                canal={SURVIVING_CANALS[0]}
                index={0}
                figureId={CANAL_FIGURE_IDS[0]}
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-7 lg:mt-16">
              <CanalFloat
                canal={SURVIVING_CANALS[1]}
                index={1}
                figureId={CANAL_FIGURE_IDS[1]}
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-2">
              <CanalFloat
                canal={SURVIVING_CANALS[2]}
                index={2}
                figureId={CANAL_FIGURE_IDS[2]}
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:mt-8">
              <CanalFloat
                canal={SURVIVING_CANALS[3]}
                index={3}
                figureId={CANAL_FIGURE_IDS[3]}
              />
            </div>
          </div>
        </EraSection>

        {/* ========================================
          SHIPYARDS
          ======================================== */}
        <EraSection
          id="shipyards"
          eraKey="shipyards"
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
            className="max-w-3xl mb-12"
          >
            <Ornament className="text-accent mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-black text-foreground">
              {SHIPYARDS_SECTION.title}
            </h2>
            <p className="text-foreground/85 leading-relaxed mt-5 drop-cap">
              {(() => {
                const needle = "Балтийского флота";
                const parts = SHIPYARDS_SECTION.intro.split(needle);
                if (parts.length < 2) return SHIPYARDS_SECTION.intro;
                return (
                  <>
                    {parts[0]}
                    <GlossaryTerm id="balticFleet">{needle}</GlossaryTerm>
                    {parts.slice(1).join(needle)}
                  </>
                );
              })()}
            </p>
          </motion.div>

          <div className="space-y-16">
            <IndustrialLocation
              data={SHIPYARDS_SECTION.admiralty}
              figureId="admiralty"
            />
            <IndustrialLocation
              data={SHIPYARDS_SECTION.kronstadt}
              reverse
              figureId="kronstadt"
            />
          </div>
        </EraSection>

        {/* ========================================
          FLEET MANIFEST
          ======================================== */}
        <EraSection
          id="fleet"
          eraKey="fleet"
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-accent text-sm uppercase tracking-widest">
              {FLEET_DATA.subtitle}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-black text-foreground mt-2">
              {FLEET_DATA.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
          >
            <FleetManifest />
          </motion.div>
        </EraSection>

        {/* ========================================
          GRANITE SECTION
          ======================================== */}
        <EraSection
          id="granite"
          eraKey="granite"
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE }}
                viewport={{ once: true }}
              >
                <p className="text-accent text-sm uppercase tracking-widest">
                  {GRANITE_SECTION.subtitle}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-black text-foreground mt-2">
                  {GRANITE_SECTION.title}
                </h2>
                <p className="text-foreground/85 leading-relaxed mt-5 drop-cap">
                  {(() => {
                    const [ga, gb] = GRANITE_SECTION.intro.split("набережные");
                    return (
                      <>
                        {ga}
                        <GlossaryTerm id="embankment">набережные</GlossaryTerm>
                        {gb}
                      </>
                    );
                  })()}
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: CINEMATIC_EASE }}
                viewport={{ once: true }}
              >
                <GraniteTransformation />
                <FigureCaption
                  figureId="graniteTransform"
                  className="mt-3 px-0.5"
                />
                <p className="text-sm text-muted-foreground mt-2 italic text-center">
                  Прокрутите для преображения набережной
                </p>
              </motion.div>
            </div>
          </div>

          {/* Trade statistics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
            className="mt-16 grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {GRANITE_SECTION.trade.title}
              </h3>
              <p className="text-foreground/85 leading-relaxed mt-4">
                {GRANITE_SECTION.trade.text}
              </p>

              {/* Stats */}
              <div className="mt-6 space-y-4">
                {GRANITE_SECTION.trade.stats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-4">
                    <span className="font-serif text-3xl font-black text-accent">
                      {stat.value}
                    </span>
                    <div>
                      <p className="text-foreground font-medium">
                        {stat.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <figure className="m-0">
                <div className="image-frame-corners">
                  <Image
                    src={GRANITE_SECTION.trade.image}
                    alt="Торговый порт Петербурга"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
                <FigureCaption figureId="tradePort" className="mt-3" />
              </figure>
            </div>
          </motion.div>
        </EraSection>

        {/* ========================================
          CONCLUSION
          ======================================== */}
        <EraSection
          id="conclusion"
          eraKey="conclusion"
          className="max-w-3xl mx-auto px-6 py-16 anchor-decoration"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Ornament className="text-accent mx-auto mb-8" />

            <p className="font-serif text-xl md:text-2xl text-foreground/90 leading-relaxed italic">
              {CONCLUSION.text}
            </p>

            <Ornament className="text-accent mx-auto mt-8" />
          </motion.div>

          {/* Next chapter teaser */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: CINEMATIC_EASE, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground uppercase tracking-widest">
              Следующая глава
            </p>
            <Link
              href={CONCLUSION.nextChapter.href ?? "/chapter-2"}
              className="group mt-2 inline-block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <p className="font-serif text-2xl md:text-3xl font-bold text-foreground transition-colors group-hover:text-accent">
                Глава {CONCLUSION.nextChapter.number}:{" "}
                {CONCLUSION.nextChapter.title}
              </p>
              <p className="text-accent italic mt-1 group-hover:underline">
                {CONCLUSION.nextChapter.subtitle}
              </p>
            </Link>
          </motion.div>
        </EraSection>

        {/* Footer spacer */}
        <div className="h-16" />
      </main>
    </ChapterReadingProvider>
  );
}
