'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import heroImage from './farewell-to-cambridge.webp'

export default function Hero({ inHome = false }: { inHome?: boolean }) {
    const t = useTranslations('farewell-to-cambridge')

    const content = (
        <div className={`relative w-full overflow-hidden ${inHome ? 'h-[400px]' : 'h-auto'} group cursor-pointer`}>
            {/* Background Image */}
            <motion.div
                className={inHome ? "absolute inset-0" : "relative w-full h-auto"}
                initial={inHome ? false : { scale: 1.15 }}
                animate={inHome ? false : { scale: 1 }}
                transition={inHome ? undefined : { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <Image
                    src={heroImage}
                    alt={t('hero.title')}
                    fill={inHome}
                    style={!inHome ? { width: '100%', height: 'auto' } : undefined}
                    className="object-cover"
                    placeholder="blur"
                    priority
                />
            </motion.div>
        </div>
    )

    if (inHome) {
        return (
            <Link href="/farewell-to-cambridge" className="block w-full">
                {content}
            </Link>
        )
    }

    return content
}
