'use client'

import { useScrollProgress } from '@/hooks/use-scroll-progress'

export default function ScrollProgressBar() {
  const scrollProgress = useScrollProgress()

  return (
    <div
      className="fixed top-16 left-0 z-50 h-[2.5px] bg-zinc-950 transition-all duration-150 ease-out dark:bg-white"
      style={{ width: `${scrollProgress}%` }}
    />
  )
}
