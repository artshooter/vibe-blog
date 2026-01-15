import { NextRequest } from 'next/server'
import { embedQuery } from '@/app/lib/rag/embedder-runtime'
import { retrieveChunks } from '@/app/lib/rag/retriever'
import { streamChat } from '@/app/lib/rag/llm'
import { rewriteQuery } from '@/app/lib/rag/query-rewriter'

export const runtime = 'nodejs'
export const maxDuration = 60

function logWithTime(message: string) {
  const now = new Date()
  const timeString = now.toLocaleTimeString('zh-CN', { hour12: false })
  console.log(`[RAG ${timeString}] ${message}`)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { question } = body

    if (!question || typeof question !== 'string') {
      return Response.json(
        { error: 'Missing or invalid question' },
        { status: 400 }
      )
    }

    // Step 0: Rewrite query with AI
    logWithTime('正在分析用户意图...')
    const { rewrittenQuery, wasRewritten } = await rewriteQuery(question)
    if (wasRewritten) {
      logWithTime(`查询优化: "${question}" → "${rewrittenQuery}"`)
    } else {
      logWithTime('查询无需优化')
    }

    // Step 1: Generate query embedding (使用优化后的查询)
    logWithTime('正在生成查询向量...')
    const queryVector = await embedQuery(rewrittenQuery)
    logWithTime(`查询向量生成完成 (维度: ${queryVector.length})`)
    console.log(queryVector) // Print the full vector as requested

    // Step 2: Retrieve relevant chunks
    logWithTime('正在进行向量匹配...')
    const { chunks, hasRelevantContent } = await retrieveChunks(queryVector)
    logWithTime(`匹配完成，找到 ${chunks.length} 个相关片段`)

    // Step 3: Stream response from LLM
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send metadata first
          const metadata = {
            type: 'metadata',
            hasRelevantContent,
            sources: chunks.map(c => ({
              title: c.articleTitle,
              date: c.articleDate,
              score: Math.round(c.score * 100) / 100,
              slug: c.articleName,
            })),
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`))

          // Stream LLM response
          logWithTime('正在调用大语言模型接口...')
          for await (const chunk of streamChat(question, chunks, hasRelevantContent)) {
            const data = { type: 'content', content: chunk }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          const errorData = { type: 'error', error: errorMessage }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('[RAG] Error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return Response.json({ error: message }, { status: 500 })
  }
}
