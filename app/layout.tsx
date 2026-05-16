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
  title: 'Судоходная история Санкт-Петербурга',
  description: 'Хронология морского Петербурга: навигационный стол и пять глав — от Петра I до XXI века.',
  keywords: ['Санкт-Петербург', 'история', 'судоходство', 'порт', 'Нева', 'GIS'],
  generator: 'v0.app',
  authors: [{ name: 'Digital Archive' }],
  openGraph: {
    title: 'Судоходная история Санкт-Петербурга',
    description: 'Навигационный стол и пять глав морской истории города',
    type: 'website',
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
