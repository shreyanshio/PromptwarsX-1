'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { getInitialTheme, applyTheme, Theme } from '@/lib/theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const initial = getInitialTheme()
    setTheme(initial)
    applyTheme(initial)
    setMounted(true)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="icon-button"
        aria-label="Toggle theme"
      >
        <Moon size={17} />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
    </button>
  )
}

export { ThemeToggle }

