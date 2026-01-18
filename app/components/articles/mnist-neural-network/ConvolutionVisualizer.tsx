'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

// Sample matrices
const inputMatrix = [
  [1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
]

const kernel = [
  [1, 1, 1],
  [0, 0, 0],
  [-1, -1, -1],
]

// Calculate all output values
const calculateOutputMatrix = () => {
  const output: number[][] = []
  for (let i = 0; i <= inputMatrix.length - kernel.length; i++) {
    const row: number[] = []
    for (let j = 0; j <= inputMatrix[0].length - kernel[0].length; j++) {
      let sum = 0
      for (let ki = 0; ki < kernel.length; ki++) {
        for (let kj = 0; kj < kernel[0].length; kj++) {
          sum += inputMatrix[i + ki][j + kj] * kernel[ki][kj]
        }
      }
      row.push(sum)
    }
    output.push(row)
  }
  return output
}

const outputMatrix = calculateOutputMatrix()

export default function ConvolutionVisualizer() {
  const t = useTranslations('mnist-neural-network')
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const maxSteps = outputMatrix.length * outputMatrix[0].length
  const currentRow = Math.floor(step / outputMatrix[0].length)
  const currentCol = step % outputMatrix[0].length

  const handleNext = () => {
    if (step < maxSteps - 1) {
      setStep(step + 1)
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setStep(0)
    setIsPlaying(false)
  }

  return (
    <div className="bg-[#0d0d0d] rounded-lg border border-[#8be9fd]/20 p-6">
      {/* Title */}
      <div className="mb-4 font-mono text-[#50fa7b] text-sm">
        $ ./convolution --input digit7.png --kernel horizontal
      </div>

      {/* Matrices Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
        {/* Input Matrix */}
        <div>
          <div className="mb-3 text-[#8be9fd] text-sm font-mono">Input Matrix (5×5)</div>
          <div className="inline-block p-3 bg-[#1a1a1a] rounded">
            {inputMatrix.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((val, j) => {
                  const isHighlighted =
                    i >= currentRow &&
                    i < currentRow + 3 &&
                    j >= currentCol &&
                    j < currentCol + 3
                  return (
                    <motion.div
                      key={`${i}-${j}`}
                      className={`w-8 h-8 flex items-center justify-center font-mono text-xs border transition-colors ${
                        isHighlighted
                          ? 'border-[#f1fa8c] bg-[#f1fa8c]/10 text-[#f1fa8c]'
                          : 'border-[#6272a4]/30 text-[#e5e7eb]'
                      }`}
                      animate={isHighlighted ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {val}
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Kernel */}
        <div>
          <div className="mb-3 text-[#8be9fd] text-sm font-mono">Kernel (3×3)</div>
          <div className="inline-block p-3 bg-[#1a1a1a] rounded">
            {kernel.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((val, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="w-8 h-8 flex items-center justify-center font-mono text-xs border border-[#8be9fd]/50 text-[#8be9fd]"
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-[#6272a4] font-mono">
            # Horizontal edge detector
          </div>
        </div>

        {/* Output Matrix */}
        <div>
          <div className="mb-3 text-[#8be9fd] text-sm font-mono">Output Matrix (3×3)</div>
          <div className="inline-block p-3 bg-[#1a1a1a] rounded">
            {outputMatrix.map((row, i) => (
              <div key={i} className="flex gap-1">
                {row.map((val, j) => {
                  const isCurrentOutput = i === currentRow && j === currentCol
                  const isCalculated = i * outputMatrix[0].length + j <= step
                  return (
                    <AnimatePresence mode="wait" key={`${i}-${j}`}>
                      {isCalculated ? (
                        <motion.div
                          className={`w-8 h-8 flex items-center justify-center font-mono text-xs border transition-colors ${
                            isCurrentOutput
                              ? 'border-[#50fa7b] bg-[#50fa7b]/20 text-[#50fa7b]'
                              : 'border-[#6272a4]/50 text-[#e5e7eb]'
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          {val}
                        </motion.div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center font-mono text-xs border border-[#6272a4]/20 text-[#6272a4]/30">
                          ?
                        </div>
                      )}
                    </AnimatePresence>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculation Display */}
      <div className="mb-6 p-4 bg-[#1a1a1a] rounded border border-[#6272a4]/20">
        <div className="font-mono text-xs text-[#6272a4] mb-2">
          &gt; Step {step + 1}/{maxSteps}: Computing output[{currentRow}][{currentCol}]
        </div>
        <div className="font-mono text-sm text-[#e5e7eb]">
          {step < maxSteps ? (
            <>
              <span className="text-[#8be9fd]">Result = </span>
              {kernel.map((kRow, ki) =>
                kRow.map((kVal, kj) => {
                  const inputVal = inputMatrix[currentRow + ki][currentCol + kj]
                  const product = inputVal * kVal
                  return (
                    <span key={`${ki}-${kj}`}>
                      ({inputVal} × {kVal})
                      {ki === kernel.length - 1 && kj === kRow.length - 1 ? '' : ' + '}
                    </span>
                  )
                })
              )}
              <span className="text-[#f1fa8c]"> = {outputMatrix[currentRow][currentCol]}</span>
            </>
          ) : (
            <span className="text-[#50fa7b]">Convolution complete!</span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <button
          onClick={handleReset}
          className="px-4 py-2 font-mono text-sm bg-[#1a1a1a] border border-[#6272a4]/50 text-[#e5e7eb] rounded hover:border-[#8be9fd]/50 hover:text-[#8be9fd] transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-4 py-2 font-mono text-sm bg-[#1a1a1a] border border-[#6272a4]/50 text-[#e5e7eb] rounded hover:border-[#8be9fd]/50 hover:text-[#8be9fd] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        <button
          onClick={handleNext}
          disabled={step >= maxSteps - 1}
          className="px-4 py-2 font-mono text-sm bg-[#50fa7b]/10 border border-[#50fa7b]/50 text-[#50fa7b] rounded hover:bg-[#50fa7b]/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mt-4">
        <div className="h-1 bg-[#1a1a1a] rounded overflow-hidden">
          <motion.div
            className="h-full bg-[#50fa7b]"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / maxSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="mt-2 text-center font-mono text-xs text-[#6272a4]">
          Progress: {Math.round(((step + 1) / maxSteps) * 100)}%
        </div>
      </div>
    </div>
  )
}
