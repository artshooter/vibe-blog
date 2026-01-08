import { Article } from '@/app/components/types'
import Hero from './Hero'
import Content from './Content'

export const farewellToCambridgeArticle: Article = {
    meta: {
        articleName: 'farewell-to-cambridge',
        title: '再别康桥',
        description: '徐志摩的经典诗歌，以轻盈柔美的笔触描绘了对康桥的依依惜别之情。',
        date: '2024-01-05',
        tags: ['诗歌', '徐志摩', '现代诗'],
        status: 'published',
    },
    Hero,
    Content,
}

export default farewellToCambridgeArticle
