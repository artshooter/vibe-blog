'use client'

import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface HeroProps {
    inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {
    const t = useTranslations('cs-course-for-beginners')

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.8, staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const content = (
        <div
            className={`relative w-full ${inHome ? 'h-[200px]' : 'h-[60vh] min-h-[400px]'} overflow-hidden flex flex-col justify-center items-center text-center px-8 transition-all duration-700 bg-slate-950`}
        >
            {/* Blueprint Grid Effect */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Decorative Nodes/Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <motion.circle
                    cx="20%" cy="30%" r="4" fill="#3b82f6"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.circle
                    cx="80%" cy="70%" r="3" fill="#8b5cf6"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                />
                <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="5,5" />
            </svg>

            {/* Hero Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants} className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-4 tracking-wider uppercase">
                    AI Era Curriculum Design
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className={`${inHome ? 'text-xl md:text-2xl' : 'text-3xl md:text-6xl'} font-bold text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300`}
                >
                    {t('hero.title')}
                </motion.h1>

                {!inHome && (
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        {t('hero.subtitle')}
                    </motion.p>
                )}
            </motion.div>

            {/* Lighting effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />

            {/* Hover effect for home card */}
            {inHome && (
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
            )}
        </div>
    )

    if (inHome) {
        return (
            <Link href="/cs-course-for-beginners" className="block group border border-slate-800 hover:border-blue-500/50 transition-all duration-500 rounded-xl overflow-hidden" prefetch={true}>
                {content}
            </Link>
        )
    }

    return content
}
