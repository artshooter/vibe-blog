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

    if (score >= 5) return { level: 'high', color: '#0d9488', bg: 'bg-teal-50', text: 'text-teal-900 border-teal-200' }
    if (score >= 3) return { level: 'medium', color: '#eab308', bg: 'bg-amber-50', text: 'text-amber-900 border-amber-200' }
    return { level: 'low', color: '#9ca3af', bg: 'bg-slate-100', text: 'text-slate-900 border-slate-200' }
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50"
    >
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
          {t('evaluator.title')}
        </h3>
        <p className="text-slate-500 font-light">{t('evaluator.hint')}</p>
      </div>

      <div className="max-w-xl mx-auto">
        {/* 技能名称输入 */}
        <div className="mb-12">
          <label className="block text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
            {t('evaluator.inputLabel')}
          </label>
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            placeholder={t('evaluator.inputPlaceholder')}
            className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/5 outline-none transition-all text-lg font-medium text-slate-800"
          />
        </div>

        {/* 三个维度评分 */}
        <div className="space-y-10 mb-12">
          {dimensions.map((dim, index) => (
            <div key={dim.key} className="space-y-4">
              <p className="font-bold text-slate-800 tracking-tight">{dimensionLabels[index]}</p>
              <div className="flex flex-wrap gap-3">
                {ratingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRating(index, option.value)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${dim.rating === option.value
                        ? 'bg-[#1e3a5f] text-white shadow-lg shadow-blue-900/20'
                        : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-transparent'
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`text-center p-8 rounded-3xl border ${result.bg} ${result.text} shadow-sm`}
            >
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4">{t('evaluator.resultLabel')}</p>
              <p className="text-2xl md:text-3xl font-bold">
                {skillName ? (
                  <span className="block mb-1 text-inherit opacity-80 font-medium text-lg">「{skillName}」</span>
                ) : (
                  <span className="block mb-1 text-inherit opacity-80 font-medium text-lg">{t('evaluator.thisSkill')}</span>
                )}
                {t(`evaluator.result.${result.level}`)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
