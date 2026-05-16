import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import SourcesView from "@/components/sources/SourcesView";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Источники — Судоходная история Санкт-Петербурга",
  description:
    "Библиография, архивы, карты и официальные материалы проекта о морской истории города.",
  openGraph: {
    title: "Источники и материалы",
    description: "Библиография навигационного стола",
    type: "website",
    locale: "ru_RU",
  },
};

export default function SourcesPage() {
  return (
    <div className={jetbrainsMono.variable}>
      <SourcesView />
    </div>
  );
}
