'use client'
import { motion, useAnimation, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import branchImg from './branch.webp'

export default function WillowBranch({ delay = 0, xOffset = 0 }: { delay?: number, xOffset?: number }) {
    const controls = useAnimation()
    const ref = useRef<HTMLDivElement>(null)

    // Physics-based sway
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-100, 100], [15, -15]) // Move mouse left -> rotate right
    const springX = useSpring(x, { stiffness: 150, damping: 10 })

    const handleMouseMove = (e: MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY)

        // If mouse is near (within 200px)
        if (dist < 200) {
            // Push away
            const deltaX = e.clientX - centerX
            springX.set(-deltaX * 0.5) // Opposite direction
        } else {
            springX.set(0)
        }
    }

    useEffect(() => {
        // Continuous gentle breeze
        const breeze = async () => {
            await controls.start({
                rotate: [0, 2, 0, -2, 0],
                transition: {
                    duration: 5 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }
            })
        }
        breeze()

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [controls, delay, springX])

    return (
        <motion.div
            ref={ref}
            className="absolute top-0 pointer-events-auto origin-top"
            style={{
                right: `${100 + xOffset}px`,
                rotate: rotate, // Reactive rotation
                x: springX, // Also move slightly
                width: '500px', // Increased size
                height: '1000px'
            }}
            animate={controls} // Breeze animation
        >
            <div className="relative w-full h-full opacity-90">
                <Image
                    src={branchImg}
                    alt="Willow Branch"
                    fill
                    className="object-contain object-top drop-shadow-lg"
                    priority
                />
            </div>
        </motion.div>
    )
}
