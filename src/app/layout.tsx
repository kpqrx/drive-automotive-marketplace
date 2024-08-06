import { Toaster } from '@/components'
import { FramerMotionProvider, ThemeProvider } from '@/providers'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'DRIVE - platforma ogłoszeń motoryzacyjnych',
  description:
    'Luksusowa limuzyna, nowy SUV, sportowe coupe, przestronne kombi? Mamy to! Przekonaj się!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <FramerMotionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </FramerMotionProvider>
        <Toaster />
      </body>
    </html>
  )
}
