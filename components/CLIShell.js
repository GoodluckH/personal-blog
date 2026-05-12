import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HelpOverlay from './HelpOverlay'
import LinkHints from './LinkHints'
import AIMode from './AIMode'
import { buildCommands, matchCommands } from '../lib/commands'

export default function CLIShell({ children, posts = [], cwd }) {
  const router = useRouter()
  const [helpOpen, setHelpOpen] = useState(false)
  const [hintsOn, setHintsOn] = useState(false)
  const [aiOn, setAiOn] = useState(false)
  const [mode, setMode] = useState('NORMAL')
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [clock, setClock] = useState('')
  const inputRef = useRef(null)

  const activeCwd = cwd || cwdFor(router.pathname)

  const scrollToSection = useCallback((name) => {
    const el = document.querySelector(`[data-section="${name}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const commands = buildCommands({
    router,
    posts,
    openHelp: () => setHelpOpen(true),
    scrollToSection,
    toggleAi: () => setAiOn((v) => !v),
    exitAi: () => setAiOn(false),
    enterAi: () => setAiOn(true),
  })

  const matches = matchCommands(commands, query)
  const ghost =
    query && matches[0] && matches[0].name.toLowerCase().startsWith(query.toLowerCase())
      ? matches[0].name.slice(query.length)
      : ''

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
      )
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setSel(0)
  }, [query])

  const focusInput = useCallback((prefill = '') => {
    setMode('INSERT')
    setQuery(prefill)
    setTimeout(() => inputRef.current?.focus(), 0)
  }, [])

  const blurInput = useCallback(() => {
    inputRef.current?.blur()
    setMode('NORMAL')
    setQuery('')
    setHistIdx(-1)
  }, [])

  const runCommand = useCallback(
    (cmdOrName) => {
      const cmd =
        typeof cmdOrName === 'string'
          ? matchCommands(commands, cmdOrName)[0]
          : cmdOrName
      if (!cmd) return
      setHistory((h) => [cmdOrName.name || cmdOrName, ...h].slice(0, 30))
      blurInput()
      cmd.run?.()
    },
    [commands, blurInput],
  )

  // section nav: `]` and `[`
  const jumpSection = useCallback((dir) => {
    const sections = Array.from(document.querySelectorAll('[data-section]'))
    if (sections.length === 0) return
    const y = window.scrollY + 80
    let i = sections.findIndex((el) => {
      const r = el.getBoundingClientRect()
      return r.top + window.scrollY > y
    })
    if (dir > 0) {
      if (i === -1) i = sections.length - 1
    } else {
      // previous
      i = sections.findIndex((el) => {
        const r = el.getBoundingClientRect()
        return r.top + window.scrollY >= y - 1
      })
      i = i - 1
      if (i < 0) i = 0
    }
    sections[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const lastG = { time: 0 }

    const onKey = (e) => {
      const tag = e.target?.tagName
      const inField =
        tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable

      if (e.key === 'Escape') {
        if (helpOpen) setHelpOpen(false)
        if (hintsOn) setHintsOn(false)
        if (inField) blurInput()
        return
      }

      if (inField) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (hintsOn) return // hints owns the keys

      // mode-entering keys
      if (e.key === 'i') {
        e.preventDefault()
        focusInput('')
        return
      }
      if (e.key === ':') {
        e.preventDefault()
        focusInput('')
        return
      }
      if (e.key === '/') {
        e.preventDefault()
        focusInput('')
        return
      }
      if (e.key === 'f') {
        e.preventDefault()
        setHintsOn(true)
        return
      }
      if (e.key === '?') {
        e.preventDefault()
        setHelpOpen(true)
        return
      }

      // back
      if (e.key === 'h' || e.key === 'ArrowLeft') {
        if (router.pathname !== '/') {
          e.preventDefault()
          router.push('/')
        }
        return
      }

      // section nav
      if (e.key === ']') {
        e.preventDefault()
        jumpSection(1)
        return
      }
      if (e.key === '[') {
        e.preventDefault()
        jumpSection(-1)
        return
      }

      // scrolling
      if (e.defaultPrevented) return
      const h = window.innerHeight
      switch (e.key) {
        case 'j':
          e.preventDefault()
          window.scrollBy({ top: 48 })
          break
        case 'k':
          e.preventDefault()
          window.scrollBy({ top: -48 })
          break
        case ' ':
          e.preventDefault()
          window.scrollBy({ top: h * 0.85, behavior: 'smooth' })
          break
        case 'b':
          e.preventDefault()
          window.scrollBy({ top: -h * 0.85, behavior: 'smooth' })
          break
        case 'd':
          e.preventDefault()
          window.scrollBy({ top: h * 0.5, behavior: 'smooth' })
          break
        case 'u':
          e.preventDefault()
          window.scrollBy({ top: -h * 0.5, behavior: 'smooth' })
          break
        case 'g': {
          const now = Date.now()
          if (now - lastG.time < 500) {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            lastG.time = 0
          } else {
            lastG.time = now
          }
          break
        }
        case 'G':
          e.preventDefault()
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [
    router,
    helpOpen,
    hintsOn,
    blurInput,
    focusInput,
    jumpSection,
  ])

  const onInputKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const target = matches[sel] || matchCommands(commands, query)[0]
      if (target) runCommand(target)
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      if (matches[sel]) setQuery(matches[sel].name)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => Math.min(matches.length - 1, s + 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (matches.length === 0 && history.length > 0) {
        // history navigation when no suggestions
        const nextIdx = Math.min(history.length - 1, histIdx + 1)
        setHistIdx(nextIdx)
        setQuery(history[nextIdx] || '')
      } else {
        setSel((s) => Math.max(0, s - 1))
      }
      return
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-mono">
      <header className="w-full border-b border-rule">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between text-[12px] md:text-[13px]">
          <div className="flex items-center gap-2 min-w-0">
            {router.pathname !== '/' && (
              <Link href="/">
                <a className="text-muted hover:text-ink shrink-0" aria-label="back to index">←</a>
              </Link>
            )}
            <Link href="/">
              <a className="text-muted hover:text-ink shrink-0 no-underline">xipu@li</a>
            </Link>
            <span className="text-rule shrink-0">:</span>
            <span className="text-accent shrink-0 truncate">{activeCwd}</span>
            <span className="text-rule shrink-0 hidden md:inline">$</span>
          </div>
          <div className="flex items-center gap-3 text-muted text-[11px] md:text-[12px]">
            <button onClick={() => setHintsOn(true)} className="hidden md:inline hover:text-ink" aria-label="hints">f</button>
            <button onClick={() => setHelpOpen(true)} className="hover:text-ink" aria-label="help">?</button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 py-6 md:py-8 pb-20 md:pb-32 animate-fadein">
        {aiOn ? <AIMode onExit={() => setAiOn(false)} /> : children}
      </main>

      {/* suggestions panel — shows when typing */}
      {mode === 'INSERT' && matches.length > 0 && (
        <div className="fixed bottom-[88px] md:bottom-[44px] inset-x-0 z-40 px-4 md:px-6 pointer-events-none">
          <div className="max-w-3xl mx-auto pointer-events-auto bg-paper border border-rule rounded-md shadow-lg overflow-hidden">
            <ul className="max-h-56 overflow-y-auto py-1 text-[12px] md:text-[13px]">
              {matches.slice(0, 8).map((m, i) => (
                <li
                  key={m.name}
                  onMouseEnter={() => setSel(i)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    runCommand(m)
                  }}
                  className={`px-3 py-1.5 flex items-baseline gap-3 cursor-pointer ${
                    i === sel ? 'bg-surface text-ink' : 'text-ink'
                  }`}
                >
                  <span className="shrink-0 w-3 text-accent">{i === sel ? '›' : ' '}</span>
                  <span className="shrink-0 truncate">{m.name}</span>
                  <span className="ml-auto dim truncate text-[11px] md:text-[12px]">{m.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* mobile: minimal status bar, no input or touch buttons */}
      <footer className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-rule bg-paper/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between text-[11px]">
          <span className={`px-1.5 py-0.5 rounded-sm tracking-wider text-[10px] ${
            aiOn ? 'bg-accent text-paper' : 'bg-ink text-paper'
          }`}>
            {aiOn ? 'AI' : 'READ'}
          </span>
          <span className="dim truncate">{activeCwd}</span>
          <span className="dim tabular-nums">{clock}</span>
        </div>
      </footer>

      {/* desktop: full REPL */}
      <footer className="hidden md:block fixed bottom-0 inset-x-0 z-50 border-t border-rule bg-paper/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 py-2 flex items-center gap-2 text-[12px]">
          <span className={`px-1.5 py-0.5 rounded-sm tracking-wider text-[10px] shrink-0 ${
            aiOn ? 'bg-accent text-paper' :
            mode === 'INSERT' ? 'bg-accent text-paper' :
            'bg-ink text-paper'
          }`}>
            {aiOn ? 'AI' : mode}
          </span>
          <span className="dim shrink-0 truncate">{activeCwd}</span>

          <div className="flex-1 flex items-center gap-2 min-w-0 relative" data-no-hint>
            <span className="text-accent shrink-0">$</span>
            <div className="relative flex-1 min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                onFocus={() => setMode('INSERT')}
                onBlur={() => {
                  setMode('NORMAL')
                  setQuery('')
                }}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                placeholder={mode === 'NORMAL' ? "press 'i' to type · 'f' for hints · '?' for help" : 'type a command…'}
                className="cli-input w-full bg-transparent placeholder:text-muted text-[13px]"
                style={{ color: 'var(--cli-text)', caretColor: 'var(--cli-caret)' }}
              />
              {ghost && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 pointer-events-none text-muted text-[13px]"
                  style={{ paddingLeft: `${query.length}ch` }}
                >
                  {ghost}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>

      <LinkHints active={hintsOn} onClose={() => setHintsOn(false)} />
      <HelpOverlay open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  )
}

function cwdFor(pathname) {
  if (pathname === '/') return '~/'
  if (pathname === '/now') return '~/now'
  if (pathname.startsWith('/posts/')) {
    const slug = pathname.replace('/posts/', '')
    return `~/writing/${slug}.md`
  }
  return '~/' + pathname.replace(/^\//, '')
}
