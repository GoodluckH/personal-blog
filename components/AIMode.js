import { useEffect, useState } from 'react'

export default function AIMode({ onExit }) {
  const [text, setText] = useState('loading…')
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true
    fetch('/llms.txt')
      .then((r) => r.text())
      .then((t) => {
        if (alive) setText(t)
      })
      .catch((e) => {
        if (alive) setError(e.message)
      })
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="bg-paper text-ink">
      <div className="px-2 mb-4 flex items-center justify-between">
        <p className="text-[12px] md:text-[13px] dim">
          <span className="text-accent">$</span> curl /llms.txt
        </p>
        <button
          onClick={onExit}
          className="text-[11px] dim hover:text-ink"
        >
          :plain to exit
        </button>
      </div>
      {error ? (
        <p className="px-2 text-accent text-[12px]">error: {error}</p>
      ) : (
        <pre className="px-2 text-[12px] md:text-[13px] leading-relaxed whitespace-pre-wrap break-words text-ink">
          {text}
        </pre>
      )}
    </div>
  )
}
