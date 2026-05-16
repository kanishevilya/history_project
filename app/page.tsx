import { JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import HomeGISDashboard from "@/components/home/HomeGISDashboard";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Судоходная история Санкт-Петербурга — навигационный стол",
  description:
    "Интерактивная хронология морского города: карта эпох и пять глав истории порта.",
  openGraph: {
    title: "Судоходная история Санкт-Петербурга",
    description: "Карта эпох и пять глав морской истории города",
    type: "website",
    locale: "ru_RU",
  },
};

export default function HomePage() {
  return (
    <div className={jetbrainsMono.variable}>
      <HomeGISDashboard />
    </div>
  );
}
