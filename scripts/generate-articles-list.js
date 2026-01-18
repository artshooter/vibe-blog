#!/usr/bin/env node

/**
 * 自动扫描 app/components/articles 下的所有文章文件夹
 * 并更新 app/lib/articles-loader.ts 中的 ARTICLE_MODULES 列表
 *
 * 使用方法：
 *   node scripts/generate-articles-list.js
 *
 * 或在 package.json 中加入：
 *   "scripts": {
 *     "articles:scan": "node scripts/generate-articles-list.js"
 *   }
 */

const fs = require('fs')
const path = require('path')

const COMPONENTS_DIR = path.join(__dirname, '../app/components/articles')
const LOADER_FILE = path.join(__dirname, '../app/lib/articles-loader.ts')

function getArticleFolders() {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })

  return entries
    .filter((dirent) => {
      if (!dirent.isDirectory()) return false

      // 排除隐藏文件夹
      if (dirent.name.startsWith('.')) return false

      // 检查是否有 index.tsx 或 index.ts
      const indexPath = path.join(COMPONENTS_DIR, dirent.name, 'index.tsx')
      const indexTsPath = path.join(COMPONENTS_DIR, dirent.name, 'index.ts')
      return fs.existsSync(indexPath) || fs.existsSync(indexTsPath)
    })
    .map((dirent) => dirent.name)
    .sort()
}

function generateLoaderContent(articleNames) {
  const modulesList = articleNames.map((name) => `  '${name}',`).join('\n')

  return `/**
 * 文章自动加载模块
 * 约定：所有文章组件在 app/components/articles/[article-name]/index.ts 中导出 Article 对象
 * 命名规范：导出名称 = [articleName]Article（例如：worldWarOneArticle、mnistNeuralNetworkArticle）
 *
 * ⚠️ 警告：此文件由 scripts/generate-articles-list.js 自动生成
 * 请勿手动修改 ARTICLE_MODULES 列表，使用脚本更新
 */

import type { Article } from '@/app/components/types'

// 文章模块清单 - 根据编译时生成的列表动态加载
// 这是编译脚本自动更新的
const ARTICLE_MODULES = [
${modulesList}
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

      const exportName = \`\${camelCaseName}Article\`

      // 动态导入文章组件（使用相对路径确保服务器端正确解析）
      const module = await import(\`../components/articles/\${moduleName}\`)

      if (module[exportName]) {
        const article: Article = module[exportName]

        // 只包含已发布的文章
        if (article.meta.status === 'published') {
          articles.push(article)
        }
      } else {
        console.warn(\`[Article Loader] 未找到导出 '\${exportName}' 在 app/components/articles/\${moduleName}\`)
      }
    } catch (error) {
      console.error(\`[Article Loader] 加载文章 '\${moduleName}' 失败:\`, error)
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
`
}

function main() {
  try {
    const articles = getArticleFolders()

    if (articles.length === 0) {
      console.warn('⚠️  未找到任何文章文件夹')
      return
    }

    const content = generateLoaderContent(articles)
    fs.writeFileSync(LOADER_FILE, content)

    console.log(`✅ 成功扫描文章列表！`)
    console.log(`📄 找到 ${articles.length} 篇文章:`)
    articles.forEach((name) => {
      console.log(`   - ${name}`)
    })
    console.log(`\n✨ 已更新: ${LOADER_FILE}`)
  } catch (error) {
    console.error('❌ 生成文章列表失败:', error.message)
    process.exit(1)
  }
}

main()
