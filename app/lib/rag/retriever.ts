import * as lancedb from '@lancedb/lancedb'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data/vectors.lance')
const TABLE_NAME = 'articles'
const TOP_K = 5
const MIN_SIMILARITY = 0.35 // Minimum cosine similarity threshold

export interface RetrievedChunk {
  text: string
  articleName: string
  articleTitle: string
  articleDate: string
  score: number
}

export interface RetrievalResult {
  chunks: RetrievedChunk[]
  hasRelevantContent: boolean
}

let dbConnection: lancedb.Connection | null = null
let tableInstance: lancedb.Table | null = null

async function getTable(): Promise<lancedb.Table> {
  if (!tableInstance) {
    dbConnection = await lancedb.connect(DB_PATH)
    tableInstance = await dbConnection.openTable(TABLE_NAME)
  }
  return tableInstance
}

export async function retrieveChunks(queryVector: number[]): Promise<RetrievalResult> {
  const table = await getTable()

  const results = await table
    .vectorSearch(queryVector)
    .limit(TOP_K)
    .toArray()

  // LanceDB returns _distance (L2 distance), convert to similarity score
  // For normalized vectors, similarity ≈ 1 - distance/2
  const chunks: RetrievedChunk[] = results
    .map(row => ({
      text: row.text as string,
      articleName: row.articleName as string,
      articleTitle: row.articleTitle as string,
      articleDate: row.articleDate as string,
      score: 1 - (row._distance as number) / 2,
    }))
    .filter(chunk => chunk.score >= MIN_SIMILARITY)

  return {
    chunks,
    hasRelevantContent: chunks.length > 0,
  }
}
