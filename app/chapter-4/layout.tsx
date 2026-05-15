import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Судоходная история Санкт-Петербурга — Глава IV: Модернизация (вторая половина XX века)",
  description:
    "Послевоенное восстановление, флот «река-море», контейнеризация, золотой век БМП и кризис 1990-х.",
};

export default function ChapterFourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${ibmPlex.variable} ${jetbrainsMono.variable}`}>{children}</div>
  );
}
