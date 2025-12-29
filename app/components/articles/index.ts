import { Article } from './types'
import { worldWarOneArticle } from '@/app/components/world-war-one'
import { mnistArticle } from '@/app/components/mnist-neural-network'
import { meAndDitanArticle } from '@/app/components/me-and-ditan'
import { kongYijiArticle } from '@/app/components/kong-yiji'

// 文章注册表 - 新文章在此添加
const articles: Record<string, Article> = {
  'world-war-one': worldWarOneArticle,
  'mnist-neural-network': mnistArticle,
  'me-and-ditan': meAndDitanArticle,
  'kong-yiji': kongYijiArticle,
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles[slug]
}

export function getAllArticleSlugs(): string[] {
  return Object.keys(articles)
}

export function getAllArticles(): Article[] {
  return Object.values(articles)
}

export function getPublishedArticles(): Article[] {
  return Object.values(articles)
    .filter((article) => article.meta.status === 'published')
    .sort((a, b) => {
      // Sort by date descending (newest first)
      const dateA = new Date(a.meta.date)
      const dateB = new Date(b.meta.date)
      return dateB.getTime() - dateA.getTime()
    })
}
