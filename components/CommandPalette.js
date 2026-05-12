import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function CommandPalette({ open, onClose, posts = [] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef(null)

  const commands = [
    { id: 'home', label: ':home', hint: 'go to index', run: () => router.push('/') },
    { id: 'now', label: ':now', hint: 'go to now page', run: () => router.push('/now') },
    { id: 'help', label: ':help', hint: 'show keybindings', run: () => { onClose(); window.dispatchEvent(new CustomEvent('cli:help')) } },
    ...posts.map((p) => ({
      id: p.slug,
      label: `:open ${p.slug}`,
      hint: p.title,
      run: () => router.push(`/posts/${p.slug}`),
    })),
  ]

  const q = query.replace(/^:/, '').toLowerCase().trim()
  const filtered = q
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.hint.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q),
      )
    : commands

  useEffect(() => {
    if (open) {
      setQuery(':')
      setSel(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => {
    setSel(0)
  }, [query])

  if (!open) return null

  const run = (cmd) => {
    onClose()
    cmd.run()
  }

  const onKey = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown' || (e.ctrlKey && e.key === 'n')) {
      e.preventDefault()
      setSel((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp' || (e.ctrlKey && e.key === 'p')) {
      e.preventDefault()
      setSel((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && filtered[sel]) {
      e.preventDefault()
      run(filtered[sel])
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center pt-20 md:pt-32 px-4 bg-ink/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-paper border border-rule rounded-md shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className="w-full px-4 py-3 bg-transparent text-[14px] text-ink focus:outline-none border-b border-rule font-mono"
          placeholder=":command or search"
        />
        <ul className="max-h-72 overflow-y-auto py-1 text-[13px]">
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-muted">no matches</li>
          )}
          {filtered.map((cmd, i) => (
            <li
              key={cmd.id}
              onMouseEnter={() => setSel(i)}
              onClick={() => run(cmd)}
              className={`px-4 py-2 cursor-pointer flex justify-between gap-4 ${
                i === sel ? 'bg-surface text-ink' : 'text-ink'
              }`}
            >
              <span className="truncate">{cmd.label}</span>
              <span className="text-muted shrink-0 truncate">{cmd.hint}</span>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2 border-t border-rule text-[11px] text-muted flex justify-between">
          <span>↑↓ navigate · ↵ select · esc close</span>
          <span>{filtered.length} item{filtered.length === 1 ? '' : 's'}</span>
        </div>
      </div>
    </div>
  )
}
