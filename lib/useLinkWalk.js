import { useEffect } from 'react'

export default function useLinkWalk({ containerRef, enabled = true }) {
  useEffect(() => {
    if (!enabled) return

    const onKey = (e) => {
      const t = e.target
      const inField =
        t?.tagName === 'INPUT' ||
        t?.tagName === 'TEXTAREA' ||
        t?.isContentEditable
      if (inField) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key !== 'j' && e.key !== 'k') return

      const root = containerRef.current
      if (!root) return
      const links = Array.from(
        root.querySelectorAll('a[href], button:not([disabled]), [data-walk]'),
      ).filter((el) => {
        if (el.closest('[data-no-walk]')) return false
        if (el.offsetParent === null) return false
        return true
      })
      if (links.length === 0) return

      e.preventDefault()
      const current = document.activeElement
      let idx = links.indexOf(current)

      if (e.key === 'j') {
        idx = idx === -1 ? 0 : Math.min(links.length - 1, idx + 1)
      } else {
        idx = idx === -1 ? links.length - 1 : Math.max(0, idx - 1)
      }
      const next = links[idx]
      next.focus({ preventScroll: false })
      next.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }

    window.addEventListener('keydown', onKey, { capture: true })
    return () =>
      window.removeEventListener('keydown', onKey, { capture: true })
  }, [containerRef, enabled])
}
