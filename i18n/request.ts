import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  const commonMessages = (await import(`@/messages/${locale}/common.json`)).default

  return {
    locale,
    messages: {
      ...commonMessages,
    },
  }
})
