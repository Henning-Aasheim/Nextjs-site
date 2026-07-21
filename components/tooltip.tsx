'use client'

import { useRef, useState } from 'react'
import { useOutsideClick } from './dropdown'

export function Term({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useOutsideClick(wrapperRef, () => setIsOpen(false))

  return (
    <span ref={wrapperRef} className="term-wrapper group">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="term-trigger"
        aria-expanded={isOpen}
      >
        {children}
      </button>

      <span
        role="tooltip"
        className={`term-bubble ${isOpen ? 'block' : 'hidden'} group-hover:block`}
      >
        {text}
      </span>
    </span>
  )
}