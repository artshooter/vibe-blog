import { ComponentType } from 'react'

export interface ArticleMeta {
  articleName: string
  title: string
  description: string
  date: string
  tags: string[]
  status: 'draft' | 'published'
}

export interface Article {
  meta: ArticleMeta
  Hero: ComponentType<{ inHome?: boolean }>
  Content: ComponentType
}
