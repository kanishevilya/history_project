"use client";

import Image from "next/image";

export function EgsMapSection({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="-mx-4 mt-12 md:-mx-8 lg:-mr-12">
      <p className="ch4-meta mb-3 px-0">ЕГС · навигационный транзит</p>
      <div className="relative mx-auto aspect-[16/9] w-full max-w-[70%] overflow-hidden border-y-2 border-black bg-[#0a1628]">
        <Image
          src={src}
          alt="Карта Единой глубоководной системы"
          fill
          className="object-cover object-center contrast-110 saturate-75"
          sizes="100vw"
          priority={false}
        />
        <div className="ch4-coord-grid ch4-coord-crosshair absolute inset-0" aria-hidden />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(56,189,248,0.2) 24px)",
          }}
          aria-hidden
        />
      </div>
      <p className="ch4-note ch4-body mt-4 max-w-3xl border-black text-sm md:text-base">
        {caption}
      </p>
    </div>
  );
}
