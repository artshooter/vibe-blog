'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import BackButton from '@/app/components/common/BackButton'
import Hero from './Hero'
import chaImg from './cha.webp'

export default function Content() {
    const t = useTranslations('guxiang.content')

    return (
        <div className="min-h-screen bg-[#f0f0f4] text-[#2d3336] font-serif relative transition-colors duration-1000">
            <BackButton variant="nature" />

            {/* Hero: The Dream */}
            <Hero />

            {/* Main Content Area */}
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-24 space-y-12">

                {/* Intro */}
                <section className="space-y-8 relative">
                    <WindEffect />
                    <Paragraph text={t('p1')} />
                    <Paragraph text={t('p2')} className="text-[#6e757c]" />
                    <Paragraph text={t('p3')} />
                    <Paragraph text={t('p4')} />
                    <Paragraph text={t('p5')} />
                </section>

                <section className="space-y-8 bg-[#e8e8e6] p-8 rounded-lg shadow-inner">
                    <Paragraph text={t('p6')} />
                    <Paragraph text={t('p7')} />
                    <Paragraph text={t('p8')} />
                </section>

                {/* Dialogue Section 1 */}
                <section className="pl-6 border-l-2 border-[#d1d5db] space-y-4">
                    <Dialogue text={t('d1')} speaker={t('mother')} />
                    <Dialogue text={t('d2')} speaker={t('me')} />
                    <Dialogue text={t('d3')} speaker={t('mother')} />
                </section>

                {/* The Memory Flashback - Highlighted */}
                <section className="relative my-24 p-8 md:p-12 rounded-lg bg-gradient-to-br from-[#1b3a57] to-[#162e45] text-white shadow-2xl overflow-hidden group">
                    {/* Decorative Moon */}
                    <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#f2c04d] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-[#f2c04d] text-xl mb-6 flex items-center gap-4">
                            <span className="h-px flex-1 bg-[#f2c04d]/30"></span>
                            神异的图画
                            <span className="h-px flex-1 bg-[#f2c04d]/30"></span>
                        </h2>
                        <Paragraph text={t('p12')} className="text-white/90 !text-lg !leading-loose" disableHighlight={true} />
                        <Paragraph text={t('p13')} className="text-white/80" />
                        <Paragraph text={t('p14')} className="text-white/80" />
                        <Paragraph text={t('p15')} className="text-white/80" />
                    </div>
                </section>

                {/* Memory Dialogues */}
                <section className="space-y-8">
                    <Paragraph text={t('p16')} />
                    <Paragraph text={t('p17')} />
                    <div className="pl-6 border-l-2 border-[#f2c04d] space-y-4">
                        <Dialogue text={t('d4')} speaker={t('runtu')} />
                    </div>
                    <Paragraph text={t('p19')} />
                    <div className="pl-6 border-l-2 border-[#f2c04d] space-y-4">
                        <Dialogue text={t('d5')} speaker={t('runtu')} />
                        <Dialogue text={t('d6')} speaker={t('me')} />
                        <Dialogue text={t('d7')} speaker={t('runtu')} />
                    </div>
                    <Paragraph text={t('p24')} />

                    {/* Cha image with caption */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="my-8 flex flex-col items-center gap-1"
                    >
                        <div className="relative w-full max-w-md h-64 md:h-80">
                            <Image
                                src={chaImg}
                                alt={t('chaCaption')}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <p className="text-center text-sm md:text-base text-[#6e757c] italic">{t('chaCaption')}</p>
                    </motion.div>

                    <div className="pl-6 border-l-2 border-[#f2c04d] space-y-4">
                        <Dialogue text={t('d8')} speaker={t('me')} />
                        <Dialogue text={t('d9')} speaker={t('runtu')} />
                    </div>
                    <Paragraph text={t('p27')} />
                    <div className="pl-6 border-l-2 border-[#f2c04d] space-y-4">
                        <Dialogue text={t('d10')} speaker={t('runtu')} />
                    </div>
                    <Paragraph text={t('p29')} className="text-[#1b3a57] font-medium" />
                    <Paragraph text={t('p30')} />
                </section>

                {/* Awakening to Reality */}
                <section className="space-y-8">
                    <Paragraph text={t('p31')} />
                    <Dialogue text={t('d11')} speaker={t('me')} />
                    <Dialogue text={t('d12')} speaker={t('mother')} />
                    <div className="h-px w-24 bg-[#d1d5db] mx-auto my-12" />
                    <Paragraph text={t('p37')} />
                    <Paragraph text={t('p38')} />
                    <Paragraph text={t('p39')} className="text-[#6e757c] italic" />
                    <Paragraph text={t('p40')} />
                    <Dialogue text={t('d13')} speaker={t('me')} />
                    <Paragraph text={t('p42')} />
                    <Paragraph text={t('p43')} />
                    <Dialogue text={t('d14')} speaker={t('runtu')} />
                    <Paragraph text={t('p45')} className="text-center text-xl text-[#8c3f3f]" />
                </section>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-24 space-y-12">

                <section className="space-y-4">
                    <Paragraph text={t('p46')} />
                    <Paragraph text={t('p47')} />
                    <div className="pl-6 border-l-2 border-[#d1d5db] space-y-4 text-sm md:text-base">
                        <Dialogue text={t('d15')} speaker={t('runtu')} />
                        <Dialogue text={t('d16')} speaker={t('mother')} />
                        <Dialogue text={t('d17')} speaker={t('runtu')} />
                        <Dialogue text={t('d18')} speaker={t('mother')} />
                    </div>
                </section>

                <section className="space-y-8">
                    <Paragraph text={t('p52')} />
                    <Dialogue text={t('d19')} speaker={t('runtu')} />
                    <Paragraph text={t('p54')} />
                    <Dialogue text={t('d20')} speaker={t('runtu')} />
                    <Paragraph text={t('p56')} />
                    <Paragraph text={t('p57')} />
                    <Paragraph text={t('p58')} />
                    <Paragraph text={t('p59')} />
                    <Paragraph text={t('p60')} />
                </section>

                <section className="space-y-8">
                    <Paragraph text={t('p61')} />
                    <Paragraph text={t('p62')} />
                    <Paragraph text={t('p63')} />
                    <div className="pl-6 border-l-2 border-[#d1d5db] space-y-4">
                        <Dialogue text={t('d21')} speaker={t('hongr')} />
                        <Dialogue text={t('d22')} speaker={t('me')} />
                        <Dialogue text={t('d23')} speaker={t('hongr')} />
                    </div>
                    <Paragraph text={t('p70')} className="text-[#6e757c]" />
                    <Paragraph text={t('p71')} />
                    <Paragraph text={t('p72')} />
                    <Paragraph text={t('p73')} />
                </section>
            </div>

            {/* The Ending - Hope */}
            <section className="min-h-[60vh] flex flex-col items-center justify-center bg-[#1b3a57] text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d5a3f]/30 to-transparent opacity-50" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-2xl text-center z-10 space-y-12"
                >
                    <Paragraph text={t('p74')} className="text-white/80 !text-lg" />

                    <div className="relative inline-block mt-12 group cursor-default">
                        <p className="text-2xl md:text-4xl font-serif leading-normal tracking-wide text-[#f2c04d] opacity-90 group-hover:opacity-100 transition-opacity">
                            "其实地上本没有路，<br />走的人多了，也便成了路。"
                        </p>
                        <div className="absolute -inset-8 bg-[#f2c04d] blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 rounded-full" />
                    </div>
                </motion.div>
            </section>

        </div>
    )
}

function Paragraph({ text, className = '', disableHighlight = false }: { text: string; className?: string; disableHighlight?: boolean }) {
    // Regex to find specific keywords to highlight
    const keywords = [
        { word: '金黄的圆月', color: '#f2c04d' },
        { word: '深蓝的天空', color: '#87ceeb' },
        { word: '碧绿的西瓜', color: '#2d5a3f' }
    ];

    let content: (string | React.ReactNode)[] = [text];

    if (!disableHighlight) {
        keywords.forEach(({ word, color }) => {
            const newContent: (string | React.ReactNode)[] = [];
            content.forEach((part) => {
                if (typeof part === 'string' && part.includes(word)) {
                    const split = part.split(word);
                    split.forEach((s, i) => {
                        newContent.push(s);
                        if (i < split.length - 1) {
                            newContent.push(
                                <span
                                    key={`${word}-${i}`}
                                    className="relative inline cursor-pointer font-bold px-1 rounded transition-colors duration-300 hover:text-white group/highlight whitespace-nowrap"
                                    style={{ color: color }}
                                >
                                    <span className="relative z-10">{word}</span>
                                    <span
                                        className="absolute inset-0 rounded opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-300"
                                        style={{ backgroundColor: color }}
                                    />
                                </span>
                            );
                        }
                    });
                } else {
                    newContent.push(part);
                }
            });
            content = newContent;
        });
    }

    return (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className={`text-lg leading-loose text-justify ${className}`}
            style={{ textIndent: '2em' }}
        >
            {content}
        </motion.p>
    )
}

function WindEffect() {
    const [positions, setPositions] = useState<any[]>([])
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setPositions([...Array(5)].map(() => ({
            top: Math.random() * 100,
            yOffset: Math.random() * 50 - 25,
            duration: 10 + Math.random() * 10,
            delay: Math.random() * 10,
        })))
        setIsMounted(true)
    }, [])

    if (!isMounted || positions.length === 0) return null

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-[150vh] z-0">
            {positions.map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-[#6e757c]/10 h-px w-24 rounded-full"
                    style={{
                        top: `${pos.top}%`,
                        left: `-10%`,
                    }}
                    animate={{
                        x: ['0vw', '100vw'],
                        y: [0, pos.yOffset],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: pos.duration,
                        repeat: Infinity,
                        delay: pos.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}

function Dialogue({ text, speaker }: { text: string; speaker: string }) {
    return (
        <div className="flex gap-2 text-base md:text-lg">
            <span className="font-bold text-[#6e757c] shrink-0 w-16 text-right text-sm pt-1.5 opacity-70">{speaker}</span>
            <p className="flex-1 leading-relaxed text-[#2d3336]">{text}</p>
        </div>
    )
}
