'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function GameUseCases() {
    const t = useTranslations('chinese-class')

    const items = [
        { key: 'item1', icon: '💬', color: 'from-purple-500/20 to-transparent' },
        { key: 'item2', icon: '🗺️', color: 'from-blue-500/20 to-transparent' },
        { key: 'item3', icon: '💖', color: 'from-pink-500/20 to-transparent' }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, i) => (
                <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative group p-6 rounded-3xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden`}
                >
                    {/* Background Highlight */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2">
                            {t(`content.section1.items.${item.key}`)}
                        </h3>
                        <div className="w-8 h-0.5 bg-slate-800 group-hover:w-16 group-hover:bg-slate-500 transition-all duration-500" />
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-slate-800/50 group-hover:bg-slate-700 transition-colors" />
                </motion.div>
            ))}
        </div>
    )
}
