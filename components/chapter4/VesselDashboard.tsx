"use client";

import { useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
  label: string;
  image: string;
  alt: string;
};

export function VesselDashboard({
  text,
  projects,
}: {
  text: string;
  projects: Project[];
}) {
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");

  const active = projects.find((p) => p.id === activeId) ?? projects[0];

  return (
    <div className="ch4-plate-divider grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="lg:pr-6">
        <p className="ch4-meta mb-4">Пульт СУДС · конструктив</p>
        <p className="ch4-note ch4-body max-w-none border-black">{text}</p>
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-0 border-2 border-black">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`ch4-toggle rounded-none border-0 border-b-2 border-black last:border-b-0 ${
                activeId === p.id ? "ch4-toggle--active" : ""
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="ch4-blueprint ch4-blueprint-active relative aspect-[4/3] w-full">
          {projects.map((p) => (
            <Image
              key={p.id}
              src={p.image}
              alt={p.alt}
              fill
              className="object-contain object-center p-4 transition-opacity duration-100"
              style={{ opacity: active?.id === p.id ? 1 : 0 }}
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          ))}
          <div
            className="pointer-events-none absolute inset-0 border border-[#f97316]/30"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
