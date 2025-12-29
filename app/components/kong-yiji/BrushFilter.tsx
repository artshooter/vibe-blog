'use client'

import React from 'react'

/**
 * BrushFilter 组件提供用于模拟中国水墨、毛笔笔触的 SVG 滤镜。
 * 将其放置在文章容器的顶部，并通过 filter="url(#xxx)" 应用到 SVG 元素上。
 */
export default function BrushFilter() {
    return (
        <svg className="absolute w-0 h-0 invisible" aria-hidden="true">
            <defs>
                {/* 1. 毛笔笔触滤镜 - 模拟边缘的毛刺感（干笔/枯笔效果） */}
                <filter id="ink-brush" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.05"
                        numOctaves="4"
                        result="noise"
                    />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
                </filter>

                {/* 2. 墨迹晕染滤镜 - 模拟生宣上的渗墨效果 */}
                <filter id="ink-bleed" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.02"
                        numOctaves="3"
                        result="noise"
                    />
                    <feDisplacementMap in="blur" in2="noise" scale="8" result="displace" />
                    <feComponentTransfer in="displace">
                        <feFuncA type="linear" slope="0.8" />
                    </feComponentTransfer>
                </filter>

                {/* 3. 极细笔触 - 用于精细勾勒 */}
                <filter id="fine-brush" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.1"
                        numOctaves="2"
                        result="noise"
                    />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
                </filter>
            </defs>
        </svg>
    )
}

/**
 * PaperTexture 组件提供宣纸质感的背景层。
 */
export function PaperTexture() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply overflow-hidden">
            <svg width="100%" height="100%">
                <filter id="paper-grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="1.5"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-grain)" />
            </svg>
        </div>
    )
}
