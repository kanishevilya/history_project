"use client";

import Image from "next/image";

type Callout = { label: string; sub: string };

export function BlueprintCallouts({
  imageSrc,
  alt,
  callouts,
}: {
  imageSrc: string;
  alt: string;
  callouts: Callout[];
}) {
  return (
    <div className="ch5-callout-board">
      <div className="ch5-plate ch5-plate--2 relative aspect-[16/10] w-full max-w-4xl bg-[#0a1628]">
        <Image src={imageSrc} alt={alt} fill className="object-cover object-center" sizes="900px" />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-2xl">
        {callouts.map((c) => (
          <div key={c.label} className="relative pl-6">
            <span
              className="absolute left-0 top-3 h-px w-4 bg-[#0f172a]"
              aria-hidden
            />
            <span
              className="absolute left-4 top-3 h-px w-full max-w-[120px] bg-[#0f172a] hidden sm:block"
              aria-hidden
            />
            <div className="ch5-callout-tag inline-block">
              {c.label}
              <span className="ch5-callout-sub">{c.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
