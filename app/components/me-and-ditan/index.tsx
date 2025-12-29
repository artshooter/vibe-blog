import { Article } from '@/app/components/articles/types'
import Hero from './Hero'
import HeroCompact from './HeroCompact'
import Content from './Content'

export const meAndDitanArticle: Article = {
  meta: {
    slug: 'me-and-ditan',
    title: '我与地坛',
    description: '史铁生经典散文节选。一座古园，十五年相伴，关于生死的思考，关于如何活着的追问。',
    date: '2025-12-29',
    tags: ['散文', '生命', '史铁生', '经典'],
    status: 'published',
  },
  Hero,
  HeroCompact,
  Content,
}
