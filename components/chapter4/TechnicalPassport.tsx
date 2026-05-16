"use client";

import Image from "next/image";

type Ship = {
  id: string;
  name: string;
  image: string;
  caption: string;
  specs: { label: string; value: string }[];
};

export function TechnicalPassport({
  intro,
  ships,
}: {
  intro: string;
  ships: Ship[];
}) {
  return (
    <div className="ch4-plate-divider mt-0">
      <p className="ch4-meta mb-4">Технический формуляр · репарации</p>
      <p className="ch4-note ch4-body mb-10 max-w-none border-black">{intro}</p>
      <div className="grid gap-0 border-t-2 border-black md:grid-cols-2">
        {ships.map((ship, i) => (
          <article
            key={ship.id}
            className={`ch4-passport ${i % 2 === 1 ? "md:border-l-2 md:border-black" : ""} ${
              i >= 2 ? "md:border-t-2 md:border-black" : ""
            }`}
          >
            <div className="relative aspect-[16/10] w-full bg-[#0a0e14]">
              <Image
                src={ship.image}
                alt={ship.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="border-t border-black px-3 py-3">
              <p className="ch4-title-sm text-base">{ship.name}</p>
              <p className="ch4-body mt-2 max-w-none text-sm leading-relaxed text-[#141414]/80">
                {ship.caption}
              </p>
            </div>
            <dl className="ch4-passport-spec">
              {ship.specs.flatMap((s) => [
                <dt key={`${ship.id}-${s.label}`}>{s.label}</dt>,
                <dd key={`${ship.id}-${s.value}`}>{s.value}</dd>,
              ])}
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
