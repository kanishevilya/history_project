import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Судоходная история Санкт-Петербурга — Глава I: Восемнадцатое столетие",
  description:
    "Рождение морской столицы. Каналы, верфи и Балтийский флот XVIII века.",
  openGraph: {
    title: "Глава I — Восемнадцатое столетие",
    description: "Рождение морской столицы",
    type: "article",
    locale: "ru_RU",
  },
};

export default function ChapterOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
