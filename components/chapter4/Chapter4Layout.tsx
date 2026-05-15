"use client";

import type { ReactNode } from "react";

type GutterVariant = "default" | "warn" | "neon";

export function Chapter4Section({
  gutter,
  gutterVariant = "default",
  timeline,
  children,
  className = "",
  zone = "paper",
}: {
  gutter: string;
  gutterVariant?: GutterVariant;
  timeline?: string[];
  children: ReactNode;
  className?: string;
  zone?: "paper" | "dark" | "inverted";
}) {
  const zoneClass =
    zone === "dark" ? "ch4-dark-zone" : zone === "inverted" ? "ch4-inverted" : "ch4-paper";

  const tagClass =
    gutterVariant === "warn"
      ? "ch4-gutter-tag ch4-gutter-tag--warn"
      : gutterVariant === "neon"
        ? "ch4-gutter-tag ch4-gutter-tag--neon"
        : "ch4-gutter-tag";

  return (
    <section className={`${zoneClass} border-t border-black py-12 md:py-16 ${className}`}>
      <div className="grid pl-12 grid-cols-[2.75rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)]">
        <aside className="ch4-gutter relative">
          <span className={tagClass}>{gutter}</span>
          {timeline && timeline.length > 0 && (
            <>
              <div className="ch4-timeline hidden md:block" aria-hidden />
              {timeline.map((year, i) => (
                <span
                  key={year}
                  className="ch4-timeline-dot hidden md:block"
                  style={{ top: `${18 + i * 22}%` }}
                  aria-hidden
                />
              ))}
              <div className="ch4-mono absolute bottom-8 left-0 hidden flex-col gap-8 text-[0.5rem] tracking-widest md:flex">
                {timeline.map((year) => (
                  <span key={year} className="block -rotate-90 whitespace-nowrap">
                    {year}
                  </span>
                ))}
              </div>
            </>
          )}
        </aside>
        <div className="min-w-0 pr-4 md:pr-8 lg:pr-12">{children}</div>
      </div>
    </section>
  );
}
