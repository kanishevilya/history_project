"use client";

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CHAPTER_DECADES,
  SECTION_ERA,
  decadeOverlapsSection,
  GLOSSARY,
  MUSEUM_FIGURES,
  TIMELINE_SCROLL_ORDER,
  type GlossaryId,
  type MuseumFigureId,
} from "@/constants/chapterReading";

const CINEMATIC_EASE: [number, number, number, number] = [
  0.43, 0.13, 0.23, 0.96,
];

type TimelineContextValue = {
  activeDecade: number | null;
  setActiveDecade: (v: number | null) => void;
};

const TimelineContext = createContext<TimelineContextValue | null>(null);

export function useChapterTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx)
    throw new Error(
      "useChapterTimeline must be used within ChapterReadingProvider",
    );
  return ctx;
}

export function ChapterReadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeDecade, setActiveDecade] = useState<number | null>(null);
  const value = useMemo(
    () => ({ activeDecade, setActiveDecade }),
    [activeDecade],
  );
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

function scrollToFirstDecadeMatch(decadeStart: number) {
  requestAnimationFrame(() => {
    for (const { elementId, eraKey } of TIMELINE_SCROLL_ORDER) {
      if (decadeOverlapsSection(decadeStart, SECTION_ERA[eraKey])) {
        document
          .getElementById(elementId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  });
}

export function DecadeTimelineBar() {
  const { activeDecade, setActiveDecade } = useChapterTimeline();

  return (
    <div
      className="sticky top-0 z-40 border-b border-border/60 bg-[#FAF8F3]/95 backdrop-blur-md shadow-sm"
      role="navigation"
      aria-label="Фильтр по декадам XVIII века"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
        <button
          type="button"
          onClick={() => setActiveDecade(null)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium tracking-wide transition-colors ${
            activeDecade === null
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
          aria-pressed={activeDecade === null}
        >
          Все эпохи
        </button>
        <span
          className="hidden sm:inline text-border select-none px-1"
          aria-hidden
        >
          |
        </span>
        {CHAPTER_DECADES.map((d) => {
          const on = activeDecade === d.start;
          return (
            <button
              key={d.start}
              type="button"
              aria-pressed={on}
              onClick={() => {
                setActiveDecade(d.start);
                scrollToFirstDecadeMatch(d.start);
              }}
              className={`rounded-md px-2 py-1 text-xs tabular-nums transition-colors ${
                on
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-foreground/80 hover:bg-secondary"
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    document
      .getElementById("chapter-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: CINEMATIC_EASE }}
          onClick={goTop}
          className="fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="К началу главы"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function GlossaryTerm({
  id,
  children,
}: {
  id: GlossaryId;
  children: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const data = GLOSSARY[id];

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
    return () => clearLeaveTimer();
  }, [clearLeaveTimer]);

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
                key={id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
                className="fixed z-[10000] w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2"
                style={{ top: pos.top, left: pos.left }}
                onMouseEnter={clearLeaveTimer}
                onMouseLeave={scheduleClose}
              >
                <span className="tooltip-card block p-4 text-left shadow-lg">
                  <span className="block font-serif font-semibold text-foreground">
                    {data.term}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-foreground/85">
                    {data.definition}
                  </span>
                </span>
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
        className="glossary-term relative z-10 inline cursor-help border-b border-dotted border-accent/70 decoration-accent/60"
        onMouseEnter={() => {
          clearLeaveTimer();
          setOpen(true);
          queueMicrotask(updatePos);
        }}
        onMouseLeave={scheduleClose}
        onFocus={() => {
          clearLeaveTimer();
          setOpen(true);
          queueMicrotask(updatePos);
        }}
        onBlur={() => {
          scheduleClose();
        }}
        tabIndex={0}
      >
        {children}
      </span>
      {portal}
    </>
  );
}

export function FigureCaption({
  figureId,
  className = "",
}: {
  figureId: MuseumFigureId;
  className?: string;
}) {
  const c = MUSEUM_FIGURES[figureId];
  return (
    <figcaption className={`figure-caption-museum ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-t border-border/50 pt-2.5">
        {c.inventoryLabel && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {c.inventoryLabel}
          </span>
        )}
        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {c.period}
        </span>
      </div>
      <p className="mt-1.5 text-sm italic leading-relaxed text-foreground/75">
        {c.line}
      </p>
    </figcaption>
  );
}

export const EraSection = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"section"> & {
    eraKey: keyof typeof SECTION_ERA;
  }
>(function EraSection({ eraKey, className = "", children, ...rest }, ref) {
  const { activeDecade } = useChapterTimeline();

  const dim =
    activeDecade !== null &&
    !decadeOverlapsSection(activeDecade, SECTION_ERA[eraKey]);

  return (
    <section
      ref={ref}
      {...rest}
      className={`transition-[opacity,filter] duration-500 ease-out ${
        dim
          ? "opacity-[0.32] saturate-[0.45] pointer-events-none"
          : "opacity-100 saturate-100"
      } ${className}`}
    >
      {children}
    </section>
  );
});

EraSection.displayName = "EraSection";
