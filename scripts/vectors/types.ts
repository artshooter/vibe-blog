export interface ArticleMeta {
  articleName: string
  title: string
  description: string
  date: string
  tags: string[]
  status: 'draft' | 'published'
}

export interface ArticleSource {
  meta: ArticleMeta
  content: string
  locale: string
}

export interface ChunkOptions {
  maxLength: number
  overlap: number
}

export interface Chunk {
  text: string
  index: number
}

export interface VectorRecord {
  text: string
  vector: number[]
  articleName: string
  articleTitle: string
  articleDate: string
  locale: string
  chunkIndex: number
}
