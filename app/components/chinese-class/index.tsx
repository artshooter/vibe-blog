import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const chineseClassArticle: Article = {
  meta: {
    articleName: 'chinese-class',
    title: '「语文课」网页复盘',
    description: '分享 AI 文生图在「语文课」网页项目中的应用经验，包括技巧、工具对比和创意思路。',
    date: '2026-01-14',
    tags: ['项目复盘', 'AI 工具', '文生图', '设计技巧', '创意'],
    status: 'published',
  },
  Hero,
  Content,
}
