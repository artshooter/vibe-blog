'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface HeroProps {
    inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
    const t = useTranslations('chinese-class')

    const content = (
        <div
            className={`relative w-full ${inHome ? 'h-[200px]' : 'h-[60vh] min-h-[500px]'} overflow-hidden flex flex-col justify-center items-center text-center px-8 transition-all duration-700 bg-slate-950`}
        >
            {/* Laboratory Grid & Particles */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

                {/* Floating Creative Particles */}
                {!inHome && [...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-purple-500/20 blur-xl"
                        style={{
                            width: Math.random() * 200 + 100,
                            height: Math.random() * 200 + 100,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, 30, -30, 0],
                            y: [0, -30, 30, 0],
                            scale: [1, 1.1, 0.9, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold tracking-[0.2em] uppercase">
                        CREATIVE LAB • REPORT 01
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`${inHome ? 'text-2xl md:text-4xl' : 'text-5xl md:text-7xl'} font-black text-white mb-6 tracking-tighter`}
                >
                    {t('hero.title')}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className={`${inHome ? 'text-sm text-slate-400' : 'text-xl md:text-2xl text-slate-300'} max-w-2xl mx-auto leading-relaxed font-light italic`}
                >
                    {t('hero.subtitle')}
                </motion.p>

                {!inHome && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-12"
                    >
                        <a
                            href={t('hero.projectLink')}
                            target="_blank"
                            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-slate-950 rounded-full font-bold overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-2xl shadow-white/10"
                        >
                            <span className="relative z-10">{t('hero.clickToRead')}</span>
                            <svg className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:right-8 transition-all" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </motion.div>
                )}
            </div>

            {/* Lab Decoration Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
    )

    if (inHome) {
        return (
            <Link href="/chinese-class" className="block group border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500" prefetch={true}>
                {content}
            </Link>
        )
    }

    return content
}
