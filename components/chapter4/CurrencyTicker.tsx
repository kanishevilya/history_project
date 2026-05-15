"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function CurrencyTicker({
  amount,
  label,
  year,
}: {
  amount: number;
  label: string;
  year: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.floor(amount * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, amount]);

  return (
    <div
      ref={ref}
      className="mt-16 border-t-2 border-white/25 pt-10"
    >
      <p className="ch4-meta text-white/45">
        {label} · {year}
      </p>
      <motion.p
        className="ch4-matrix mt-4 text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
        initial={{ opacity: 0.15 }}
        animate={inView ? { opacity: 1 } : { opacity: 0.15 }}
        transition={{ duration: 0.3 }}
      >
        {formatUsd(display)}
      </motion.p>
    </div>
  );
}
