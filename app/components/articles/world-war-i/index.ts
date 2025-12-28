
import { Article } from '../types'
import Hero from './Hero'
import HeroCompact from './HeroCompact'
import Content from './Content'

export const worldWarI: Article = {
    meta: {
        slug: 'world-war-i',
        title: '第一次世界大战',
        description: '1914-1918：一场重塑世界秩序的全球性军事冲突。从萨拉热窝的枪声到凡尔赛的合约，回顾人类历史的至暗时刻。',
        date: '2025-12-28',
        tags: ['History', 'War', 'Humanity'],
        status: 'published',
    },
    Hero,
    HeroCompact,
    Content,
}
