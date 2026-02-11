const EMBEDDING_BASE_URL = process.env.EMBEDDING_BASE_URL!
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL!
const API_KEY = process.env.LLM_API_KEY!

export async function embedQueries(texts: string[]): Promise<number[][]> {
  const response = await fetch(EMBEDDING_BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: texts,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    const error = new Error(`Embedding API error: ${response.status} - ${errorBody}`) as Error & { statusCode: number }
    error.name = 'EmbeddingAPIError'
    error.statusCode = response.status
    throw error
  }

  const data = await response.json()

  // 按 index 排序，确保顺序与输入一致
  const sorted = data.data.sort(
    (a: { index: number }, b: { index: number }) => a.index - b.index
  )

  return sorted.map((item: { embedding: number[] }) => item.embedding)
}
