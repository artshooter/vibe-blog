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

    // Step 0: Rewrite query with AI (Query Expansion)
    logWithTime('正在分析用户意图...')
    const { expandedQueries, wasRewritten } = await rewriteQuery(question)
    if (wasRewritten) {
      logWithTime(`查询扩展: ${expandedQueries.length} 个变体`)
      expandedQueries.forEach((q, i) => logWithTime(`  [${i + 1}] ${q}`))
    } else {
      logWithTime('查询无需优化')
    }

    // Step 1: Generate embeddings for all expanded queries
    logWithTime('正在生成查询向量...')
    const queryVectors = await Promise.all(
      expandedQueries.map(q => embedQuery(q))
    )
    logWithTime(`生成 ${queryVectors.length} 个查询向量`)

    // Step 2: Retrieve chunks for all queries and merge results
    logWithTime('正在进行向量匹配...')
    const allResults = await Promise.all(
      queryVectors.map(vec => retrieveChunks(vec))
    )

    // Merge and deduplicate by text content, keep highest score
    const chunkMap = new Map<string, typeof allResults[0]['chunks'][0]>()
    for (const result of allResults) {
      for (const chunk of result.chunks) {
        const existing = chunkMap.get(chunk.text)
        if (!existing || chunk.score > existing.score) {
          chunkMap.set(chunk.text, chunk)
        }
      }
    }

    // Sort by score and take top results
    const chunks = Array.from(chunkMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    const hasRelevantContent = chunks.length > 0
    logWithTime(`匹配完成，合并去重后 ${chunks.length} 个相关片段`)
    chunks.forEach((c, i) => {
      logWithTime(`  [${i + 1}] score=${c.score.toFixed(3)} | ${c.articleTitle} | ${c.text.substring(0, 60)}...`)
    })

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
