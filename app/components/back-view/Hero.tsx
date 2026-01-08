'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import backViewImg from './back-view.webp'

interface HeroProps {
  inHome?: boolean
}

export default function Hero({ inHome = false }: HeroProps) {

  const content = (
    <div
      className={`relative w-full ${inHome ? 'h-[400px]' : 'h-auto'} bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] overflow-hidden ${inHome ? 'cursor-pointer group' : ''}`}
    >
      {/* 背景纹理 */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* 背景图片 - 全屏铺开 */}
      <motion.div
        className={inHome ? "absolute inset-0 z-0" : "relative z-0 w-full h-auto"}
        initial={inHome ? false : { scale: 1.15 }}
        animate={inHome ? false : { scale: 1 }}
        transition={inHome ? undefined : { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src={backViewImg}
          alt="Father's Back View"
          fill={inHome}
          style={!inHome ? { width: '100%', height: 'auto' } : undefined}
          className="object-cover"
          priority
        />
      </motion.div>

      {/* 底部渐变过渡 - 仅详情页 */}
      {!inHome && (
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-b from-transparent to-[#F5F5DC]" />
      )}

    </div>
  )

  if (inHome) {
    return (
      <Link href="/back-view" className="block" prefetch={true}>
        {content}
      </Link>
    )
  }

  return content
}
