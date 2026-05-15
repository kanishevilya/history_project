import Image from "next/image";

export const CH2_SECTION = "px-6 py-12";

export function BookOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      className={`mx-auto h-5 w-32 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 10h45M75 10h45M52 10a8 8 0 1016 0 8 8 0 10-16 0"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <circle cx="60" cy="10" r="3" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function Ornament({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-6 flex items-center justify-center gap-6 text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
      {children || <span>◆</span>}
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="relative my-5 flex h-6 items-center justify-center">
      <span className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <span className="ch2-divider-chip relative z-10 flex items-center gap-2 px-3 text-[10px] text-muted-foreground">
        <span>◆</span>
        <span>◆</span>
        <span>◆</span>
      </span>
    </div>
  );
}

export function YearStamp({ year }: { year: string }) {
  return (
    <span className="inline-block border-2 border-accent/80 px-4 py-1.5 font-serif text-xl tracking-wider text-accent">
      {year}
    </span>
  );
}

export function SectionTitle({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <h2
      className={`relative inline-block pb-3 font-serif text-3xl font-medium text-foreground md:text-4xl ${
        centered ? "mx-auto block text-center" : ""
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 h-0.5 w-16 bg-accent ${
          centered ? "left-1/2 -translate-x-1/2" : "left-0"
        }`}
      />
    </h2>
  );
}

export function CornerFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border border-border/60 bg-card/50 ${className}`}>
      <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent/40" />
      <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent/40" />
      <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent/40" />
      <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent/40" />
      {children}
    </div>
  );
}

/** Иллюстрация в рамке главы I: compact — узкая, feature — пароходы и портрет. */
export function Chapter2Figure({
  src,
  alt,
  caption,
  size = "compact",
  aspect = "4/3",
}: {
  src: string;
  alt: string;
  caption?: string;
  size?: "compact" | "feature";
  aspect?: "4/3" | "3/4" | "16/9";
}) {
  const aspectClass =
    aspect === "3/4"
      ? "aspect-[3/4]"
      : aspect === "16/9"
        ? "aspect-[16/9]"
        : "aspect-[4/3]";

  const wrap =
    size === "feature"
      ? "mx-auto w-full max-w-2xl"
      : "mx-auto w-full max-w-sm";

  return (
    <figure className={`m-0 ${wrap}`}>
      <div
        className={`image-frame-corners relative overflow-hidden ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={
            size === "feature"
              ? "(max-width: 768px) 100vw, 672px"
              : "(max-width: 768px) 90vw, 384px"
          }
        />
      </div>
      {caption ? (
        <figcaption className="figure-caption-museum mt-3">
          <p className="mt-1.5 text-sm italic leading-relaxed text-foreground/75">
            {caption}
          </p>
        </figcaption>
      ) : null}
    </figure>
  );
}
