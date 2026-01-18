'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import GameUseCases from './GameUseCases'
import ToolComparison from './ToolComparison'
import ExpandableCard from './ExpandableCard'

export default function Content() {
    const t = useTranslations('chinese-class')

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

    return (
        <main className="bg-slate-950 min-h-screen text-slate-300 selection:bg-purple-500/30">
            <BackButton variant="tech" />

            {/* Hero */}
            <Hero />

            {/* 文章内容 */}
            <article className="max-w-4xl mx-auto px-6 py-24">
                {/* Intro Section with Lab Look */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="mb-32 relative"
                >
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-transparent opacity-50" />
                    <div className="pl-8">
                        <h2 className="text-xs font-mono text-purple-400 mb-4 tracking-[0.3em] uppercase">Project Insight</h2>
                        <p className="text-xl md:text-3xl font-light leading-relaxed text-slate-100 italic">
                            {t('content.section1.intro')}
                        </p>
                    </div>
                </motion.section>

                {/* Section 1: Game Assets */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="mb-40"
                >
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 font-mono text-lg">01</div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{t('content.section1.title')}</h2>
                    </div>

                    <div className="bg-slate-900/50 rounded-[40px] p-8 md:p-12 border border-slate-800 shadow-2xl mb-12">
                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
                            {t('content.section1.text')}
                        </p>
                        <GameUseCases />
                    </div>
                </motion.section>

                {/* Section 2: Tips (The Secret Boxes) */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="mb-40"
                >
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400 font-mono text-lg">02</div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{t('content.section2.title')}</h2>
                    </div>

                    <div className="space-y-8">
                        <ExpandableCard
                            title={t('content.section2.tip1.title')}
                            content={t('content.section2.tip1.content')}
                            details={[
                                t('content.section2.tip1.detail1'),
                                t('content.section2.tip1.detail2'),
                            ]}
                            accentColor="purple"
                        />

                        <ExpandableCard
                            title={t('content.section2.tip2.title')}
                            content={[
                                t('content.section2.tip2.content'),
                                t('content.section2.tip2.solution'),
                            ]}
                            details={[
                                t('content.section2.tip2.detail1'),
                                t('content.section2.tip2.detail2'),
                                t('content.section2.tip2.detail3'),
                            ]}
                            accentColor="blue"
                        />
                    </div>
                </motion.section>

                {/* Section 3: Comparison */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={sectionVariants}
                    className="mb-40"
                >
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500 font-mono text-lg">03</div>
                        <h2 className="text-3xl md:text-4xl font-black text-white">{t('content.section3.title')}</h2>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full" />
                        <ToolComparison />
                    </div>
                </motion.section>

                {/* Final Outro */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center pt-24 border-t border-slate-900"
                >
                    <div className="mb-12">
                        <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-6">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                        </div>
                        <p className="text-slate-500 uppercase tracking-[0.5em] text-xs">End of Research Report</p>
                    </div>

                    <a
                        href={t('content.projectLink')}
                        target="_blank"
                        className="inline-flex items-center gap-4 text-3xl md:text-5xl font-black text-white hover:text-purple-400 transition-all group"
                    >
                        Visit Website
                        <span className="text-purple-500 group-hover:translate-x-4 transition-transform text-4xl">↗</span>
                    </a>
                </motion.footer>
            </article>
        </main>
    )
}
