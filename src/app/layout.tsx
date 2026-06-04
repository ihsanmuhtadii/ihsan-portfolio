import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ModeProvider } from '@/lib/context'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
})

export const metadata: Metadata = {
  title: 'Ihsan Muhtadi — Fullstack Developer',
  description: 'Personal branding website of Ihsan Muhtadi, a fullstack developer based in Jakarta, Indonesia.',
  keywords: ['fullstack developer', 'web developer', 'Jakarta', 'Laravel', 'WordPress', 'React'],
  authors: [{ name: 'Ihsan Muhtadi' }],
  openGraph: {
    title: 'Ihsan Muhtadi — Fullstack Developer',
    description: 'Fullstack Developer based in Jakarta. PHP, Laravel, WordPress, React, Flutter.',
    url: 'https://ihsanmuhtadi.com',
    siteName: 'Ihsan Muhtadi',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-[#0d1117] text-[#e6edf3] antialiased`}>
        <ModeProvider>
          {children}
        </ModeProvider>
      </body>
    </html>
  )
}