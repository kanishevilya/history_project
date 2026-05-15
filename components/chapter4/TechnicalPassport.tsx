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
    <div className="ch4-plate-divider grid gap-0 lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="lg:pr-8">
        <p className="ch4-meta mb-4">Технический формуляр · репарации</p>
        <p className="ch4-note ch4-body mb-0 max-w-none border-black">{intro}</p>
      </div>
      <div className="flex flex-col gap-0 border-t-2 border-black lg:border-t-0 lg:border-l-2 lg:pl-8">
        {ships.map((ship, i) => (
          <article
            key={ship.id}
            className={`ch4-passport ${i > 0 ? "-mt-px border-t-0" : ""}`}
          >
            <div className="relative aspect-[4/3] w-full bg-[#0a0e14]">
              <Image
                src={ship.image}
                alt={ship.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 340px"
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
