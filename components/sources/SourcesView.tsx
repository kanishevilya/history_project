"use client";

import Link from "next/link";
import { SOURCE_SECTIONS, SOURCES_PAGE_META } from "@/constants/sources";
import { HomeLinkButton } from "@/components/chapter/HomeLinkButton";
import "@/app/sources/sources.css";

export default function SourcesView() {
  return (
    <div className="sources-page bg-[#FDFBF7] min-h-screen">
      <HomeLinkButton className="border-[#D4CFC0] bg-[#FDFBF7] text-[#1B365D] hover:border-[#B8860B] hover:text-[#B8860B] focus-visible:outline-[#B8860B]" />

      <header className="border-b border-[#D4CFC0]">
        <div className="grid grid-cols-[3rem_1fr] pl-12 md:grid-cols-[3.5rem_1fr]">
          <aside className="flex justify-center py-10">
            <span className="sources-tag sticky top-24">[БИБЛИОГРАФИЯ]</span>
          </aside>
          <div className="pr-4 pb-12 pt-10 md:pr-12 lg:pr-16">
            <Link
              href="/"
              className="sources-terminal mb-8 inline-block border-b border-[#D4CFC0] pb-1 uppercase text-[#8B7355] no-underline transition-colors hover:border-[#B8860B] hover:text-[#1B365D]"
            >
              ← Навигационный стол
            </Link>
            <p className="sources-terminal uppercase text-[#8B7355]">
              {SOURCES_PAGE_META.subtitle}
            </p>
            <h1 className="sources-title mt-3 text-3xl font-black uppercase leading-none tracking-tight text-[#1B365D] md:text-4xl">
              {SOURCES_PAGE_META.title}
            </h1>
            <p className="sources-prose mt-8 max-w-3xl">
              {SOURCES_PAGE_META.lead}
            </p>
            <p className="sources-terminal mt-6 max-w-2xl text-[#5A6C7D] normal-case leading-relaxed">
              {SOURCES_PAGE_META.note}
            </p>
            <div className="chapter-rule mx-0 mt-10 max-w-md" />
          </div>
        </div>
      </header>

      <main className="bg-[#FAF7F2]">
        {SOURCE_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="grid grid-cols-[3rem_1fr] pl-12 md:grid-cols-[3.5rem_1fr] border-b border-[#E3DFD5] last:border-b-0"
          >
            <aside className="border-r border-[#D4CFC0]/60 opacity-20" />

            <div className="pr-4 py-12 md:pr-12 lg:pr-16 max-w-4xl">
              <h2 className="sources-terminal text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-6">
                {section.title}
              </h2>

              <ol className="list-none p-0 m-0 space-y-6">
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="group border-l-2 border-[#D4CFC0] pl-4 transition-colors hover:border-[#1B365D]"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block no-underline"
                    >
                      <span className="sources-terminal text-[10px] text-[#8B7355] block mb-1">
                        [{String(idx + 1).padStart(2, "0")}]
                      </span>
                      <h3 className="sources-prose text-base font-semibold text-[#1B365D] group-hover:text-[#B8860B] transition-colors duration-150 leading-snug">
                        {item.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5A6C7D] font-mono">
                        <span className="truncate max-w-[280px] sm:max-w-xl text-[#8B7355]/70 group-hover:text-[#1B365D] transition-colors">
                          {item.url}
                        </span>
                        <span className="text-[#D4CFC0] hidden sm:inline">
                          |
                        </span>
                        <span className="text-[11px] uppercase tracking-tight text-[#8B7355]/80">
                          Ревизия: {item.accessDate}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="sources-terminal border-t border-[#D4CFC0] px-6 py-8 pl-[calc(3rem+3rem)] text-center uppercase text-[10px] text-[#8B7355] md:pl-[calc(3.5rem+3rem)]">
        Судоходная история Санкт-Петербурга · источники
      </footer>
    </div>
  );
}
