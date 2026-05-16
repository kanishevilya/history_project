"use client";

import Link from "next/link";
import {
  SOURCE_SECTIONS,
  SOURCES_PAGE_META,
} from "@/constants/sources";
import { HomeLinkButton } from "@/components/chapter/HomeLinkButton";
import "@/app/sources/sources.css";

export default function SourcesView() {
  return (
    <div className="sources-page">
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
            <p className="sources-prose mt-8 max-w-3xl">{SOURCES_PAGE_META.lead}</p>
            <p className="sources-terminal mt-6 max-w-2xl text-[#5A6C7D] normal-case leading-relaxed">
              {SOURCES_PAGE_META.note}
            </p>
            <div className="chapter-rule mx-0 mt-10 max-w-md" />
          </div>
        </div>
      </header>

      <main>
        {SOURCE_SECTIONS.map((section) => (
          <section
            key={section.id}
            className="border-b border-[#D4CFC0]"
            aria-labelledby={`sources-${section.id}`}
          >
            <div className="grid grid-cols-[3rem_1fr] pl-12 md:grid-cols-[3.5rem_1fr]">
              <aside className="flex justify-center py-8">
                <span className="sources-tag sticky top-24 text-[10px] opacity-90">
                  {section.tag}
                </span>
              </aside>
              <div className="min-w-0 py-10 pr-4 md:pr-12 lg:pr-16">
                <h2
                  id={`sources-${section.id}`}
                  className="sources-title text-xl font-bold uppercase tracking-tight text-[#1B365D] md:text-2xl"
                >
                  {section.title}
                </h2>
                {section.intro && (
                  <p className="sources-prose mt-4 max-w-3xl text-base text-[#5A6C7D]">
                    {section.intro}
                  </p>
                )}
                <ol className="mt-8 list-none space-y-3 p-0">
                  {section.entries.map((entry, index) => (
                    <li key={entry.id}>
                      <article className="sources-entry px-4 py-4 md:px-5 md:py-5">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="sources-terminal shrink-0 text-[#B8860B]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {entry.label && (
                            <span className="sources-terminal uppercase text-[#1B365D]">
                              {entry.label}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[0.98rem] leading-relaxed text-[#2C3E50]">
                          {entry.citation}
                        </p>
                        {entry.detail && (
                          <p className="sources-terminal mt-2 normal-case text-[#5A6C7D]">
                            {entry.detail}
                          </p>
                        )}
                        {entry.href && (
                          <p className="mt-3">
                            <a
                              href={entry.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sources-terminal text-[0.6rem] uppercase"
                            >
                              {entry.href.replace(/^https?:\/\//, "")} ↗
                            </a>
                          </p>
                        )}
                      </article>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="sources-terminal border-t border-[#D4CFC0] px-6 py-8 pl-[calc(3rem+3rem)] text-center uppercase text-[10px] text-[#8B7355] md:pl-[calc(3.5rem+3rem)]">
        Судоходная история Санкт-Петербурга · источники
      </footer>
    </div>
  );
}
