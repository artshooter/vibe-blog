'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

type Variant = 'war' | 'terminal' | 'nature' | 'journal'

const variants: Record<Variant, { container: string; arrow: string; text: string }> = {
  // 一战文章 - 深红色军事风格
  war: {
    container: 'text-[#d4c5a9]/70 hover:text-[#d4c5a9]',
    arrow: 'text-[#8b2020]',
    text: 'font-serif tracking-wider',
  },
  // MNIST 文章 - 终端代码风格
  terminal: {
    container: 'text-[#8be9fd]/70 hover:text-[#8be9fd] font-mono',
    arrow: 'text-[#50fa7b]',
    text: '',
  },
  // 地坛文章 - 温暖自然风格
  nature: {
    container: 'text-[#5c5a52]/60 hover:text-[#5c5a52]',
    arrow: 'text-[#8b7355]',
    text: 'font-serif',
  },
  // 年终手记 - 温暖米白风格
  journal: {
    container: 'text-[#3D3D3D]/60 hover:text-[#3D3D3D]',
    arrow: 'text-[#81B29A]',
    text: '',
  },
}

const arrowIcons: Record<Variant, React.ReactNode> = {
  war: <span className="text-lg">&larr;</span>,
  terminal: <span>{'<'}-</span>,
  nature: <span className="text-lg">&#8592;</span>,
  journal: <span className="text-lg">&#8592;</span>,
}

interface BackButtonProps {
  variant: Variant
}

export default function BackButton({ variant }: BackButtonProps) {
  const router = useRouter()
  const t = useTranslations()
  const style = variants[variant]

  const labelKeys: Record<Variant, string> = {
    war: 'back.war',
    terminal: 'back.terminal',
    nature: 'back.nature',
    journal: 'back.journal',
  }

  return (
    <motion.button
      onClick={() => router.back()}
      className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm transition-colors ${style.container}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ x: -3 }}
    >
      <span className={style.arrow}>{arrowIcons[variant]}</span>
      <span className={`text-sm ${style.text}`}>{t(labelKeys[variant])}</span>
    </motion.button>
  )
}
