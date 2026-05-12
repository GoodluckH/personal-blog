import { useEffect, useState } from 'react'

const KEY = 'xipu-theme'

export function applyTheme(theme) {
  if (typeof window === 'undefined') return
  const root = document.documentElement
  const effective =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme

  root.classList.toggle('dark', effective === 'dark')
  root.style.colorScheme = effective
}

export function setTheme(theme) {
  if (typeof window === 'undefined') return
  if (theme === 'system') localStorage.removeItem(KEY)
  else localStorage.setItem(KEY, theme)
  applyTheme(theme)
  window.dispatchEvent(new CustomEvent('theme:change', { detail: theme }))
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'system'
  return localStorage.getItem(KEY) || 'system'
}

export default function useTheme() {
  const [theme, setLocal] = useState('system')

  useEffect(() => {
    const initial = getStoredTheme()
    setLocal(initial)
    applyTheme(initial)

    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onMq = () => {
      if (getStoredTheme() === 'system') applyTheme('system')
    }
    mq.addEventListener?.('change', onMq)

    const onChange = (e) => setLocal(e.detail)
    window.addEventListener('theme:change', onChange)

    return () => {
      mq.removeEventListener?.('change', onMq)
      window.removeEventListener('theme:change', onChange)
    }
  }, [])

  return theme
}
