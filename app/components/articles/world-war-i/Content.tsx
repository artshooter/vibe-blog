
'use client'

import Timeline from './Timeline'
import WarPhases from './WarPhases'
import ImpactGrid from './ImpactGrid'
import Hero from './Hero'
import Atmosphere from './Atmosphere'
import CasualtyCounter from './CasualtyCounter'
import AudioAmbience from './AudioAmbience'

export default function Content() {
    return (
        <article className="min-h-screen bg-[#1a1816] text-[#a69b8b] font-sans selection:bg-[#8c7b65] selection:text-[#1a1816]">
            <Atmosphere />
            <AudioAmbience />
            <Hero />

            <div className="max-w-3xl mx-auto px-6 py-20 md:py-32 space-y-24 relative z-10">
                {/* Intro Section */}
                <section className="font-serif text-lg md:text-xl leading-relaxed space-y-8">
                    <blockquote className="border-l-4 border-[#8c7b65] pl-6 py-2 italic text-[#e3d8c8] text-2xl">
                        "第一次世界大战是1914年至1918年之间发生的全球军事冲突。"
                    </blockquote>

                    <p>
                        这场战争以1914年6月发生的<strong className="text-[#e3d8c8]">萨拉热窝事件</strong>作为标志性起点，以1918年11月<strong className="text-[#e3d8c8]">德意志帝国</strong>签署停战协议作为结束，战后签署了凡尔赛条约。
                    </p>
                    <div className="py-12">
                        <CasualtyCounter />
                    </div>
                    <p>
                        总体上战争由两大阵营参与——<strong className="text-[#e3d8c8]">协约国</strong>（英法俄）与<strong className="text-[#e3d8c8]">同盟国</strong>（德、奥匈帝国、奥斯曼帝国）。
                    </p>
                </section>

                <div className="h-px bg-gradient-to-r from-transparent via-[#4a4238] to-transparent" />

                {/* Chapter 1: The Spark */}
                <section>
                    <h2 className="text-4xl font-serif font-bold text-[#e3d8c8] mb-8 text-center flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-[#8c7b65]" />
                        战争的发生
                        <span className="h-px w-12 bg-[#8c7b65]" />
                    </h2>

                    <p className="font-serif text-lg leading-relaxed mb-12 text-center max-w-2xl mx-auto">
                        十九世纪以来，斯拉夫民族普遍处于列强压迫之下。随着民族主义蔓延，矛盾在萨拉热窝被引爆。
                    </p>

                    <Timeline />
                </section>

                {/* Chapter 2: The Phases */}
            </div>

            {/* Full width section for Phases */}
            <WarPhases />

            <div className="max-w-3xl mx-auto px-6 py-20 space-y-24">
                {/* Chapter 3: Aftermath */}
                <section>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#4a4238] to-transparent mb-20" />
                    <ImpactGrid />
                </section>

                {/* Final Quote */}
                <section className="text-center py-20">
                    <p className="font-serif italic text-2xl md:text-3xl text-[#8c7b65] opacity-80">
                        "The war to end all wars."
                    </p>
                </section>
            </div>
        </article>
    )
}
