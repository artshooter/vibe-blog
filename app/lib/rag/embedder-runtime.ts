import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers'

const MODEL_NAME = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2'

let model: FeatureExtractionPipeline | null = null
let initPromise: Promise<void> | null = null

async function initModel(): Promise<void> {
  if (model) return
  if (initPromise) {
    await initPromise
    return
  }

  initPromise = (async () => {
    console.log('[RAG] Loading embedding model...')
    model = await pipeline('feature-extraction', MODEL_NAME)
    console.log('[RAG] Model loaded')
  })()

  await initPromise
}

export async function embedQuery(text: string): Promise<number[]> {
  await initModel()

  if (!model) {
    throw new Error('Embedding model not initialized')
  }

  const output = await model(text, {
    pooling: 'mean',
    normalize: true,
  })

  return Array.from(output.data as Float32Array)
}
