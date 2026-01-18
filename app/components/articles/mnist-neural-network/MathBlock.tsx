'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathBlockProps {
  latex: string
  displayMode?: boolean
  className?: string
}

export default function MathBlock({ latex, displayMode = true, className = '' }: MathBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode,
          throwOnError: false,
          output: 'html',
          trust: false
        })
      } catch (error) {
        console.error('KaTeX rendering error:', error)
        containerRef.current.textContent = latex
      }
    }
  }, [latex, displayMode])

  return (
    <div
      ref={containerRef}
      className={`my-4 overflow-x-auto ${displayMode ? 'text-center' : 'inline'} ${className}`}
      style={{
        fontSize: displayMode ? '1.1em' : 'inherit',
        color: '#e5e7eb'
      }}
    />
  )
}
