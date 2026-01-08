'use client'

import Image from 'next/image'
import runtuImg from './runtu.webp'

export default function Hero({ inHome = false }: { inHome?: boolean }) {
    return (
        <div className={`relative w-full overflow-hidden ${inHome ? 'h-[400px] rounded-2xl' : 'h-auto'}`}>
            <Image
                src={runtuImg}
                alt="故乡"
                fill={inHome}
                style={!inHome ? { width: '100%', height: 'auto' } : undefined}
                className="object-cover"
                priority
            />
            {/* Gradient overlay for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-[#f0f0f4]" />
        </div>
    )
}
