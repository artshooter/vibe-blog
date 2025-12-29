import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vibe Blog',
  description: 'Everything is an article',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
