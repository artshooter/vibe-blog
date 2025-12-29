'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SwipeBack({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const deltaX = touchEndX - touchStartX.current
      const deltaY = Math.abs(touchEndY - touchStartY.current)

      // 从左边缘开始（50px内），向右滑动超过100px，且水平滑动大于垂直滑动
      if (touchStartX.current < 50 && deltaX > 100 && deltaX > deltaY * 2) {
        router.back()
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [router])

  return <>{children}</>
}
