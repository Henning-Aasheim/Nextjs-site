// components/dropcap.tsx
import type { CSSProperties } from 'react'

export function DropCap({
  children,
  color = 'var(--color-danger)',
  className = '',
}: {
  children: React.ReactNode
  color?: string
  className?: string
}) {
  return (
    <div
      className={`dropcap ${className}`}
      style={{ '--dropcap-color': color } as CSSProperties}
    >
      {children}
    </div>
  )
}