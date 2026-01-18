'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function ToolComparison() {
    const t = useTranslations('chinese-class')

    const tools = [
        {
            name: 'Nana Banana',
            accent: 'text-purple-400',
            bg: 'bg-purple-500/5',
            border: 'border-purple-500/20',
            badge: 'Current Choice'
        },
        {
            name: 'MidJourney',
            accent: 'text-blue-400',
            bg: 'bg-blue-500/5',
            border: 'border-blue-500/20',
            badge: 'Visual King'
        }
    ]

    const metrics = [
        { label: 'Control & Logic', nana: 90, mj: 60, icon: '🧠' },
        { label: 'Aesthetics', nana: 75, mj: 95, icon: '🎨' },
        { label: 'Ease of Use', nana: 85, mj: 70, icon: '⚡' }
    ]

    const toolNames = ['NB', 'MJ']

    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
                {tools.map((tool, i) => (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className={`p-8 rounded-[32px] border ${tool.border} ${tool.bg} ring-1 ring-white/5 shadow-2xl`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h3 className={`text-2xl font-black ${tool.accent}`}>{tool.name}</h3>
                            <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500">{tool.badge}</span>
                        </div>

                        <p className="text-slate-400 leading-relaxed text-sm h-24 overflow-y-auto">
                            {i === 0 ? t('content.section3.intro') : t('content.section3.point2.content')}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Visual Metrics Comparison Table */}
            <div className="bg-slate-900/30 rounded-[40px] border border-slate-800 p-8 md:p-12">
                <h4 className="text-center text-slate-500 uppercase tracking-[0.3em] text-xs mb-12">Performance Metrics (Estimate)</h4>

                <div className="space-y-10">
                    {metrics.map((metric, i) => (
                        <div key={metric.label}>
                            <div className="flex justify-between mb-4 items-center">
                                <span className="font-bold text-slate-200 flex items-center gap-2">
                                    <span className="text-xl">{metric.icon}</span>
                                    {metric.label}
                                </span>
                            </div>

                            <div className="relative h-6 bg-slate-950 rounded-full border border-slate-800 p-1 flex items-center">
                                {/* MidJourney Bar (Total) */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${metric.mj}%` }}
                                    className="absolute left-1 top-1 bottom-1 bg-blue-500/30 rounded-full border-r border-blue-400/50"
                                />
                                {/* Nana Banana Bar (Overlay) */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${metric.nana}%` }}
                                    className="absolute left-1 top-1 bottom-1 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-end px-3"
                                >
                                    <span className="text-[10px] font-black text-white/50">{toolNames[0]}</span>
                                </motion.div>

                                {/* Indicator Labels */}
                                <div className="absolute inset-0 flex justify-between px-6 items-center pointer-events-none text-[8px] font-bold text-slate-600">
                                    <span>BASIC</span>
                                    <span>ADVANCED</span>
                                    <span>PRO</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4 items-start">
                    <span className="text-xl">💡</span>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        <span className="text-amber-500 font-bold">Insight:</span> {t('content.section3.point1.content')}
                    </p>
                </div>
            </div>
        </div>
    )
}
