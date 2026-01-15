import { NextRequest } from 'next/server'
import { embedQuery } from '@/app/lib/rag/embedder-runtime'
import { retrieveChunks } from '@/app/lib/rag/retriever'
import { streamChat } from '@/app/lib/rag/llm'

export const runtime = 'nodejs'
export const maxDuration = 60

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

    // Step 1: Generate query embedding
    const queryVector = await embedQuery(question)

    // Step 2: Retrieve relevant chunks
    const { chunks, hasRelevantContent } = await retrieveChunks(queryVector)

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
            })),
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`))

          // Stream LLM response
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
