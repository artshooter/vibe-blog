import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Locale } from '@/i18n/config'
import NavigationProgress from '@/app/components/common/NavigationProgress'
import SwipeBack from '@/app/components/common/SwipeBack'
import RagChat from '@/app/components/rag-chat'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Vibe Blog',
  description: 'Everything is an article',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NavigationProgress />
        <SwipeBack>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </SwipeBack>
        <RagChat />
      </body>
    </html>
  )
}
