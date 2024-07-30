'use client'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import type { PropsWithChildren } from 'react'

const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemeProvider attribute="class">{children}</NextThemeProvider>
)

export default ThemeProvider
