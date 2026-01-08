import { Article } from '../types'
import Content from './Content'
import Hero from './Hero'

export const guxiangArticle: Article = {
    meta: {
        articleName: 'guxiang',
        title: '故乡',
        description: '我所记得的故乡全不如此，我的故乡好得多了',
        date: '1921-01-01',
        tags: ['鲁迅', '散文', '小说'],
        status: 'published',
    },
    Hero,
    Content,
}
