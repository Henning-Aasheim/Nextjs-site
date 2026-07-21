import { useEffect, RefObject } from 'react'

export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [ref, callback])
}

export const useCloseOnScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        ref.current.contains(event.target)
      ) {
        return // scroll happened inside the dropdown itself — leave it open
      }
      callback()
    }

    document.addEventListener('scroll', handleScroll, { capture: true, passive: true })
    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true })
    }
  }, [ref, callback])
}