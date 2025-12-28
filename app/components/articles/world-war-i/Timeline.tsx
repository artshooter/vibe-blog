
'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

const events = [
    {
        date: '1914.06.28',
        title: '萨拉热窝事件',
        description: '奥匈帝国皇储斐迪南大公被塞尔维亚民族主义者刺杀。',
        side: 'left',
    },
    {
        date: '1914.07.05',
        title: '德国"空白支票"',
        description: '德国向奥匈帝国保证无条件支持，局势升级。',
        side: 'right',
    },
    {
        date: '1914.07.28',
        title: '宣战开启',
        description: '奥匈帝国对塞尔维亚宣战。',
        side: 'left',
    },
    {
        date: '1914.07.30',
        title: '俄国动员',
        description: '沙俄为了保护斯拉夫兄弟，开始军事动员。',
        side: 'right',
    },
    {
        date: '1914.08.01',
        title: '连锁反应',
        description: '德国对俄国宣战；法国开始动员。',
        side: 'left',
    },
    {
        date: '1914.08.04',
        title: '全面爆发',
        description: '英国对德国宣战，欧洲列强全部卷入战争。',
        side: 'right',
    },
]

export default function Timeline() {
    return (
        <div className="relative py-20 max-w-4xl mx-auto px-4">
            {/* Central Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#4a4238] -translate-x-1/2 opacity-30" />


            {/* Burning Fuse Effect */}
            <motion.div
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                viewport={{ once: true }}
                className="absolute left-1/2 top-0 w-0.5 bg-red-600 -translate-x-1/2 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-0"
            >
                {/* Particle Emitter at the tip */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full blur-[2px] animate-pulse">
                    {/* Sparks */}
                    <div className="absolute -inset-4 animate-spin [animation-duration:3s]">
                        <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-orange-400 rounded-full opacity-0 animate-[ping_1s_ease-out_infinite]" />
                    </div>
                </div>
            </motion.div>

            <div className="space-y-12 md:space-y-24 relative z-10">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} index={index} />
                ))}
            </div>
        </div>
    )
}

function EventCard({ event, index }: { event: any, index: number }) {
    const isLeft = index % 2 === 0

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`flex items-center gap-8 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col`}
        >
            {/* Spacer for desktop layout */}
            <div className="flex-1 hidden md:block" />

            {/* Connection Point */}
            <div className="w-4 h-4 rounded-full bg-[#1a1816] border-2 border-[#8c7b65] relative z-20 shrink-0">
                <div className="absolute inset-0 bg-[#8c7b65] rounded-full animate-ping opacity-20" />
            </div>

            {/* Content Card */}
            <div className={`flex-1 w-full md:w-auto ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                <div className="inline-block p-6 bg-[#2a2622] border border-[#4a4238] rounded-lg shadow-lg">
                    <span className="block text-[#8c7b65] font-serif font-bold text-lg mb-2">
                        {event.date}
                    </span>
                    <h3 className="text-xl text-[#e3d8c8] font-bold mb-2">{event.title}</h3>
                    <p className="text-[#a69b8b] text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                        {event.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
