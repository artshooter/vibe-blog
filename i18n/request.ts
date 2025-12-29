import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  const commonMessages = (await import(`@/messages/${locale}/common.json`)).default
  const worldWarOneMessages = (await import(`@/messages/${locale}/world-war-one.json`)).default
  const mnistMessages = (await import(`@/messages/${locale}/mnist-neural-network.json`)).default
  const meAndDitanMessages = (await import(`@/messages/${locale}/me-and-ditan.json`)).default
  const kongYijiMessages = (await import(`@/messages/${locale}/kong-yiji.json`)).default

  return {
    locale,
    messages: {
      ...commonMessages,
      'world-war-one': worldWarOneMessages,
      'mnist-neural-network': mnistMessages,
      'me-and-ditan': meAndDitanMessages,
      'kong-yiji': kongYijiMessages,
    },
  }
})
