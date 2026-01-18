'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function BlackBoxDemo() {
    const t = useTranslations('cs-course-for-beginners')
    const [isVisible, setIsVisible] = useState(false)

    const dataStream = [
        { id: 1, type: 'input', label: 'User Input: "How to code?"' },
        { id: 2, type: 'process', label: 'Processing Prompt...' },
        { id: 3, type: 'logic', label: 'LLM Reasoning...' },
        { id: 4, type: 'output', label: 'Result: "Start with Python!"' },
    ]

    return (
        <div className="my-16 p-8 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-4">
                        {t('content.execution.item1.title')}
                    </h4>
                    <p className="text-slate-400 leading-relaxed mb-6 italic">
                        {t('content.execution.item1.p1')}
                    </p>
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${isVisible
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-blue-500/50'
                            }`}
                    >
                        {isVisible ? '关闭可观测性' : '开启可观测性 (Add Logging)'}
                    </button>
                </div>

                <div className="flex-1 w-full max-w-[300px] aspect-square relative flex items-center justify-center">
                    {/* Box Outline */}
                    <div className="absolute inset-0 border-2 border-slate-700 rounded-2xl" />

                    {/* Black Box Background */}
                    <motion.div
                        animate={{
                            backgroundColor: isVisible ? 'rgba(30, 41, 59, 0.4)' : '#0f172a',
                            backdropFilter: isVisible ? 'blur(4px)' : 'blur(0px)'
                        }}
                        className="absolute inset-0 rounded-2xl z-20 pointer-events-none transition-colors duration-1000"
                    />

                    {/* Internal Content (Visible when box is transparent) */}
                    <div className="relative z-10 w-full p-6 flex flex-col gap-4">
                        {dataStream.map((item, i) => (
                            <div key={item.id} className="relative">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
                                    transition={{ delay: isVisible ? i * 0.2 : 0 }}
                                    className="text-xs font-mono py-1.5 px-3 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400"
                                >
                                    {item.label}
                                </motion.div>
                                {i < dataStream.length - 1 && (
                                    <motion.div
                                        animate={{ opacity: isVisible ? 0.3 : 0 }}
                                        className="h-4 w-0.5 bg-blue-500/50 mx-auto"
                                    />
                                )}
                            </div>
                        ))}
                        {!isVisible && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-sm"
                            >
                                Black Box
                            </motion.div>
                        )}
                    </div>

                    {/* Glowing pulse */}
                    {!isVisible && (
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-blue-500/20 rounded-2xl"
                        />
                    )}
                </div>
            </div>

            <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-sm text-slate-500 leading-relaxed">
                    {t('content.execution.item1.example')}
                </p>
            </div>
        </div>
    )
}
