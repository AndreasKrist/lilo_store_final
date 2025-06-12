import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/providers/AuthProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lilo Store - Premium CS2 Skin Trading Platform',
  description: 'Experience the future of CS2 skin trading with our ticket-based system. Safe, secure, and professionally managed transactions.',
  keywords: 'CS2, Counter-Strike 2, skins, trading, marketplace, CSGO, gaming',
  authors: [{ name: 'Lilo Store Team' }],
  openGraph: {
    title: 'Lilo Store - Premium CS2 Skin Trading Platform',
    description: 'Experience the future of CS2 skin trading with our ticket-based system.',
    url: 'https://lilo-store.vercel.app',
    siteName: 'Lilo Store',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lilo Store - CS2 Skin Trading',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lilo Store - Premium CS2 Skin Trading Platform',
    description: 'Experience the future of CS2 skin trading with our ticket-based system.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1a1a2e',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Background Effects - Removed grid.svg */}
            <div className="fixed inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
            
            {/* Content */}
            <Navbar />
            <main className="pt-24">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}