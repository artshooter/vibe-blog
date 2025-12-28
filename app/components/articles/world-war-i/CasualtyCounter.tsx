
'use client'

import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const TOTAL_COUNT = 67000000
const DOT_VALUE = 100000
const TOTAL_DOTS = Math.ceil(TOTAL_COUNT / DOT_VALUE) // 670 dots

export default function CasualtyCounter() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-20%" })

    const countSpring = useSpring(0, { duration: 5000, bounce: 0 })
    const countDisplay = useTransform(countSpring, (current) => Math.round(current).toLocaleString())

    useEffect(() => {
        if (isInView) {
            countSpring.set(TOTAL_COUNT)
        }
    }, [isInView, countSpring])

    return (
        <div ref={ref} className="py-20 px-4 md:px-0 relative">
            <div className="absolute inset-0 bg-red-900/5 blur-3xl rounded-full opacity-50 pointer-events-none" />

            <div className="text-center mb-12">
                <h3 className="text-xl font-serif text-[#8c7b65] uppercase tracking-widest mb-2">Total Mobilized Forces</h3>
                <motion.div className="text-5xl md:text-8xl font-serif font-black text-[#e3d8c8] tabular-nums tracking-tighter">
                    {countDisplay}
                </motion.div>
                <p className="text-[#a69b8b] mt-4 max-w-lg mx-auto">
                    每一个点代表 <strong>100,000</strong> 个鲜活的生命被卷入战争机器。
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(6px,1fr))] gap-1 max-w-4xl mx-auto opacity-70">
                {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: Math.random() * 2, // Random "popcorn" effect
                            ease: "easeOut"
                        }}
                        className={`h-1.5 w-1.5 rounded-full ${i % 10 === 0 ? 'bg-red-900' : 'bg-[#4a4238]'}`}
                    />
                ))}
            </div>
        </div>
    )
}
