'use client'
import { useRef, useEffect } from 'react'

export default function WaveEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight

        // Set canvas size
        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        window.addEventListener('resize', resize)
        resize()

        // Ripple state
        const ripples: { x: number; y: number; r: number; alpha: number; speed: number }[] = []

        // Add ripple on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.8) { // Throttle creation
                ripples.push({
                    x: e.clientX,
                    y: e.clientY + window.scrollY, // Adjust for scroll if this canvas is fixed/absolute, but if it covers whole page we might want clientY only if fixed.
                    // Assuming fixed background behavior:
                    r: 1,
                    alpha: 0.5,
                    speed: 1 + Math.random()
                })
            }
        }

        const handleClick = (e: MouseEvent) => {
            // Create a bigger splash
            ripples.push({
                x: e.clientX,
                y: e.clientY, // If fixed
                r: 5,
                alpha: 0.8,
                speed: 3
            })
        }

        // Since container is likely fixed, we listen to window events
        // But better to attach to canvas if it overlays everything with pointer-events-none?
        // If we want it interactive, it shouldn't be pointer-events-none entirely, but might block text selection.
        // Compromise: Attach to window, canvas is bg.
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('click', handleClick)

        // Animation Loop
        let animationFrameId: number
        const render = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw gentle background wave (optional simplified sine wave)
            const time = Date.now() * 0.001
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
            // To be subtle, maybe just use ripples for now to avoid visual noise.

            // Update and draw ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                const ripple = ripples[i]
                ripple.r += ripple.speed
                ripple.alpha -= 0.01

                if (ripple.alpha <= 0) {
                    ripples.splice(i, 1)
                    continue
                }

                ctx.beginPath()
                ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(100, 200, 255, ${ripple.alpha})` // Light blueish
                ctx.lineWidth = 2
                ctx.stroke()

                // Inner echo
                ctx.beginPath()
                ctx.arc(ripple.x, ripple.y, ripple.r * 0.7, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(100, 200, 255, ${ripple.alpha * 0.6})`
                ctx.lineWidth = 1
                ctx.stroke()
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('click', handleClick)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }} // Adjust global visibility
        />
    )
}
