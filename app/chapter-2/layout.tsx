import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Судоходная история Санкт-Петербурга — Глава II: Девятнадцатое столетие (железо и пар)",
  description:
    "Индустриальная метаморфоза: пар против паруса, завод Берда, «Елизавета», Мариинская система, канал Путилова.",
};

export default function ChapterTwoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
