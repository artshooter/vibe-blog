import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const csCourseForBeginnersArticle: Article = {
    meta: {
        articleName: 'cs-course-for-beginners',
        title: '如何设计一门针对非专业者的计科教程',
        description: '在AI编程时代，如何帮助非专业者构建工程师思维模型',
        date: '2026-01-18',
        tags: ['教育', 'AI', '方法论'],
        status: 'published',
    },
    Hero,
    Content,
}
