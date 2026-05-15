"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Anchor, Ship, Train } from "lucide-react";
import {
  CH2_INTRO,
  CH2_BERD,
  CH2_ELIZAVETA,
  CH2_TIMETABLE,
  CH2_MARIINSKY,
  CH2_PUTILOV_CANAL,
  CH2_PUTILOV_DEATH,
  CH2_GUTUEVSKY,
  CHAPTER2_CONCLUSION,
  CH2_IMAGES,
  CH2_FIGURES,
} from "@/constants/chapter2";
import {
  RevealParagraph,
  RevealWords,
} from "@/components/chapter/ChapterWordReveal";
import {
  BookOrnament,
  CH2_SECTION,
  Chapter2Figure,
  CornerFrame,
  Ornament,
  SectionTitle,
  YearStamp,
} from "@/components/chapter2/editorial";
import {
  FigureTooltip,
  GlossaryTerm,
} from "@/components/chapter2/editorialOverlays";
import { ElizavetaShipCarousel } from "@/components/chapter2/ElizavetaShipCarousel";

const EASE: [number, number, number, number] = [0.43, 0.13, 0.23, 0.96];

const ELIZAVETA_SPECS = [
  CH2_ELIZAVETA.specs.length,
  CH2_ELIZAVETA.specs.speed,
  CH2_ELIZAVETA.specs.power,
];

function LockStage({
  stage,
  description,
  children,
}: {
  stage: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="relative mb-4 h-40 overflow-hidden border border-border/50 bg-card/40">
        {children}
      </div>
      <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
        {stage}
      </p>
      <RevealWords
        text={description}
        className="text-sm leading-relaxed text-muted-foreground"
      />
    </div>
  );
}

function LockSvgEnter() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <rect x="0" y="10" width="16" height="110" fill="#b8cce4" />
      <rect x="184" y="10" width="16" height="110" fill="#b8cce4" />
      <rect x="16" y="10" width="8" height="60" fill="#1a73e8" />
      <rect x="176" y="45" width="8" height="25" fill="#8eb4d8" opacity="0.5" />
      <rect x="0" y="50" width="24" height="70" fill="#7aa5b8" opacity="0.6" />
      <rect
        x="24"
        y="80"
        width="152"
        height="40"
        fill="#8eb5c8"
        opacity="0.5"
      />
      <g transform="translate(115, 68)">
        <rect x="0" y="0" width="40" height="10" fill="#5a5550" rx="1" />
        <polygon points="40,5 48,5 45,1 45,9" fill="#5a5550" />
        <rect x="12" y="-6" width="14" height="6" fill="#4a4540" />
      </g>
      <path d="M150 73 L165 73" stroke="#1a73e8" strokeWidth="2" fill="none" />
      <polygon points="162 70, 168 73, 162 76" fill="#1a73e8" />
    </svg>
  );
}

function LockSvgFill() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <rect x="0" y="10" width="16" height="110" fill="#b8cce4" />
      <rect x="184" y="10" width="16" height="110" fill="#b8cce4" />
      <rect x="16" y="10" width="8" height="45" fill="#1a73e8" />
      <rect x="176" y="10" width="8" height="60" fill="#1a73e8" />
      <rect x="0" y="50" width="24" height="70" fill="#7aa5b8" opacity="0.6" />
      <rect
        x="24"
        y="62"
        width="152"
        height="58"
        fill="#7aa5b8"
        opacity="0.55"
      />
      <path
        d="M24 52 Q32 58 28 68 Q24 78 32 85"
        stroke="#5a95a8"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <g transform="translate(75, 50)">
        <rect x="0" y="0" width="40" height="10" fill="#5a5550" rx="1" />
        <polygon points="40,5 48,5 45,1 45,9" fill="#5a5550" />
        <rect x="12" y="-6" width="14" height="6" fill="#4a4540" />
      </g>
      <path d="M95 72 L95 62" stroke="#1a73e8" strokeWidth="2" fill="none" />
      <polygon points="92 65, 95 58, 98 65" fill="#1a73e8" />
    </svg>
  );
}

function LockSvgExit() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <rect x="0" y="10" width="16" height="110" fill="#b8cce4" />
      <rect x="184" y="10" width="16" height="110" fill="#b8cce4" />
      <rect x="16" y="10" width="8" height="25" fill="#8eb4d8" opacity="0.5" />
      <rect x="176" y="10" width="8" height="60" fill="#1a73e8" />
      <rect x="0" y="50" width="200" height="70" fill="#7aa5b8" opacity="0.6" />
      <g transform="translate(22, 38)">
        <rect x="0" y="0" width="40" height="10" fill="#5a5550" rx="1" />
        <polygon points="-8,5 0,1 0,9" fill="#5a5550" />
        <rect x="12" y="-6" width="14" height="6" fill="#4a4540" />
      </g>
      <path d="M48 43 L32 43" stroke="#1a73e8" strokeWidth="2" fill="none" />
      <polygon points="35 40, 29 43, 35 46" fill="#1a73e8" />
    </svg>
  );
}

const GUTUEVSKY_ROUTES = [
  {
    icon: Anchor,
    label: "Морской путь",
    subtitle: "Балтика и далее",
    detail:
      "Глубоководный выход в Балтийское море через Финский залив. Океанские суда получили возможность швартоваться у причалов столицы.",
    accent: "6,7 м глубины",
  },
  {
    icon: Ship,
    label: "Речной путь",
    subtitle: "Мариинская система",
    detail:
      "Внутренняя водная артерия, соединяющая Петербург с бассейном Волги. Хлеб, лес, железо — колоссальные объёмы грузов из глубины России.",
    accent: "1100 км пути",
  },
  {
    icon: Train,
    label: "Железная дорога",
    subtitle: "К глубине страны",
    detail:
      "Балтийская железная дорога обеспечивала прямое сообщение с промышленными центрами империи.",
    accent: "С 1857 года",
  },
] as const;

export function IntroSection() {
  const parts = CH2_INTRO.lead.split("Паровая машина");
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="ch2-link mb-8 inline-block font-mono text-xs uppercase tracking-widest"
        >
          ← Глава I
        </Link>
        {parts.length > 1 ? (
          <RevealParagraph
            dropCap
            className="text-lg leading-[1.9] text-foreground/90"
            parts={[
              parts[0],
              <GlossaryTerm key="steam" id="steam">
                Паровая машина
              </GlossaryTerm>,
              parts[1] ?? "",
            ]}
          />
        ) : (
          <RevealWords
            dropCap
            text={CH2_INTRO.lead}
            className="text-lg leading-[1.9] text-foreground/90"
          />
        )}
      </div>
    </section>
  );
}

export function BerdSection() {
  const [before, after] = CH2_BERD.body.split("Чарльз Берд");
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-5xl">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <div className="mb-4">
              <YearStamp year={CH2_BERD.year} />
            </div>
            <SectionTitle>{CH2_BERD.title}</SectionTitle>
            <RevealParagraph
              className="mt-6 leading-relaxed text-foreground/85"
              parts={[
                before,
                <FigureTooltip key="berd" data={CH2_FIGURES.berd}>
                  Чарльз Берд{"\u00A0"}
                </FigureTooltip>,
                after,
              ]}
            />
          </div>
          <CornerFrame className="p-6">
            <p className="mb-4 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              {CH2_BERD.stamp.title}
            </p>
            <div className="space-y-3">
              {CH2_BERD.stamp.lines.map((line) => (
                <div
                  key={line.k}
                  className="flex items-baseline justify-between border-b border-border/40 pb-2"
                >
                  <span className="text-sm text-muted-foreground">
                    {line.k}
                  </span>
                  <span className="font-serif text-lg text-foreground">
                    {line.v}
                  </span>
                </div>
              ))}
            </div>
          </CornerFrame>
        </div>
      </div>
    </section>
  );
}

export function ElizavetaSection() {
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-6xl">
        <Ornament>первый рейс</Ornament>
        <div className="mb-8 text-center">
          <SectionTitle centered>{CH2_ELIZAVETA.title}</SectionTitle>
          <p className="mx-auto mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
            {CH2_ELIZAVETA.subtitle}
          </p>
          <div className="mx-auto mt-4 max-w-2xl">
            <RevealWords
              text={CH2_ELIZAVETA.intro}
              className="text-foreground/85 leading-relaxed"
            />
          </div>
        </div>
        <div className="mb-8">
          <ElizavetaShipCarousel />
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {ELIZAVETA_SPECS.map((spec) => (
            <CornerFrame key={spec.label} className="p-5 text-center">
              <p className="mb-2 text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                {spec.label}
              </p>
              <p className="font-serif text-2xl text-foreground">
                {spec.value}
              </p>
            </CornerFrame>
          ))}
        </div>
        <CornerFrame className="p-6 md:p-8">
          <RevealWords
            text={CH2_ELIZAVETA.event}
            className="font-serif text-lg leading-relaxed text-foreground md:text-xl"
          />
        </CornerFrame>
      </div>
    </section>
  );
}

export function TimetableSection() {
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-4xl">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <div className="mb-6 text-center md:text-left">
              <p className="mb-3 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                {CH2_TIMETABLE.subtitle}
              </p>
              <SectionTitle>{CH2_TIMETABLE.title}</SectionTitle>
            </div>
            <CornerFrame className="p-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-accent/60">
                    <th className="pb-2 text-left text-[0.6rem] font-normal uppercase tracking-[0.15em] text-muted-foreground">
                      Отпр.
                    </th>
                    <th className="pb-2 text-left text-[0.6rem] font-normal uppercase tracking-[0.15em] text-muted-foreground">
                      Маршрут
                    </th>
                    <th className="pb-2 text-right text-[0.6rem] font-normal uppercase tracking-[0.15em] text-muted-foreground">
                      Прим.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CH2_TIMETABLE.rows.map((row) => (
                    <tr
                      key={row.dep + row.route}
                      className="border-b border-border/40"
                    >
                      <td className="py-3 font-serif text-lg text-foreground">
                        {row.dep}
                      </td>
                      <td className="py-3 text-sm text-foreground/80">
                        {row.route}
                      </td>
                      <td className="py-3 text-right text-sm text-muted-foreground">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CornerFrame>
          </div>
          <Chapter2Figure
            src={CH2_IMAGES.oranienbaum}
            alt="Ораниенбаум"
            caption="Ораниенбаум — пристань на пути в столицу"
            size="compact"
          />
        </div>
      </div>
    </section>
  );
}

export function MariinskySection() {
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-6xl">
        <Ornament>водные ворота</Ornament>
        <div className="mb-8 text-center">
          <SectionTitle centered>{CH2_MARIINSKY.title}</SectionTitle>
          <div className="mx-auto mt-4 max-w-2xl">
            <RevealWords
              text={CH2_MARIINSKY.body}
              className="text-foreground/85 leading-relaxed"
            />
          </div>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <LockStage stage="Вход" description={CH2_MARIINSKY.lockStages.enter}>
            <LockSvgEnter />
          </LockStage>
          <LockStage
            stage="Наполнение"
            description={CH2_MARIINSKY.lockStages.fill}
          >
            <LockSvgFill />
          </LockStage>
          <LockStage stage="Выход" description={CH2_MARIINSKY.lockStages.exit}>
            <LockSvgExit />
          </LockStage>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {CH2_MARIINSKY.stats.map((stat) => (
            <CornerFrame key={stat.label} className="p-5 text-center">
              <p className="mb-2 text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="font-serif text-3xl text-foreground">
                {stat.value}
              </p>
            </CornerFrame>
          ))}
        </div>
        <Chapter2Figure
          src={CH2_IMAGES.mariinskyMap}
          alt="Карта Мариинской системы"
          caption={CH2_MARIINSKY.mapCaption}
          size="feature"
          aspect="16/9"
        />
      </div>
    </section>
  );
}

export function PutilovSection() {
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-5xl">
        <Ornament>канал и завод</Ornament>
        <div className="mb-8 text-center">
          <SectionTitle centered>{CH2_PUTILOV_CANAL.title}</SectionTitle>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <Chapter2Figure
            src={CH2_IMAGES.putilovPortrait}
            alt="Портрет Путилова"
            caption="Николай Иванович Путилов"
            size="feature"
            aspect="3/4"
          />
          <div>
            <RevealParagraph
              className="mb-5 leading-relaxed text-foreground/85"
              parts={[
                <FigureTooltip key="putilov" data={CH2_FIGURES.putilov}>
                  Николай Иванович Путилов
                </FigureTooltip>,
                ` — ${CH2_PUTILOV_CANAL.body}`,
              ]}
            />
            <CornerFrame className="mb-5 p-5">
              <p className="mb-2 text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                {CH2_PUTILOV_CANAL.depth.label}
              </p>
              <p className="font-serif text-4xl text-foreground">
                {CH2_PUTILOV_CANAL.depth.value}
                <span className="ml-1 text-2xl text-accent">
                  {CH2_PUTILOV_CANAL.depth.unit}
                </span>
              </p>
            </CornerFrame>
            <CornerFrame className="border-l-4 border-l-accent p-5">
              <RevealWords
                text={`«${CH2_PUTILOV_DEATH.quote}»`}
                className="font-serif text-lg italic leading-relaxed text-foreground/85"
              />
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                {CH2_PUTILOV_DEATH.attribution}
              </p>
            </CornerFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GutuevskySection() {
  return (
    <section className={CH2_SECTION}>
      <div className="mx-auto max-w-6xl">
        <Ornament>три пути к морю</Ornament>
        <div className="mb-8 text-center">
          <SectionTitle centered>{CH2_GUTUEVSKY.title}</SectionTitle>
          <div className="mx-auto mt-4 max-w-2xl">
            <RevealWords
              text={CH2_GUTUEVSKY.body}
              className="text-foreground/85 leading-relaxed"
            />
          </div>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {GUTUEVSKY_ROUTES.map((route) => {
            const Icon = route.icon;
            return (
              <div key={route.label} className="ch2-route-card">
                <div className="mb-3 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <div>
                    <p className="font-serif text-lg text-foreground">
                      {route.label}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                      {route.subtitle}
                    </p>
                  </div>
                </div>
                <RevealWords
                  text={route.detail}
                  className="mb-3 text-sm leading-relaxed text-foreground/80"
                />
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-accent">
                  {route.accent}
                </p>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <CornerFrame className="inline-block p-8">
            <p className="mb-2 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
              {CH2_GUTUEVSKY.turnover.label}
            </p>
            <p className="font-serif text-4xl text-foreground">
              {CH2_GUTUEVSKY.turnover.value}
            </p>
            <p className="mt-2 text-[0.7rem] uppercase tracking-[0.15em] text-accent">
              {CH2_GUTUEVSKY.turnover.year} год
            </p>
          </CornerFrame>
        </div>
      </div>
    </section>
  );
}

export function ConclusionSection() {
  const prev = CHAPTER2_CONCLUSION.prevChapter;
  const next = CHAPTER2_CONCLUSION.nextChapter;
  return (
    <section className={`${CH2_SECTION} anchor-decoration`}>
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
        >
          <BookOrnament className="text-accent mb-8" />
          <RevealWords
            text={CHAPTER2_CONCLUSION.text}
            className="font-serif text-xl leading-relaxed text-foreground/90 italic md:text-2xl"
          />
          <BookOrnament className="text-accent mt-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Предыдущая глава
          </p>
          <Link
            href={prev.href}
            className="group mt-2 inline-block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <p className="font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-accent md:text-3xl">
              Глава {prev.number}: {prev.title}
            </p>
            <p className="mt-1 text-accent italic group-hover:underline">
              {prev.subtitle}
            </p>
          </Link>
        </motion.div>

        {next ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Следующая глава
            </p>
            <Link
              href={next.href}
              className="group mt-2 inline-block rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <p className="font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-accent md:text-3xl">
                Глава {next.number}: {next.title}
              </p>
              <p className="mt-1 text-accent italic group-hover:underline">
                {next.subtitle}
              </p>
            </Link>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
          Глава II · Эпоха пара и великих строек · XIX век
        </p>
      </div>
    </footer>
  );
}
