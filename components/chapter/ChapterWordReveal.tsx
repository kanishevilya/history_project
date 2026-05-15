"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];
const WORD_DELAY = 0.038;

type RevealPart = string | React.ReactNode;

function WordToken({
  word,
  index,
  inView,
}: {
  word: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{
        duration: 0.42,
        delay: index * WORD_DELAY,
        ease: EASE,
      }}
    >
      {word}
      &nbsp;
    </motion.span>
  );
}

/** Появление текста по словам при прокрутке (как в главе I). */
export function RevealWords({
  text,
  className = "",
  dropCap = false,
}: {
  text: string;
  className?: string;
  dropCap?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  const words = text.trim().split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={`${dropCap ? "drop-cap" : ""} ${className}`.trim()}>
      {words.map((word, i) => (
        <WordToken key={`${word}-${i}`} word={word} index={i} inView={inView} />
      ))}
    </p>
  );
}

/** Абзац со вставками (глоссарий, персонажи) — единая очередь слов. */
export function RevealParagraph({
  parts,
  className = "",
  dropCap = false,
}: {
  parts: RevealPart[];
  className?: string;
  dropCap?: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  let wordIndex = 0;

  return (
    <p ref={ref} className={`${dropCap ? "drop-cap" : ""} ${className}`.trim()}>
      {parts.map((part, partIndex) => {
        if (typeof part !== "string") {
          return (
            <span key={`node-${partIndex}`} className="inline">
              {part}
            </span>
          );
        }
        return part
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => {
            const idx = wordIndex++;
            return (
              <WordToken
                key={`${partIndex}-${word}-${idx}`}
                word={word}
                index={idx}
                inView={inView}
              />
            );
          });
      })}
    </p>
  );
}
