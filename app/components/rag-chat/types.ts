export interface Source {
  title: string
  date: string
  score: number
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
  isStreaming?: boolean
}

export interface StreamMetadata {
  type: 'metadata'
  hasRelevantContent: boolean
  sources: Source[]
}

export interface StreamContent {
  type: 'content'
  content: string
}

export interface StreamError {
  type: 'error'
  error: string
}

export type StreamData = StreamMetadata | StreamContent | StreamError
