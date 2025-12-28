
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function Atmosphere() {
    const { scrollYProgress } = useScroll()

    // As user scrolls, the "gloom" intensifies
    const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.5, 0.8])
    const sepiaIntensity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8])

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Grain/Noise Texture */}
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('/noise.png')] animate-none" />

            {/* Vignette Effect - gets darker at edges and intense on scroll */}
            <motion.div
                style={{ opacity: vignetteOpacity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_90%)]"
            />

            {/* Sepia/Old Photo Filter - intensifies on scroll */}
            <motion.div
                style={{
                    backdropFilter: `sepia(${sepiaIntensity}) contrast(1.1) brightness(0.9)`
                }}
                className="absolute inset-0 mix-blend-multiply opacity-30"
            />

            {/* Scratch overlay (optional, subtle) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/scratched-texture.png')]" />
        </div>
    )
}
