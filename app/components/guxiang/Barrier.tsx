'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function Barrier() {
    const t = useTranslations('guxiang.compare')

    return (
        <section className="relative py-24 px-6 max-w-7xl mx-auto my-24 overflow-hidden">
            {/* The Barrier / Crack */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#8c3f3f] hidden md:block" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#8c3f3f] md:hidden" />

            {/* Title on the barrier */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f0f0f4] px-4 py-2 border border-[#8c3f3f] z-10 text-[#8c3f3f] font-serif text-lg tracking-widest text-center whitespace-nowrap shadow-sm">
                厚障壁
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                {/* Memory: Young Runtu */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-right md:pr-12 space-y-4"
                >
                    <h3 className="text-2xl font-serif text-[#1b3a57]">{t('youngRuntu')}</h3>
                    <div className="space-y-2 text-[#2d3336]/80 font-serif">
                        <p>{t('young.face')}</p>
                        <p className="text-[#f2c04d] font-bold">{t('young.neck')}</p>
                        <p>{t('young.hand')}</p>
                        <p className="text-xl mt-4 text-[#1b3a57]">{t('young.call')}</p>
                    </div>
                </motion.div>

                {/* Reality: Old Runtu */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-left md:pl-12 space-y-4"
                >
                    <h3 className="text-2xl font-serif text-[#6e757c]">{t('oldRuntu')}</h3>
                    <div className="space-y-2 text-[#6e757c] font-serif">
                        <p>{t('old.face')}</p>
                        <p className="text-[#2d3336]">{t('old.head')}</p>
                        <p>{t('old.hand')}</p>
                        <p className="text-xl mt-4 text-[#6e757c] italic">{t('old.call')}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
