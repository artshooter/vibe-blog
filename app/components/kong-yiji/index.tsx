import { Article } from '@/app/components/articles/types'
import Hero from './Hero'
import HeroCompact from './HeroCompact'
import Content from './Content'

export const kongYijiArticle: Article = {
  meta: {
    slug: 'kong-yiji',
    title: '孔乙己',
    description: '站着喝酒而穿长衫的唯一的人',
    date: '2025-12-29',
    tags: ['鲁迅', '短篇小说', '经典文学'],
    status: 'published',
  },
  Hero,
  HeroCompact,
  Content,
}
