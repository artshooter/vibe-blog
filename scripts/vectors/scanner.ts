import fs from 'fs'
import path from 'path'
import type { ArticleMeta, ArticleSource } from './types'

const ROOT_DIR = path.resolve(__dirname, '../../')
const COMPONENTS_DIR = path.join(ROOT_DIR, 'app/components/articles')
const LOCALE_DIR = path.join(ROOT_DIR, 'app/[locale]')

// Folders that are not articles (articles/ directory only contains articles now)
const EXCLUDED_FOLDERS: string[] = []

function kebabToCamel(str: string): string {
  // Handle both letters and numbers after hyphen
  return str.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())
}

function extractMetaFromIndex(filePath: string, articleName: string): ArticleMeta | null {
  const content = fs.readFileSync(filePath, 'utf-8')

  const camelName = kebabToCamel(articleName)
  const exportPattern = new RegExp(
    `export\\s+const\\s+${camelName}Article[^{]*\\{[^}]*meta:\\s*\\{([^}]+)\\}`,
    's'
  )

  const match = content.match(exportPattern)
  if (!match) {
    console.warn(`Could not extract meta from ${filePath}`)
    return null
  }

  const metaBlock = match[1]

  const getString = (key: string): string => {
    const regex = new RegExp(`${key}:\\s*['"]([^'"]+)['"]`)
    const m = metaBlock.match(regex)
    return m ? m[1] : ''
  }

  const getArray = (key: string): string[] => {
    const regex = new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`)
    const m = metaBlock.match(regex)
    if (!m) return []
    return m[1].match(/['"]([^'"]+)['"]/g)?.map(s => s.slice(1, -1)) || []
  }

  return {
    articleName: getString('articleName') || articleName,
    title: getString('title'),
    description: getString('description'),
    date: getString('date'),
    tags: getArray('tags'),
    status: getString('status') as 'draft' | 'published',
  }
}

function getContentPath(articleName: string): string {
  return path.join(LOCALE_DIR, articleName, 'content.md')
}

export async function scanArticles(): Promise<ArticleSource[]> {
  const articles: ArticleSource[] = []

  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error(`Components directory not found: ${COMPONENTS_DIR}`)
    return articles
  }

  const folders = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !EXCLUDED_FOLDERS.includes(d.name))
    .map(d => d.name)

  for (const folder of folders) {
    const indexPath = path.join(COMPONENTS_DIR, folder, 'index.tsx')
    const contentPath = getContentPath(folder)

    if (!fs.existsSync(indexPath)) {
      console.warn(`No index.tsx found for ${folder}`)
      continue
    }

    if (!fs.existsSync(contentPath)) {
      console.warn(`No content.md found for ${folder}`)
      continue
    }

    const meta = extractMetaFromIndex(indexPath, folder)
    if (!meta) continue

    if (meta.status !== 'published') {
      console.log(`Skipping draft: ${folder}`)
      continue
    }

    const content = fs.readFileSync(contentPath, 'utf-8')

    articles.push({
      meta,
      content,
      locale: 'zh',
    })
  }

  console.log(`Found ${articles.length} published articles`)
  return articles
}
