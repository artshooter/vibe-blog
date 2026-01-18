'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

type Rating = 'yes' | 'partial' | 'no' | null

interface Dimension {
  key: string
  rating: Rating
}

export default function SkillEvaluator() {
  const t = useTranslations('three-ways-to-evaluate-ai-skills')
  const [skillName, setSkillName] = useState('')
  const [dimensions, setDimensions] = useState<Dimension[]>([
    { key: 'dimension1', rating: null },
    { key: 'dimension2', rating: null },
    { key: 'dimension3', rating: null },
  ])

  const setRating = (index: number, rating: Rating) => {
    const newDimensions = [...dimensions]
    newDimensions[index].rating = rating
    setDimensions(newDimensions)
  }

  const calculateScore = (): number => {
    const scores: number[] = dimensions.map(d => {
      if (d.rating === 'yes') return 2
      if (d.rating === 'partial') return 1
      return 0
    })
    return scores.reduce((a, b) => a + b, 0)
  }

  const getResult = () => {
    const score = calculateScore()
    const allRated = dimensions.every(d => d.rating !== null)

    if (!allRated) return null

    if (score >= 5) return { level: 'high', color: '#0d9488' }
    if (score >= 3) return { level: 'medium', color: '#eab308' }
    return { level: 'low', color: '#9ca3af' }
  }

  const result = getResult()

  const ratingOptions: { value: Rating; label: string }[] = [
    { value: 'yes', label: t('evaluator.yes') },
    { value: 'partial', label: t('evaluator.partial') },
    { value: 'no', label: t('evaluator.no') },
  ]

  const dimensionLabels = [
    t('hero.dimension1'),
    t('hero.dimension2'),
    t('hero.dimension3'),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200"
    >
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('evaluator.title')}
      </h3>

      {/* 技能名称输入 */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('evaluator.inputLabel')}
        </label>
        <input
          type="text"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder={t('evaluator.inputPlaceholder')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all bg-white"
        />
      </div>

      {/* 三个维度评分 */}
      <div className="space-y-6 mb-8">
        {dimensions.map((dim, index) => (
          <div key={dim.key} className="space-y-2">
            <p className="font-medium text-gray-800">{dimensionLabels[index]}</p>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRating(index, option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    dim.rating === option.value
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 结果展示 */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.level}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center p-6 rounded-xl"
            style={{ backgroundColor: `${result.color}15` }}
          >
            <p className="text-sm text-gray-600 mb-2">{t('evaluator.resultLabel')}</p>
            <p
              className="text-2xl font-bold"
              style={{ color: result.color }}
            >
              {skillName ? `「${skillName}」` : t('evaluator.thisSkill')}
              {t(`evaluator.result.${result.level}`)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && (
        <div className="text-center p-6 bg-gray-50 rounded-xl">
          <p className="text-gray-400">{t('evaluator.hint')}</p>
        </div>
      )}
    </motion.div>
  )
}
