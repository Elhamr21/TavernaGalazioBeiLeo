import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taverna Galazio bei Leo | Authentische Griechische Küche in Leipzig',
  description: 'Erleben Sie authentische griechische Küche im Herzen von Leipzig. Taverna Galazio bei Leo bietet mediterrane Spezialitäten, frische Zutaten und herzliche Gastfreundschaft seit über 25 Jahren.',
  keywords: ['Griechisches Restaurant Leipzig', 'Mediterrane Küche Leipzig', 'Authentische griechische Küche', 'Restaurant Leipzig', 'Taverna Galazio'],
  openGraph: {
    title: 'Taverna Galazio bei Leo | Griechisches Restaurant Leipzig',
    description: 'Authentische griechische Küche im Herzen von Leipzig. Frische Zutaten, traditionelle Rezepte und herzliche Gastfreundschaft.',
    locale: 'de_DE',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        type: 'image/png',
      },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
