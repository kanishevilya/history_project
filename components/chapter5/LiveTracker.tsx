"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function LiveTracker({
  teuValue,
  teuUnit,
  period,
  routeLabel,
  ports,
}: {
  teuValue: string;
  teuUnit: string;
  period: string;
  routeLabel: string;
  ports: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const [lit, setLit] = useState(false);

  useEffect(() => {
    if (inView) setLit(true);
  }, [inView]);

  return (
    <div ref={ref} className="ch5-terminal">
      <div className="border-b border-[#00e5ff]/30 px-4 py-2">
        <p className="ch5-meta text-[#00e5ff]">LIVE · STAT_TERMINAL</p>
      </div>
      <div className="ch5-terminal-inset">
        <p className={`ch5-teu transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-30"}`}>
          {teuValue}
          <span className="ml-3 text-[0.45em] tracking-widest">{teuUnit}</span>
        </p>
        <p className="ch5-meta mt-3 text-[#94a3b8]">{period}</p>
        <p className="ch5-meta mt-6 text-[#64748b]">{routeLabel}</p>
        <p className="ch5-route mt-2 leading-relaxed">
          {ports.map((port, i) => (
            <span key={port}>
              {i > 0 && <span className="ch5-route-arrow"> ➔ </span>}
              <span>[{port.toUpperCase()}]</span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
