'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function ExpandableText({
  children,
  dropcapClassName = '',
}: {
  children: React.ReactNode
  dropcapClassName?: string
}) {
  const [expanded, setExpanded] = useState(false)
  const t = useTranslations('library')

  return (
    <div>
      <p className={`dropcap ${dropcapClassName} ${expanded ? '' : `dropcap-clamp-3 mask-b-from-70%`}`}>
        {children}
      </p>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 flex items-center gap-1 font-bold cursor-pointer"
      >
        {expanded ? t('showLess') : t('loadMore')}
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  )
}