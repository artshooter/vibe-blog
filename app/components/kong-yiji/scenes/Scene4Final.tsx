'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import DialogueLine from '../DialogueLine'

export default function Scene4Final() {
  const t = useTranslations('kong-yiji')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const d1Opacity = useTransform(scrollYProgress, [0.02, 0.08, 0.12, 0.18], [0, 1, 1, 0])
  const d2Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.25, 0.3], [0, 1, 1, 0])
  const d3Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.38, 0.43], [0, 1, 1, 0])
  const d4Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.5, 0.55], [0, 1, 1, 0])
  const d5Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.8, 1.0], [0, 1, 1, 0])

  const leaveProgress = useTransform(scrollYProgress, [0.4, 1.0], [0, 200])
  const characterFade = useTransform(scrollYProgress, [0.5, 1.0], [1, 0])
  const fadeOut = useTransform(scrollYProgress, [0.8, 0.95], [1, 0])

  // 色调变冷
  const coldFilter = useTransform(scrollYProgress, [0.3, 0.7], [0, 0.3])

  return (
    <div
      ref={containerRef}
      className="relative w-full py-8 overflow-hidden"
    >
      {/* 冷色调滤镜 */}
      <motion.div
        className="absolute inset-0 bg-[#4A5568] pointer-events-none"
        style={{ opacity: coldFilter }}
      />

      <div className="relative w-full">

        {/* 插画区域 */}
        <div className="relative aspect-[4/3] max-w-2xl mx-auto">
          <motion.svg
            viewBox="0 0 400 300"
            className="w-full h-full overflow-visible"
            style={{ opacity: fadeOut }}
          >
            {/* 门槛 - 应用笔触 */}
            <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" style={{ filter: 'url(#ink-brush)' }}>
              <path d="M 0 250 L 400 250" />
              <path d="M 0 265 L 400 265" />
              <rect x="0" y="250" width="400" height="15" fill="#8B7355" fillOpacity="0.1" stroke="none" />
            </g>

            {/* 孔乙己 - 坐在门槛下，用手走 - 线条极简且凄凉 */}
            <motion.g style={{ x: leaveProgress, opacity: characterFade, filter: 'url(#ink-brush)' }}>
              <g stroke="#1A1A1A" strokeWidth="1.2" fill="none" strokeLinecap="round">
                {/* 头 - 黑瘦，比例缩小 */}
                <path d="M 140 185 Q 150 175, 160 185 Q 165 200, 150 205 Q 135 200, 140 185" />
                {/* 脸色 - 灰暗点彩 */}
                <path d="M 140 185 Q 150 175, 160 185 Q 165 200, 150 205 Q 135 200, 140 185" fill="#4A4A4A" fillOpacity="0.1" stroke="none" />

                {/* 眼睛 - 极其简练的点 */}
                <circle cx="146" cy="192" r="0.8" fill="#1A1A1A" stroke="none" />
                <circle cx="154" cy="192" r="0.8" fill="#1A1A1A" stroke="none" />

                {/* 胡子 - 零乱 */}
                <path d="M 144 204 L 142 215" opacity="0.6" />
                <path d="M 156 204 L 158 215" opacity="0.6" />

                {/* 身体 - 破夹袄，寥寥几笔勾勒出虚弱感 */}
                <path d="M 140 205 L 130 250" />
                <path d="M 160 205 L 170 250" />
                <path d="M 130 250 Q 150 255, 170 250" />

                {/* 填充 */}
                <path
                  d="M 140 205 L 130 250 L 170 250 L 160 205 Z"
                  fill="#4A5568"
                  fillOpacity="0.15"
                  stroke="none"
                />

                {/* 蒲包 - 坐着的垫子 */}
                <ellipse cx="150" cy="260" rx="35" ry="8" fill="#8B7355" fillOpacity="0.2" stroke="#1A1A1A" strokeWidth="0.8" />

                {/* 双手 - 支撑地面，线条僵硬体现用力 */}
                <path d="M 134 215 Q 110 235, 100 255" />
                <path d="M 166 215 Q 190 235, 200 255" />
                {/* 手掌 - 泥土色 */}
                <circle cx="98" cy="258" r="4" fill="#5D4E37" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="0.8" />
                <circle cx="202" cy="258" r="4" fill="#5D4E37" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="0.8" />
              </g>

              {/* 四文大钱 - 渐行渐远 */}
              <g style={{ filter: 'url(#fine-brush)' }} opacity="0.8">
                <circle cx="210" cy="235" r="5" fill="#8B7355" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="0.6" />
                <circle cx="225" cy="235" r="5" fill="#8B7355" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="0.6" />
                <circle cx="240" cy="235" r="5" fill="#8B7355" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="0.6" />
                <circle cx="255" cy="235" r="5" fill="#8B7355" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="0.6" />
              </g>
            </motion.g>

            {/* 酒碗 - 放在门槛旁 */}
            <g stroke="#1A1A1A" strokeWidth="1" fill="none" style={{ filter: 'url(#fine-brush)' }}>
              <ellipse cx="300" cy="245" rx="10" ry="4" />
              <path d="M 290 245 Q 292 258, 300 258 Q 308 258, 310 245" />
              <ellipse cx="300" cy="248" rx="6" ry="2" fill="#D4A84B" fillOpacity="0.3" />
            </g>
          </motion.svg>

          {/* 对话 */}
          <div className="absolute inset-0 pointer-events-none">
            {/* 1. 孔乙己：温一碗酒 (左上) */}
            <motion.div
              className="absolute top-0 left-12"
              style={{ opacity: d1Opacity }}
            >
              <DialogueLine
                text={t('scenes.scene4.dialogue1')}
                direction="right"
              />
            </motion.div>

            {/* 2. 掌柜：你又偸了东西了 (右上) */}
            <motion.div
              className="absolute top-16 right-12 text-right"
              style={{ opacity: d2Opacity }}
            >
              <DialogueLine
                text={t('scenes.scene4.dialogue2')}
                direction="left"
              />
            </motion.div>

            {/* 3. 孔乙己：不要取笑 (左侧稍下) */}
            <motion.div
              className="absolute top-32 left-12"
              style={{ opacity: d3Opacity }}
            >
              <DialogueLine
                text={t('scenes.scene4.dialogue3')}
                direction="right"
              />
            </motion.div>

            {/* 4. 掌柜：要是不偸，怎么会打断腿 (右侧稍下) */}
            <motion.div
              className="absolute top-48 right-12 text-right"
              style={{ opacity: d4Opacity }}
            >
              <DialogueLine
                text={t('scenes.scene4.dialogue4')}
                direction="left"
              />
            </motion.div>

            {/* 5. 孔乙己：跌断，跌，跌... (随人移动) */}
            <motion.div
              className="absolute bottom-48 left-[40%]"
              style={{ opacity: d5Opacity, x: leaveProgress }}
            >
              <DialogueLine
                text={t('scenes.scene4.dialogue5')}
                direction="down"
              />
            </motion.div>
          </div>
        </div>

        {/* 场景说明 */}
        <motion.p
          className="text-center text-[#4A4A4A] mt-12 text-lg italic"
          style={{ fontFamily: 'serif', opacity: fadeOut }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('scenes.scene4.caption')}
        </motion.p>
      </div>
    </div>
  )
}
