import 'dotenv/config'

const EMBEDDING_BASE_URL = process.env.EMBEDDING_BASE_URL!
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL!
const API_KEY = process.env.LLM_API_KEY!

const BATCH_SIZE = 32 // API 最大支持 32 个 items 一次请求

export class Embedder {
  async init(): Promise<void> {
    console.log(`Using embedding API: ${EMBEDDING_MODEL}`)
  }

  async embedBatch(
    texts: string[],
    onProgress?: (current: number, total: number) => void
  ): Promise<number[][]> {
    const results: number[][] = []
    const totalBatches = Math.ceil(texts.length / BATCH_SIZE)

    console.log(`  Total texts: ${texts.length}, Batch size: ${BATCH_SIZE}, Total batches: ${totalBatches}`)

    // 分批处理，每批最多 32 个
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batchIndex = Math.floor(i / BATCH_SIZE) + 1
      const batch = texts.slice(i, i + BATCH_SIZE)

      console.log(`  [Batch ${batchIndex}/${totalBatches}] Sending ${batch.length} texts...`)

      const response = await fetch(EMBEDDING_BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: EMBEDDING_MODEL,
          input: batch,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`  [Batch ${batchIndex}] Failed!`)
        throw new Error(`Embedding API error: ${response.status} - ${errorBody}`)
      }

      const data = await response.json()
      console.log(`  [Batch ${batchIndex}] Received ${data.data.length} embeddings, tokens used: ${data.usage?.total_tokens || 'N/A'}`)

      // 按 index 排序后再提取 embedding，确保顺序与输入一致
      const sorted = data.data.sort(
        (a: { index: number }, b: { index: number }) => a.index - b.index
      )
      for (const item of sorted) {
        results.push(item.embedding)
      }

      if (onProgress) {
        onProgress(Math.min(i + BATCH_SIZE, texts.length), texts.length)
      }
    }

    console.log(`  All batches complete. Total embeddings: ${results.length}`)
    return results
  }

  getDimension(): number {
    return 1024 // BAAI/bge-large-zh-v1.5 output dimension
  }
}
