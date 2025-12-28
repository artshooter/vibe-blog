
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AudioAmbience() {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Initialize audio
        const audio = new Audio('https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/win.ogg') // Placeholder: A quiet, solemn track would be better
        // Better placeholder for war ambience? Hard to find without search. 
        // Using a generic placeholder for now, user can replace.
        audio.loop = true
        audio.volume = 0.3
        audioRef.current = audio

        return () => {
            audio.pause()
            audioRef.current = null
        }
    }, [])

    const togglePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e))
        }
        setIsPlaying(!isPlaying)
    }

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={togglePlay}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-[#1a1816]/80 backdrop-blur border border-[#4a4238] rounded-full text-[#8c7b65] hover:text-[#e3d8c8] hover:border-[#8c7b65] transition-all"
        >
            <span className="text-sm uppercase tracking-wider font-bold">
                {isPlaying ? 'Mute Ambience' : 'Play Ambience'}
            </span>
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-900'}`} />
        </motion.button>
    )
}
