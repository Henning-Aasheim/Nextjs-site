'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// 0 → 1 progress based on how far the page has scrolled
// since this hook mounted, reaching 1 after `range` px.
export function useScrollProgress<T extends HTMLElement>(range = 400) {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)
  const startScroll = useRef<number | null>(null)
  const ticking = useRef(false)

  const measure = useCallback(() => {
    if (startScroll.current === null) {
      startScroll.current = window.scrollY
    }
    const delta = window.scrollY - startScroll.current
    const raw = delta / range
    setProgress(Math.min(1, Math.max(0, raw)))
    ticking.current = false
  }, [range])

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(measure)
      }
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [measure])

  return { ref, progress }
}