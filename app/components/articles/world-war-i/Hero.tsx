
'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'

export default function Hero({ inHome = false }: { inHome?: boolean }) {
    if (inHome) {
        return (
            <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-[#1a1816]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596825205490-7288e2c72b2e?q=80&w=2960&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale sepia-[0.5]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816] via-transparent to-transparent" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-3 py-1 mb-4 text-xs tracking-[0.2em] text-[#8c7b65] border border-[#4a4238] uppercase">
                            1914 - 1918
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#e3d8c8] mb-6 tracking-tight">
                            The Great War
                        </h1>
                        <p className="max-w-2xl text-lg text-[#a69b8b] mb-8 font-light leading-relaxed">
                            一场重塑世界秩序的全球性军事冲突。从萨拉热窝的枪声到凡尔赛的合约，回顾人类历史的至暗时刻。
                        </p>
                        <Link
                            href="/world-war-i"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#4a4238] border border-[#8c7b65] text-[#e3d8c8] hover:bg-[#8c7b65] hover:text-[#1a1816] transition-all duration-500 font-serif uppercase tracking-widest group"
                        >
                            <span>Enter the Trenches</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-[80vh] w-full overflow-hidden bg-[#1a1816]">
            {/* Parallax Background Effect could be added here */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596825205490-7288e2c72b2e?q=80&w=2960&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale sepia-[0.5]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1a1816]" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8 pt-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="border-t border-b border-[#8c7b65]/30 py-12 px-4 md:px-20 backdrop-blur-sm bg-black/20"
                >
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-[#e3d8c8] mb-2 tracking-tighter uppercase relative">
                        World War I
                        <span className="absolute -top-4 -right-4 text-sm font-normal tracking-widest text-[#8c7b65] opacity-50">1914-1918</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-serif text-[#8c7b65] mt-4 tracking-wide">
                        第一次世界大战
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8c7b65]/60"
                >
                    <span className="text-xs uppercase tracking-[0.3em]">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#8c7b65]/60 to-transparent" />
                </motion.div>
            </div>
        </div>
    )
}
