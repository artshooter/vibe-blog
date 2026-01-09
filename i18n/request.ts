import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { getArticleNames } from '@/app/lib/articles-loader'
import { Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale
  }

  // 加载共通翻译
  const commonMessages = (await import(`@/messages/${locale}/common.json`)).default

  // 动态加载所有文章的翻译
  const articleMessages: Record<string, any> = {}
  const articleNames = getArticleNames()

  for (const articleName of articleNames) {
    try {
      const messages = (await import(`@/messages/${locale}/${articleName}.json`)).default
      articleMessages[articleName] = messages
    } catch (error) {
      console.warn(`[i18n] 未找到翻译文件: messages/${locale}/${articleName}.json`)
    }
  }

  return {
    locale,
    messages: {
      ...commonMessages,
      ...articleMessages,
    },
  }
})
