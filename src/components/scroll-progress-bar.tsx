'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'

export default function ScrollProgressBar() {
  const scrollProgress = useScrollProgress()

  return (
    <div
      className="fixed top-16 left-0 z-50 h-[2.5px] bg-zinc-950 dark:bg-white"
      role="progressbar"
      aria-label="페이지 스크롤 진행률"
      aria-valuenow={scrollProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: `${scrollProgress}%` }}
    />
  )
}
