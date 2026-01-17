import type { Chunk, ChunkOptions } from './types'

const DEFAULT_OPTIONS: ChunkOptions = {
  maxLength: 128,
  overlap: 20,
}

export function chunkText(text: string, options: Partial<ChunkOptions> = {}): Chunk[] {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  const chunks: Chunk[] = []

  // Clean up the text
  const cleanedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  // Split by major separators first (--- or ## headings)
  const majorSections = cleanedText.split(/(?:^|\n)(?:---|\#{2,}\s)/m)

  let currentChunk = ''
  let chunkIndex = 0

  for (const section of majorSections) {
    const trimmedSection = section.trim()
    if (!trimmedSection) continue

    // If section fits in one chunk, add it
    if (trimmedSection.length <= opts.maxLength) {
      if (currentChunk.length + trimmedSection.length + 2 <= opts.maxLength) {
        currentChunk = currentChunk ? `${currentChunk}\n\n${trimmedSection}` : trimmedSection
      } else {
        if (currentChunk) {
          chunks.push({ text: currentChunk, index: chunkIndex++ })
        }
        currentChunk = trimmedSection
      }
    } else {
      // Section too long, need to split by paragraphs
      if (currentChunk) {
        chunks.push({ text: currentChunk, index: chunkIndex++ })
        currentChunk = ''
      }

      const paragraphs = trimmedSection.split(/\n\n+/)

      for (const paragraph of paragraphs) {
        const trimmedPara = paragraph.trim()
        if (!trimmedPara) continue

        if (trimmedPara.length <= opts.maxLength) {
          if (currentChunk.length + trimmedPara.length + 2 <= opts.maxLength) {
            currentChunk = currentChunk ? `${currentChunk}\n\n${trimmedPara}` : trimmedPara
          } else {
            if (currentChunk) {
              chunks.push({ text: currentChunk, index: chunkIndex++ })
            }
            currentChunk = trimmedPara
          }
        } else {
          // Paragraph too long, split by sentences
          if (currentChunk) {
            chunks.push({ text: currentChunk, index: chunkIndex++ })
            currentChunk = ''
          }

          const sentences = splitBySentences(trimmedPara)
          for (const sentence of sentences) {
            if (currentChunk.length + sentence.length + 1 <= opts.maxLength) {
              currentChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence
            } else {
              if (currentChunk) {
                chunks.push({ text: currentChunk, index: chunkIndex++ })
              }
              // If single sentence exceeds maxLength, split by maxLength
              if (sentence.length > opts.maxLength) {
                const subChunks = splitByLength(sentence, opts.maxLength, opts.overlap)
                for (const sub of subChunks) {
                  chunks.push({ text: sub, index: chunkIndex++ })
                }
                currentChunk = ''
              } else {
                currentChunk = sentence
              }
            }
          }
        }
      }
    }
  }

  // Don't forget the last chunk
  if (currentChunk) {
    chunks.push({ text: currentChunk, index: chunkIndex })
  }

  return chunks
}

function splitBySentences(text: string): string[] {
  // Split by Chinese and English sentence endings
  const sentences = text.split(/(?<=[。！？.!?])\s*/)
  return sentences.filter(s => s.trim())
}

function splitByLength(text: string, maxLength: number, overlap: number): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + maxLength, text.length)
    chunks.push(text.slice(start, end))
    start = end - overlap
    if (start >= text.length - overlap) break
  }

  return chunks
}
