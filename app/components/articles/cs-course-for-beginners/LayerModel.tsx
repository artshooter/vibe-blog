'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function LayerModel() {
    const t = useTranslations('cs-course-for-beginners')
    const [activeLayer, setActiveLayer] = useState<number | null>(0)

    const layers = [
        {
            id: 0,
            name: t('content.target.model.layer1.name'),
            desc: t('content.target.model.layer1.desc'),
            color: 'bg-blue-600',
            borderColor: 'border-blue-400',
            lightColor: 'text-blue-200',
            shadow: 'shadow-blue-500/20'
        },
        {
            id: 1,
            name: t('content.target.model.layer2.name'),
            desc: t('content.target.model.layer2.desc'),
            color: 'bg-indigo-600',
            borderColor: 'border-indigo-400',
            lightColor: 'text-indigo-200',
            shadow: 'shadow-indigo-500/20'
        },
        {
            id: 2,
            name: t('content.target.model.layer3.name'),
            desc: t('content.target.model.layer3.desc'),
            color: 'bg-violet-600',
            borderColor: 'border-violet-400',
            lightColor: 'text-violet-200',
            shadow: 'shadow-violet-500/20'
        }
    ]

    return (
        <div className="my-16 py-8 px-4 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm">
            <h3 className="text-center text-slate-400 text-sm font-medium mb-10 tracking-widest uppercase">
                {t('content.target.model.intro')}
            </h3>

            <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
                {layers.map((layer, index) => (
                    <motion.div
                        key={layer.id}
                        layout
                        onClick={() => setActiveLayer(layer.id)}
                        className={`cursor-pointer relative w-full p-6 rounded-2xl border ${layer.borderColor} ${layer.color} ${layer.shadow} shadow-lg transition-all duration-300 group`}
                        initial={false}
                        animate={{
                            scale: activeLayer === layer.id ? 1.02 : 1,
                            zIndex: activeLayer === layer.id ? 10 : 1,
                            opacity: activeLayer !== null && activeLayer !== layer.id ? 0.6 : 1
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-white font-bold text-lg">{layer.name}</span>
                            <motion.div
                                animate={{ rotate: activeLayer === layer.id ? 180 : 0 }}
                                className="text-white/50 group-hover:text-white transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </motion.div>
                        </div>

                        <AnimatePresence>
                            {activeLayer === layer.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className={`mt-4 ${layer.lightColor} leading-relaxed`}>
                                        {layer.desc}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Hover indicator */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl`} />
                    </motion.div>
                ))}
            </div>

            <div className="mt-10 text-center text-slate-500 text-xs italic">
                点击每一层查看详细定义
            </div>
        </div>
    )
}
