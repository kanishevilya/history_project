"use client";

import Link from "next/link";

type HomeLinkButtonProps = {
  className?: string;
};

/** Закреплённая ссылка на главную — нижний левый угол. */
export function HomeLinkButton({ className = "" }: HomeLinkButtonProps) {
  return (
    <Link
      href="/"
      className={`fixed bottom-6 left-5 z-[9998] border px-3 py-2 text-[0.65rem] uppercase tracking-widest no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
      aria-label="На главную страницу"
    >
      ← Главная
    </Link>
  );
}
