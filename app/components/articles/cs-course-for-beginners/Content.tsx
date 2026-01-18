'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import LayerModel from './LayerModel'
import BlackBoxDemo from './BlackBoxDemo'

export default function Content() {
    const t = useTranslations('cs-course-for-beginners')

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    }

    return (
        <main className="bg-slate-950 min-h-screen text-slate-200 selection:bg-blue-500/30">
            <BackButton variant="tech" />

            <Hero />

            <article className="max-w-4xl mx-auto px-6 py-24">
                {/* Intro */}
                <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-32 text-center"
                >
                    <p className="text-2xl md:text-3xl font-light text-slate-400 italic leading-relaxed">
                        "{t('content.intro')}"
                    </p>
                </motion.section>

                {/* 培养目标 Section */}
                <section className="mb-32">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/50" />
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            {t('content.target.title')}
                        </h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/50" />
                    </motion.div>

                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-lg md:text-xl text-slate-400 leading-relaxed mb-12 text-center max-w-2xl mx-auto"
                    >
                        {t('content.target.p1')}
                    </motion.p>

                    <LayerModel />
                </section>

                {/* 表层：执行与工程化 */}
                <section className="mb-32">
                    <motion.h3
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-2xl font-bold text-blue-400 mb-6"
                    >
                        {t('content.execution.title')}
                    </motion.h3>
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-slate-400 mb-12"
                    >
                        {t('content.execution.p1')}
                    </motion.p>

                    <BlackBoxDemo />

                    {/* 抽象与调试 */}
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        {[
                            { key: 'item2', color: 'border-blue-500/20' },
                            { key: 'item3', color: 'border-purple-500/20' }
                        ].map((item) => (
                            <motion.div
                                key={item.key}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className={`p-8 bg-slate-900/50 border ${item.color} rounded-2xl`}
                            >
                                <h4 className="text-xl font-bold text-white mb-4">{t(`content.execution.${item.key}.title`)}</h4>
                                <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                                    <p>{t(`content.execution.${item.key}.p1`)}</p>
                                    {item.key === 'item2' && <p>{t(`content.execution.${item.key}.p2`)}</p>}
                                    <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-800 text-slate-500 text-xs">
                                        <span className="text-blue-500 font-bold mr-2 uppercase">Example:</span>
                                        {t(`content.execution.${item.key}.example`)}
                                    </div>
                                    {item.key === 'item3' && <p>{t(`content.execution.${item.key}.p2`)}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-8 text-slate-500 italic text-center text-sm"
                    >
                        {t('content.execution.footer')}
                    </motion.p>
                </section>

                {/* 中层：工程控制层 */}
                <section className="mb-32 relative">
                    <div className="absolute -left-4 -right-4 top-0 bottom-0 bg-indigo-500/5 rounded-[40px] -z-10 blur-xl" />
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="p-12 text-center"
                    >
                        <h3 className="text-3xl font-bold text-indigo-400 mb-8">{t('content.control.title')}</h3>
                        <div className="max-w-2xl mx-auto space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                            <p>{t('content.control.p1')}</p>
                            <p className="p-6 bg-slate-900 border border-indigo-500/20 rounded-2xl shadow-2xl text-slate-200">
                                {t('content.control.p2')}
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* 底层：内生驱动力 */}
                <section className="mb-32">
                    <motion.h3
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-violet-400 mb-8 text-center"
                    >
                        {t('content.motivation.title')}
                    </motion.h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[1, 2].map((i) => (
                            <motion.div
                                key={i}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="p-8 bg-slate-900/40 border border-violet-500/10 rounded-2xl hover:border-violet-500/30 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
                                    {i === 1 ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4" /><path d="m19 8-4 4" /><path d="M22 12h-4" /><path d="m19 16-4-4" /><path d="M12 22v-4" /><path d="m5 16 4-4" /><path d="M2 12h4" /><path d="m5 8 4-4" /></svg>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">{t(`content.motivation.item${i}.title`)}</h4>
                                <p className="text-slate-400 leading-relaxed italic">
                                    {t(`content.motivation.item${i}.p1`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-12 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center"
                    >
                        <p className="text-slate-400 mb-4">{t('content.motivation.p1')}</p>
                        <p className="text-slate-400 mb-4">{t('content.motivation.p2')}</p>
                        <p className="text-slate-400 mb-8">{t('content.motivation.p3')}</p>
                        <div className="inline-block px-6 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 font-bold uppercase tracking-widest text-xs">
                            {t('content.motivation.footer')}
                        </div>
                    </motion.div>
                </section>

                {/* 课程结构设计 */}
                <section className="mb-32">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{t('content.curriculum.title')}</h2>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto text-center">
                            {t('content.curriculum.p1')}
                        </p>
                    </motion.div>

                    {/* 基本概念 */}
                    <div className="space-y-12">
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="p-10 bg-slate-900 rounded-[32px] border border-blue-500/10"
                        >
                            <div className="flex flex-col md:flex-row gap-12">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-blue-400 mb-6">{t('content.curriculum.concepts.title')}</h3>
                                    <p className="text-slate-400 mb-6">{t('content.curriculum.concepts.p1')}</p>

                                    <div className="space-y-6">
                                        <h4 className="text-lg font-bold text-white">{t('content.curriculum.concepts.why.title')}</h4>
                                        <div className="space-y-3">
                                            <p className="text-sm text-slate-400 border-l-2 border-blue-500/30 pl-4">{t('content.curriculum.concepts.why.item1')}</p>
                                            <p className="text-sm text-slate-400 border-l-2 border-blue-500/30 pl-4">{t('content.curriculum.concepts.why.item2')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <h3 className="text-2xl font-bold text-blue-400 mb-6">{t('content.curriculum.concepts.how.title')}</h3>
                                    <p className="text-slate-400 mb-6">{t('content.curriculum.concepts.how.p1')}</p>

                                    <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-blue-300">
                                        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="ml-2 text-slate-500 tracking-tighter">Twitter_Architecture_Mental_Model</span>
                                        </div>
                                        <p className="mb-2">{t('content.curriculum.concepts.how.example.p1')}</p>
                                        <p className="mb-2 text-slate-500">// {t('content.curriculum.concepts.how.example.p2')}</p>
                                        <p className="mb-2">{t('content.curriculum.concepts.how.example.p3')}</p>
                                        <p className="text-green-400">// {t('content.curriculum.concepts.how.example.p4')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 开发练习 */}
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="p-10 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-[32px] border border-blue-500/20 text-center"
                        >
                            <h3 className="text-3xl font-bold text-white mb-6 underline decoration-blue-500 underline-offset-8 decoration-2">{t('content.curriculum.practice.title')}</h3>
                            <p className="text-xl text-slate-300 font-medium mb-6">"{t('content.curriculum.practice.p1')}"</p>
                            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">{t('content.curriculum.practice.p2')}</p>
                        </motion.div>
                    </div>
                </section>

                {/* 写在后面 */}
                <section className="mb-32">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="p-12 bg-slate-900/50 rounded-[48px] border border-slate-800 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-8">{t('content.postscript.title')}</h3>
                        <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                            <p>{t('content.postscript.p1')}</p>
                            <p className="text-slate-200 font-medium border-l-4 border-blue-500 pl-6 py-2">
                                {t('content.postscript.p2')}
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* Home Link */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <a href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-500/10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
                        {t('back')}
                    </a>
                </motion.div>

            </article>
        </main>
    )
}
