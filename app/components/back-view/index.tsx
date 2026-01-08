import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const backViewArticle: Article = {
  meta: {
    articleName: 'back-view',
    title: '背影',
    description: '我最不能忘记的是他的背影',
    date: '2026-01-02',
    tags: ['朱自清', '散文', '父子情', '经典文学'],
    status: 'published',
  },
  Hero,
  Content,
}
