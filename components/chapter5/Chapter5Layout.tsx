"use client";

import type { ReactNode } from "react";

export function Chapter5Section({
  gutter,
  children,
  className = "",
  zone = "light",
}: {
  gutter: string;
  children: ReactNode;
  className?: string;
  zone?: "light" | "arctic";
}) {
  const zoneClass = zone === "arctic" ? "ch5-arctic" : "ch5-light";

  return (
    <section
      className={`${zoneClass} ch5-grid-bg border-t border-[#0f172a] py-14 md:py-20 ${className}`}
    >
      <div className="grid pl-12 grid-cols-[2.75rem_minmax(0,1fr)] md:grid-cols-[3.5rem_minmax(0,1fr)]">
        <aside className="ch5-gutter relative">
          <span className="ch5-gutter-tag">{gutter}</span>
        </aside>
        <div className="min-w-0 pr-4 md:pr-8 lg:pr-14">{children}</div>
      </div>
    </section>
  );
}
