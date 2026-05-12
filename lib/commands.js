import { setTheme } from './useTheme'

function toggleByData(id) {
  const el = document.querySelector(`[data-toggle="${id}"]`)
  if (!el) return
  el.scrollIntoView({ block: 'center', behavior: 'smooth' })
  if (el.getAttribute('aria-expanded') !== 'true') el.click()
  setTimeout(() => el.focus(), 350)
}

export function buildCommands({
  router,
  posts = [],
  openHelp,
  scrollToSection,
  enterAi,
  exitAi,
  toggleAi,
}) {
  const open = (url) => window.open(url, '_blank', 'noopener,noreferrer')
  const push = (path) => router.push(path)

  const base = [
    { name: 'home', alias: ['index', 'h', '~'], desc: 'go to index', run: () => push('/') },
    { name: 'now', alias: [], desc: 'cat /now', run: () => push('/now') },
    { name: 'help', alias: ['?'], desc: 'keybindings', run: () => openHelp() },
    { name: 'clear', alias: ['cls'], desc: 'clear input', run: () => {} },

    // ai / llm mode
    { name: 'ai', alias: ['llm', 'llms', 'agent'], desc: 'view as an LLM would', run: () => enterAi?.() },
    { name: 'plain', alias: ['exit', 'human', 'normal'], desc: 'exit AI mode', run: () => exitAi?.() },
    { name: 'llms.txt', alias: ['llmstxt', 'index'], desc: 'open /llms.txt raw', run: () => window.open('/llms.txt', '_blank') },

    // theme
    { name: 'dark', alias: ['night'], desc: 'switch to dark mode', run: () => setTheme('dark') },
    { name: 'light', alias: ['day'], desc: 'switch to light mode', run: () => setTheme('light') },
    { name: 'system', alias: ['auto'], desc: 'follow system theme', run: () => setTheme('system') },
    { name: 'theme', alias: ['toggle'], desc: 'toggle light/dark', run: () => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'light' : 'dark')
    } },

    // section jumps
    { name: 'whoami', alias: ['who', 'bio'], desc: 'jump to whoami', run: () => scrollToSection?.('whoami') },
    { name: 'writing', alias: ['ls', 'posts'], desc: 'jump to writing list', run: () => scrollToSection?.('writing') },

    // toggle widgets
    { name: 'books', alias: ['bookshelf', 'shelf'], desc: 'open bookshelf', run: () => toggleByData('bookshelf') },

    // external aliases
    { name: 'finch', alias: ['work'], desc: 'finchlegal.com ↗', run: () => open('https://finchlegal.com') },
    { name: 'drinkable', alias: ['cafe', 'cafes', 'art'], desc: 'drinkable.art ↗', run: () => open('https://drinkable.art') },
    { name: 'icon', alias: [], desc: 'icon.com (prev) ↗', run: () => open('https://icon.com') },
    { name: 'twitter', alias: ['x'], desc: '@theXipuLi ↗', run: () => open('https://twitter.com/theXipuLi') },
    { name: 'github', alias: ['gh'], desc: 'GoodluckH ↗', run: () => open('https://github.com/GoodluckH') },
    { name: 'linkedin', alias: ['li'], desc: 'xipuli ↗', run: () => open('https://www.linkedin.com/in/xipuli/') },
    { name: 'letter', alias: ['newsletter', 'sub'], desc: 'letter.xipu.li ↗', run: () => open('https://letter.xipu.li/') },
    { name: 'forget', alias: [], desc: 'forget.work (prev) ↗', run: () => open('https://www.forget.work') },
    { name: 'zhumadian', alias: ['hometown'], desc: 'wiki ↗', run: () => open('https://en.wikipedia.org/wiki/Zhumadian') },
    { name: 'book', alias: ['sci-fi'], desc: 'The Imperium ↗', run: () => open('https://www.google.com/search?q=The+Imperium+Empires+in+a+Fissure+Xipu+Li') },
  ]

  const postCmds = posts.map((p) => ({
    name: p.slug,
    alias: [],
    desc: p.title,
    run: () => push(`/posts/${p.slug}`),
  }))

  return [...base, ...postCmds]
}

export function matchCommands(commands, query) {
  if (!query) return commands
  const q = query.toLowerCase().trim()
  return commands
    .map((c) => {
      const haystacks = [c.name, ...(c.alias || []), c.desc]
      let score = 0
      for (const h of haystacks) {
        const idx = h.toLowerCase().indexOf(q)
        if (idx === 0) score = Math.max(score, 3)
        else if (idx > 0) score = Math.max(score, 2)
      }
      // subsequence fallback
      if (score === 0) {
        const target = c.name.toLowerCase()
        let i = 0
        for (const ch of target) {
          if (ch === q[i]) i++
          if (i === q.length) break
        }
        if (i === q.length) score = 1
      }
      return { ...c, score }
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
}
