import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const worldWarOneArticle: Article = {
  meta: {
    articleName: 'world-war-one',
    title: '第一次世界大战',
    description: '从萨拉热窝的一声枪响，到改变世界的四年战争。探索战争如何从局部冲突升级为全球灾难。',
    date: '2025-12-27',
    tags: ['历史', '战争', '欧洲', '20世纪'],
    status: 'published',
  },
  Hero,
  Content,
}
