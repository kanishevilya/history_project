"use client";

import Image from "next/image";

export function HudFrame({
  src,
  alt,
  model,
  year,
  speed,
  capacity,
}: {
  src: string;
  alt: string;
  model: string;
  year: string;
  speed: string;
  capacity: string;
}) {
  return (
    <div className="ch5-hud relative aspect-[16/10] w-full max-w-3xl">
      <span className="ch5-hud-corner-bl" aria-hidden />
      <span className="ch5-hud-corner-br" aria-hidden />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 720px"
      />
      <div className="ch5-hud-overlay">
        <span>{model}</span>
        <span>{year}</span>
        <span>SPEED: {speed}</span>
        <span>CAP: {capacity}</span>
      </div>
    </div>
  );
}
