import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const ordinaryPerson2025Article: Article = {
  meta: {
    articleName: 'ordinary-person-2025',
    title: '普通人的 2025',
    description: '裸辞、迷茫、尝试、放弃，最后发现害怕努力的真相。接受自己是个普通人。',
    date: '2025-12-30',
    tags: ['年终总结', '自我认知', '职业迷茫', '个人成长'],
    status: 'published',
  },
  Hero,
  Content,
}
