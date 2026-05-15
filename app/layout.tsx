import type { Metadata, Viewport } from 'next'
import { Playfair_Display, PT_Serif, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-pt-serif',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-caveat',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#F5F2E8',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Судоходная история Санкт-Петербурга — Глава I: Восемнадцатое столетие',
  description: 'Рождение морской столицы. Интерактивное путешествие по истории создания водной инфраструктуры Петербурга XVIII века — каналы, верфи, Балтийский флот.',
  generator: 'v0.app',
  keywords: ['Санкт-Петербург', 'история', 'судоходство', 'XVIII век', 'Петр I', 'каналы', 'Балтийский флот'],
  authors: [{ name: 'Digital Archive' }],
  openGraph: {
    title: 'Судоходная история Санкт-Петербурга — Глава I',
    description: 'Восемнадцатое столетие: Рождение морской столицы',
    type: 'article',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${playfairDisplay.variable} ${ptSerif.variable} ${caveat.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
