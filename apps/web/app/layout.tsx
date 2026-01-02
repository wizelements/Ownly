import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'
import { AuthWrapper } from './auth-wrapper'
import { StructuredData } from './structured-data'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ownly Starter Kit — Ship Your SaaS in Days, Not Months',
  description: 'Production-ready Next.js 14 + tRPC + Prisma foundation with 24 UI components, 13 database models, and demo mode. Skip setup, start building. $49 one-time.',
  keywords: ['nextjs starter kit', 'saas boilerplate', 'trpc prisma', 'nextjs template', 'saas starter', 'react dashboard', 'typescript boilerplate', 'indie hacker tools'],
  authors: [{ name: 'Cod3BlackAgency' }],
  creator: 'Cod3BlackAgency',
  publisher: 'Cod3BlackAgency',
  metadataBase: new URL('https://ownly-kit.vercel.app'),
  alternates: {
    canonical: 'https://ownly-kit.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ownly-kit.vercel.app',
    siteName: 'Ownly Starter Kit',
    title: 'Ownly Starter Kit — Ship Your SaaS in Days',
    description: 'Next.js 14 + tRPC + Prisma starter kit. 24 components, 13 DB models, demo mode included. $49 one-time.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ownly Starter Kit - Ship Your SaaS in Days',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ownly Starter Kit — Ship Your SaaS in Days',
    description: 'Next.js 14 + tRPC + Prisma foundation. 24 components, 13 models, demo mode. $49.',
    images: ['/og-image.png'],
    creator: '@cod3black',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <AuthWrapper>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </AuthWrapper>
      </body>
    </html>
  )
}
