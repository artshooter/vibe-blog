
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phases = [
    {
        id: '1914',
        title: '战火初燃',
        period: '1914',
        description: '战争初期，各国怀揣速决战幻想。西线从运动战迅速转入战壕战，陷入僵局。',
        bg: 'https://images.unsplash.com/photo-1595111953931-3c4179377465?q=80&w=2695&auto=format&fit=crop', // Trenches/Soldiers
    },
    {
        id: '1915-16',
        title: '残酷僵持',
        period: '1915-1916',
        description: '旷日持久的消耗战。凡尔登战役和索姆河战役造成了数百万人的伤亡，却未能改变战局。',
        bg: 'https://images.unsplash.com/photo-1626292377312-38379c137452?q=80&w=2576&auto=format&fit=crop', // Mud/Desolation
    },
    {
        id: '1917',
        title: '决定性变局',
        period: '1917',
        description: '沙俄因国内革命退出战争，美国正式参战。战争的平衡开始被打破。',
        bg: 'https://images.unsplash.com/photo-1549643276-8df7d9d06859?q=80&w=2574&auto=format&fit=crop', // Revolution/Crowd
    },
    {
        id: '1918',
        title: '终结与崩溃',
        period: '1918',
        description: '协约国发动百日攻势，同盟国节节败退。最终，德国签署停战协议，一战结束。',
        bg: 'https://images.unsplash.com/photo-1533552097335-e160a0279601?q=80&w=2656&auto=format&fit=crop', // Armistice/Peace
    },
]

export default function WarPhases() {
    const [activeId, setActiveId] = useState(phases[0].id)
    const activePhase = phases.find(p => p.id === activeId) || phases[0]

    return (
        <div className="py-20 relative overflow-hidden rounded-2xl bg-[#1e1c1a]">
            {/* Background Image with Transition */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activePhase.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-cover bg-center grayscale sepia"
                    style={{ backgroundImage: `url(${activePhase.bg})` }}
                />
            </AnimatePresence>

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-serif font-bold text-[#e3d8c8] text-center mb-12">
                    战争进程
                </h2>

                {/* Phase Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {phases.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setActiveId(phase.id)}
                            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${activeId === phase.id
                                    ? 'bg-[#8c7b65] text-[#1a1816] border-[#8c7b65] font-bold shadow-[0_0_15px_rgba(140,123,101,0.3)]'
                                    : 'bg-transparent text-[#8c7b65] border-[#4a4238] hover:border-[#8c7b65] hover:text-[#e3d8c8]'
                                }`}
                        >
                            <span className="block text-xs uppercase tracking-wider opacity-70">{phase.period}</span>
                            <span className="block font-serif text-lg">{phase.title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePhase.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#2a2622]/90 backdrop-blur-md border border-[#4a4238] p-8 md:p-12 rounded-xl text-center max-w-3xl mx-auto shadow-2xl"
                    >
                        <h3 className="text-3xl font-serif text-[#e3d8c8] mb-6">{activePhase.title}</h3>
                        <div className="w-16 h-1 bg-[#8c7b65] mx-auto mb-6" />
                        <p className="text-lg text-[#a69b8b] leading-relaxed">
                            {activePhase.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
