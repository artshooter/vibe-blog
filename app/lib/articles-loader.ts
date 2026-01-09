/**
 * 文章自动加载模块
 * 约定：所有文章组件在 app/components/[article-name]/index.ts 中导出 Article 对象
 * 命名规范：导出名称 = [articleName]Article（例如：worldWarOneArticle、mnistNeuralNetworkArticle）
 *
 * ⚠️ 警告：此文件由 scripts/generate-articles-list.js 自动生成
 * 请勿手动修改 ARTICLE_MODULES 列表，使用脚本更新
 */

import type { Article } from '@/app/components/types'

// 文章模块清单 - 根据编译时生成的列表动态加载
// 这是编译脚本自动更新的
const ARTICLE_MODULES = [
  'mnist-neural-network',
  'ordinary-person-2025',
  'world-war-one',
]

/**
 * 获取所有已发布的文章
 * 按发布日期倒序排列
 */
export async function getAllPublishedArticles(): Promise<Article[]> {
  const articles: Article[] = []

  for (const moduleName of ARTICLE_MODULES) {
    try {
      // 转换文件夹名称为驼峰式（用于导出对象名称）
      // 例如：world-war-one → worldWarOne
      const camelCaseName = moduleName
        .split('-')
        .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
        .join('')

      const exportName = `${camelCaseName}Article`

      // 动态导入文章组件（使用相对路径确保服务器端正确解析）
      const module = await import(`../components/${moduleName}`)

      if (module[exportName]) {
        const article: Article = module[exportName]

        // 只包含已发布的文章
        if (article.meta.status === 'published') {
          articles.push(article)
        }
      } else {
        console.warn(`[Article Loader] 未找到导出 '${exportName}' 在 app/components/${moduleName}`)
      }
    } catch (error) {
      console.error(`[Article Loader] 加载文章 '${moduleName}' 失败:`, error)
    }
  }

  // 按发布日期倒序排列
  articles.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())

  return articles
}

/**
 * 获取所有文章名称列表（用于i18n加载）
 */
export function getArticleNames(): string[] {
  return ARTICLE_MODULES
}
