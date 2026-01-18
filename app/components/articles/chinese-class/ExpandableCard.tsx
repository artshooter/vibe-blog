'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExpandableCardProps {
    title: string
    content: string | string[]
    details: string[]
    accentColor?: 'purple' | 'blue'
}

export default function ExpandableCard({
    title,
    content,
    details,
    accentColor = 'purple'
}: ExpandableCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    const colors = {
        purple: {
            bg: 'bg-purple-500/5',
            border: 'border-purple-500/20',
            text: 'text-purple-400',
            glow: 'shadow-purple-500/10'
        },
        blue: {
            bg: 'bg-blue-500/5',
            border: 'border-blue-500/20',
            text: 'text-blue-400',
            glow: 'shadow-blue-500/10'
        }
    }

    const color = colors[accentColor]

    return (
        <div
            className={`group relative rounded-[32px] border ${color.border} ${color.bg} transition-all duration-500 overflow-hidden shadow-2xl ${color.glow}`}
        >
            {/* Header / Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-8 md:p-10 flex items-center justify-between gap-6"
            >
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    {!isOpen && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-2 text-slate-500 text-sm line-clamp-1"
                        >
                            {Array.isArray(content) ? content[0] : content}
                        </motion.p>
                    )}
                </div>

                <div className={`w-10 h-10 rounded-full bg-slate-900 border ${color.border} flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </button>

            {/* Content Area */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-8 pb-10 md:px-10 md:pb-12 border-t border-slate-900 pt-8">
                            <div className="space-y-6">
                                {Array.isArray(content) ? (
                                    content.map((p, i) => (
                                        <p key={i} className={`text-lg leading-relaxed ${i === 1 ? 'font-bold text-slate-200 py-4 border-y border-slate-900' : 'text-slate-400'}`}>
                                            {p}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-lg text-slate-400 leading-relaxed">{content}</p>
                                )}

                                <div className="pt-6 grid gap-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Findings / Details</p>
                                    {details.map((detail, i) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-900 text-sm md:text-base text-slate-400">
                                            <span className={color.text}>•</span>
                                            {detail}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Accent corner (Gold Insight) */}
            <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]" />
            </div>
        </div>
    )
}
