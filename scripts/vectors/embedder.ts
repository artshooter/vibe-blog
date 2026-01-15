import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers'

const MODEL_NAME = 'Xenova/paraphrase-multilingual-MiniLM-L12-v2'

export class Embedder {
  private model: FeatureExtractionPipeline | null = null
  private initialized = false

  async init(): Promise<void> {
    if (this.initialized) return

    console.log(`Loading embedding model: ${MODEL_NAME}`)
    console.log('This may take a few minutes on first run (downloading ~470MB)...')

    this.model = await pipeline('feature-extraction', MODEL_NAME)
    this.initialized = true

    console.log('Model loaded successfully')
  }

  async embed(text: string): Promise<number[]> {
    if (!this.model) {
      throw new Error('Embedder not initialized. Call init() first.')
    }

    const output = await this.model(text, {
      pooling: 'mean',
      normalize: true,
    })

    return Array.from(output.data as Float32Array)
  }

  async embedBatch(texts: string[], onProgress?: (current: number, total: number) => void): Promise<number[][]> {
    const results: number[][] = []

    for (let i = 0; i < texts.length; i++) {
      results.push(await this.embed(texts[i]))
      if (onProgress) {
        onProgress(i + 1, texts.length)
      }
    }

    return results
  }

  getDimension(): number {
    return 384 // paraphrase-multilingual-MiniLM-L12-v2 output dimension
  }
}
