import path from 'path'
import fs from 'fs'
import * as lancedb from '@lancedb/lancedb'
import { scanArticles } from './scanner'
import { chunkText } from './chunker'
import { Embedder } from './embedder'
import type { VectorRecord } from './types'

const ROOT_DIR = path.resolve(__dirname, '../../')
const DATA_DIR = path.join(ROOT_DIR, 'data')
const DB_PATH = path.join(DATA_DIR, 'vectors.lance')
const TABLE_NAME = 'articles'

async function main() {
  console.log('=== RAG Vector Build ===\n')

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  // Step 1: Scan articles
  console.log('Step 1: Scanning articles...')
  const articles = await scanArticles()

  if (articles.length === 0) {
    console.error('No articles found. Exiting.')
    process.exit(1)
  }

  // Step 2: Chunk articles
  console.log('\nStep 2: Chunking articles...')
  const allRecords: Omit<VectorRecord, 'vector'>[] = []

  for (const article of articles) {
    // 标题 + description 作为第一个 chunk
    const titleChunk = `${article.meta.title}\n${article.meta.description}`
    allRecords.push({
      text: titleChunk,
      articleName: article.meta.articleName,
      articleTitle: article.meta.title,
      articleDate: article.meta.date,
      locale: article.locale,
      chunkIndex: 0,
    })

    // content 的 chunks 从 index 1 开始
    const chunks = chunkText(article.content)
    console.log(`  ${article.meta.articleName}: ${chunks.length + 1} chunks (含标题)`)

    for (const chunk of chunks) {
      allRecords.push({
        text: chunk.text,
        articleName: article.meta.articleName,
        articleTitle: article.meta.title,
        articleDate: article.meta.date,
        locale: article.locale,
        chunkIndex: chunk.index + 1,
      })
    }
  }

  console.log(`\nTotal chunks: ${allRecords.length}`)

  // Step 3: Generate embeddings
  console.log('\nStep 3: Generating embeddings...')
  const embedder = new Embedder()
  await embedder.init()

  const vectorRecords: VectorRecord[] = []
  const texts = allRecords.map(r => r.text)

  const vectors = await embedder.embedBatch(texts, (current, total) => {
    process.stdout.write(`\r  Progress: ${current}/${total} (${Math.round(current / total * 100)}%)`)
  })
  console.log('\n')

  for (let i = 0; i < allRecords.length; i++) {
    vectorRecords.push({
      ...allRecords[i],
      vector: vectors[i],
    })
  }

  // Step 4: Write to LanceDB
  console.log('Step 4: Writing to LanceDB...')

  // Remove existing database if exists
  if (fs.existsSync(DB_PATH)) {
    fs.rmSync(DB_PATH, { recursive: true })
    console.log('  Removed existing database')
  }

  const db = await lancedb.connect(DB_PATH)

  // Create table with vector records
  await db.createTable(TABLE_NAME, vectorRecords as unknown as Record<string, unknown>[])
  console.log(`  Created table "${TABLE_NAME}" with ${vectorRecords.length} records`)

  // Step 5: Verify
  console.log('\nStep 5: Verifying...')
  const table = await db.openTable(TABLE_NAME)
  const count = await table.countRows()
  console.log(`  Table has ${count} rows`)
  console.log(`  Vector dimension: ${embedder.getDimension()}`)

  console.log('\n=== Build Complete ===')
  console.log(`Database location: ${DB_PATH}`)
}

main().catch(error => {
  console.error('Build failed:', error)
  process.exit(1)
})
