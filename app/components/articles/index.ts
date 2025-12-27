import { Article } from './types'
import { worldWarOneArticle } from '@/app/components/world-war-one'

// 文章注册表 - 新文章在此添加
const articles: Record<string, Article> = {
  'world-war-one': worldWarOneArticle,
  // 示例：
  // resume: resumeArticle,
  // tasks: tasksArticle,
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
  return Object.values(articles).filter((article) => article.meta.status === 'published')
}
