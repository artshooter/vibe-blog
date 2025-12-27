export interface ArticleMeta {
  slug: string
  title: string
  description: string
  tags: string[]
  publishedAt: string
}

export const articles: ArticleMeta[] = [
  {
    slug: 'world-war-one',
    title: '第一次世界大战',
    description: '从萨拉热窝的一声枪响，到改变世界的四年战争。探索战争如何从局部冲突升级为全球灾难。',
    tags: ['历史', '战争', '欧洲', '20世纪'],
    publishedAt: '2025-12-27',
  },
]
