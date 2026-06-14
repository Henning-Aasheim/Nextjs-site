'use client'

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function DarkMode () {
    const {theme, setTheme, resolvedTheme} = useTheme()

    return (
        <button 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer"
            aria-label="Toggle darkmode">
            {theme === 'dark' ? <Sun size={30} className="toggleButtons"/> : <Moon size={30} className="toggleButtons"/>}
        </button>
    )
}