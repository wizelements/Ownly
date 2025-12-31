import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'
import { AuthWrapper } from './auth-wrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ownly - Your entire business in one place',
  description: 'From LLC to $1M. The only product normal people need to start, run, and scale a profitable U.S. business.',
  keywords: ['LLC formation', 'business formation', 'entrepreneurship', 'small business', 'startup'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
