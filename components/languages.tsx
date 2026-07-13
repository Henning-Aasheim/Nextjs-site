export const LANG_FONTS: Record<string, string> = {
  el: 'var(--font-ebgaramond)',   // Greek
  ja: 'var(--font-yuji)',          // Japanese (matches your existing :lang(ja) rules)
  // add more as you go, e.g.
  // ru: 'var(--font-some-cyrillic-font)',
  // ar: 'var(--font-some-arabic-font)',
}

export const LANG_WEIGHTS: Record<string, number> = {
  el: 700, // semi-bold for Greek
}

// Languages that read right-to-left
const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur'])

export function Lang({
  lang,
  children,
  font,
  weight,
  italic = false,
}: {
  lang: string
  children: React.ReactNode
  font?: string
  weight?: number
  italic?: boolean
}) {
  const resolvedFont = font ?? LANG_FONTS[lang] ?? 'inherit'

  return (
    <span
      lang={lang}
      dir={RTL_LANGS.has(lang) ? 'rtl' : undefined}
      style={{
        fontFamily: resolvedFont,
        lineHeight: 'inherit', // locks to the surrounding paragraph's leading-8, ignoring EB Garamond's own metrics
        fontWeight: weight ?? LANG_WEIGHTS[lang], // see below
      }}
      className={italic ? 'italic' : undefined}
    >
      {children}
    </span>
  )
}