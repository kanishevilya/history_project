"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CH2_GLOSSARY, type Ch2GlossaryId } from "@/constants/chapter2Reading";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

export type EditorialFigure = {
  name: string;
  years: string;
  title: string;
  bio: string;
};

function usePortalTooltip() {
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

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
    const on = () => updatePos();
    window.addEventListener("scroll", on, true);
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on, true);
      window.removeEventListener("resize", on);
    };
  }, [open, updatePos]);

  const scheduleClose = () => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setOpen(false);
      leaveTimerRef.current = null;
    }, 220);
  };

  const bind = {
    onMouseEnter: () => {
      clearLeaveTimer();
      setOpen(true);
      queueMicrotask(updatePos);
    },
    onMouseLeave: scheduleClose,
    onFocus: () => {
      clearLeaveTimer();
      setOpen(true);
      queueMicrotask(updatePos);
    },
    onBlur: scheduleClose,
  };

  return {
    triggerRef,
    mounted,
    open,
    pos,
    clearLeaveTimer,
    scheduleClose,
    bind,
  };
}

export function FigureTooltip({
  data,
  children,
}: {
  data: EditorialFigure;
  children: React.ReactNode;
}) {
  const t = usePortalTooltip();

  const portal =
    t.mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {t.open && t.pos ? (
              <motion.div
                key={data.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="ch2-tooltip-panel fixed z-[10000] w-72 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 p-4"
                style={{ top: t.pos.top, left: t.pos.left }}
                onMouseEnter={t.clearLeaveTimer}
                onMouseLeave={t.scheduleClose}
              >
                <p className="ch2-tooltip-title font-serif text-lg font-bold">
                  {data.name}
                </p>
                <p className="ch2-tooltip-meta mt-0.5 text-sm">{data.years}</p>
                <p className="ch2-tooltip-label mt-1 font-mono text-[10px] uppercase tracking-wider">
                  {data.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  {data.bio}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        ref={t.triggerRef}
        className="ch2-tooltip-trigger cursor-help"
        {...t.bind}
      >
        {children}
      </span>
      {portal}
    </>
  );
}

export function GlossaryTerm({
  id,
  children,
}: {
  id: Ch2GlossaryId;
  children: React.ReactNode;
}) {
  const t = usePortalTooltip();
  const data = CH2_GLOSSARY[id];

  const portal =
    t.mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {t.open && t.pos ? (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="ch2-tooltip-panel fixed z-[10000] w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2 p-4 text-left"
                style={{ top: t.pos.top, left: t.pos.left }}
                onMouseEnter={t.clearLeaveTimer}
                onMouseLeave={t.scheduleClose}
                role="tooltip"
              >
                <span className="ch2-tooltip-title block font-serif font-semibold">
                  {data.term}
                </span>
                <span className="mt-2 block text-sm leading-relaxed">
                  {data.definition}
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
        ref={t.triggerRef}
        className="ch2-tooltip-trigger relative z-10 inline cursor-help"
        {...t.bind}
        tabIndex={0}
      >
        {children}
      </span>
      {portal}
    </>
  );
}
