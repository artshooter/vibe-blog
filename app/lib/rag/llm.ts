import type { RetrievedChunk } from './retriever'

const MAX_CONTEXT_LENGTH = 2000 // Max characters for context

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function buildContextFromChunks(chunks: RetrievedChunk[]): string {
  let context = ''

  for (const chunk of chunks) {
    const entry = `【来自《${chunk.articleTitle}》${chunk.articleDate}】\n${chunk.text}\n\n`
    if (context.length + entry.length > MAX_CONTEXT_LENGTH) break
    context += entry
  }

  return context.trim()
}

function buildPrompt(question: string, chunks: RetrievedChunk[], hasRelevantContent: boolean): ChatMessage[] {
  if (hasRelevantContent) {
    const context = buildContextFromChunks(chunks)
    return [
      {
        role: 'system',
        content: `你是一个博客助手，帮助读者了解博主的文章内容和观点。

回答要求：
1. 基于提供的博客内容回答问题
2. 如果内容中有明确的观点，请准确传达
3. 可以适当总结和归纳，但不要曲解原意
4. 回答简洁明了，不要过于冗长
5. 如果博客内容只是部分相关，可以结合你的知识补充，但要说明哪些是博主的观点，哪些是你的补充`
      },
      {
        role: 'user',
        content: `以下是博客中的相关内容：

${context}

---

读者的问题：${question}`
      }
    ]
  } else {
    return [
      {
        role: 'system',
        content: `你是一个博客助手。读者问了一个问题，但博客中没有相关内容。

回答要求：
1. 先简短说明博主的文章中没有直接涉及这个话题
2. 然后基于你的知识给出一个有帮助的回答
3. 明确说明这是 AI 的回答，不代表博主观点
4. 回答简洁实用`
      },
      {
        role: 'user',
        content: question
      }
    ]
  }
}

export async function* streamChat(
  question: string,
  chunks: RetrievedChunk[],
  hasRelevantContent: boolean
): AsyncGenerator<string> {
  const apiKey = process.env.LLM_API_KEY
  const model = process.env.LLM_MODEL || 'Pro/zai-org/GLM-4.7'
  const baseUrl = process.env.LLM_BASE_URL || 'https://api.siliconflow.cn/v1'

  if (!apiKey) {
    throw new Error('LLM_API_KEY is not configured')
  }

  const messages = buildPrompt(question, chunks, hasRelevantContent)

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`LLM API error: ${response.status} ${error}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('No response body')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed === 'data: [DONE]') continue
      if (!trimmed.startsWith('data: ')) continue

      try {
        const json = JSON.parse(trimmed.slice(6))
        const content = json.choices?.[0]?.delta?.content
        if (content) {
          yield content
        }
      } catch {
        // Skip invalid JSON
      }
    }
  }
}

export async function chat(
  question: string,
  chunks: RetrievedChunk[],
  hasRelevantContent: boolean
): Promise<string> {
  let result = ''
  for await (const chunk of streamChat(question, chunks, hasRelevantContent)) {
    result += chunk
  }
  return result
}
