import { useEffect, useRef, useState } from 'react'

export default function useVimNav({ count, onEnter, enabled = true }) {
  const [index, setIndex] = useState(0)
  const lastKey = useRef(null)
  const lastKeyTime = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const onKey = (e) => {
      const tag = e.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable)
        return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      const now = Date.now()
      const isDouble = (key) =>
        lastKey.current === key && now - lastKeyTime.current < 500

      switch (e.key) {
        case 'j':
        case 'ArrowDown':
          e.preventDefault()
          setIndex((i) => Math.min(i + 1, count - 1))
          break
        case 'k':
        case 'ArrowUp':
          e.preventDefault()
          setIndex((i) => Math.max(i - 1, 0))
          break
        case 'g':
          if (isDouble('g')) {
            e.preventDefault()
            setIndex(0)
          }
          break
        case 'G':
          e.preventDefault()
          setIndex(Math.max(count - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          onEnter?.(index)
          break
        default:
          break
      }
      lastKey.current = e.key
      lastKeyTime.current = now
    }

    window.addEventListener('keydown', onKey, { capture: true })
    return () => window.removeEventListener('keydown', onKey, { capture: true })
  }, [count, onEnter, index, enabled])

  return [index, setIndex]
}
