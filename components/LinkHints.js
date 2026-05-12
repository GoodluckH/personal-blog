import { useEffect, useState } from 'react'

const KEYS = 'asdfjklghqweruio'.split('')

function generateLabels(count) {
  if (count <= KEYS.length) return KEYS.slice(0, count)
  const labels = []
  outer: for (const a of KEYS) {
    for (const b of KEYS) {
      labels.push(a + b)
      if (labels.length === count) break outer
    }
  }
  return labels
}

export default function LinkHints({ active, onClose }) {
  const [hints, setHints] = useState([])
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!active) {
      setHints([])
      setTyped('')
      return
    }

    const candidates = Array.from(
      document.querySelectorAll(
        'a[href], button:not([disabled]), [role="button"], [data-walk]',
      ),
    ).filter((el) => {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return false
      if (r.bottom < 0 || r.top > window.innerHeight) return false
      if (r.right < 0 || r.left > window.innerWidth) return false
      if (el.closest('[data-no-hint]')) return false
      return true
    })

    const labels = generateLabels(candidates.length)
    const list = candidates.map((el, i) => {
      const r = el.getBoundingClientRect()
      const href = el.getAttribute('href')
      return {
        label: labels[i],
        x: r.left + window.scrollX,
        y: r.top + window.scrollY,
        href,
        target: el.getAttribute('target'),
        el,
      }
    })
    setHints(list)
    setTyped('')
  }, [active])

  useEffect(() => {
    if (!active) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose?.()
        return
      }
      if (e.key === 'Backspace') {
        e.preventDefault()
        e.stopPropagation()
        setTyped((t) => t.slice(0, -1))
        return
      }
      if (e.key.length !== 1) return
      if (!/[a-z]/i.test(e.key)) return

      e.preventDefault()
      e.stopPropagation()
      const next = (typed + e.key.toLowerCase()).slice(0, 2)
      const exact = hints.find((h) => h.label === next)
      if (exact) {
        if (exact.target === '_blank') {
          window.open(exact.href, '_blank', 'noopener,noreferrer')
        } else {
          exact.el.click()
        }
        onClose?.()
        return
      }
      // prefix matches?
      const possible = hints.filter((h) => h.label.startsWith(next))
      if (possible.length === 0) {
        onClose?.()
        return
      }
      if (possible.length === 1) {
        const h = possible[0]
        if (h.target === '_blank') {
          window.open(h.href, '_blank', 'noopener,noreferrer')
        } else {
          h.el.click()
        }
        onClose?.()
        return
      }
      setTyped(next)
    }

    window.addEventListener('keydown', onKey, { capture: true })
    return () =>
      window.removeEventListener('keydown', onKey, { capture: true })
  }, [active, hints, typed, onClose])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[55]"
    >
      {hints.map((h) => {
        const matched = typed && h.label.startsWith(typed)
        const dim = typed && !matched
        return (
          <span
            key={h.label}
            style={{
              position: 'absolute',
              left: h.x,
              top: h.y,
              transform: 'translate(-50%, -50%)',
            }}
            className={`font-mono text-[10px] md:text-[11px] leading-none px-1 py-[2px] rounded-sm border ${
              dim
                ? 'opacity-30 bg-paper text-muted border-rule'
                : matched
                ? 'bg-accent text-paper border-accent'
                : 'bg-ink text-paper border-ink'
            }`}
          >
            {h.label.split('').map((ch, i) => (
              <span
                key={i}
                className={
                  matched && i < typed.length ? 'opacity-50' : ''
                }
              >
                {ch}
              </span>
            ))}
          </span>
        )
      })}
    </div>
  )
}
