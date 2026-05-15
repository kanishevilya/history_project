import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Судоходная история Санкт-Петербурга — Глава III: Потрясения и героизм (XX век)",
  description:
    "Первая половина XX века: революция, восстановление флота, блокада и Дорога жизни.",
};

export default function ChapterThreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${oswald.variable} ${jetbrainsMono.variable}`}>{children}</div>
  );
}
