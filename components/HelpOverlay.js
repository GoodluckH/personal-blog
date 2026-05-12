export default function HelpOverlay({ open, onClose }) {
  if (!open) return null

  const groups = [
    {
      title: 'navigation',
      rows: [
        ['j  ↓', 'scroll down / next item'],
        ['k  ↑', 'scroll up / prev item'],
        ['gg', 'top'],
        ['G', 'bottom'],
        ['d / u', 'half page down / up'],
        ['␣ / b', 'page down / up'],
        [']  [', 'next / prev section'],
        ['h  ←', 'back to index'],
        ['↵', 'open selected'],
      ],
    },
    {
      title: 'commands & links',
      rows: [
        ['i  :  /', 'focus input → type a command'],
        ['↹ Tab', 'accept suggestion'],
        ['f', 'link hints (type letters to follow)'],
        ['?', 'this help'],
        ['esc', 'normal mode / close overlay'],
      ],
    },
    {
      title: 'try typing',
      rows: [
        [':now', 'go to /now'],
        [':finch', 'open finchlegal.com'],
        [':drinkable', 'open drinkable.art'],
        [':github', 'open github'],
        [':<slug>', 'open any post'],
      ],
    },
    {
      title: 'theme & ai',
      rows: [
        [':dark', 'dark mode'],
        [':light', 'light mode'],
        [':system', 'follow system'],
        [':theme', 'toggle'],
        [':ai', 'view as AI / LLM sees'],
        [':plain', 'exit AI mode'],
        [':llms.txt', 'open raw /llms.txt'],
      ],
    },
  ]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-paper border border-rule rounded-md shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-rule flex justify-between items-center">
          <span className="text-[13px] text-ink">$ man xipu</span>
          <button onClick={onClose} className="text-[11px] text-muted hover:text-ink">
            esc
          </button>
        </div>
        <div className="px-4 py-3 space-y-4 text-[12.5px]">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="text-[11px] text-muted mb-1.5">{g.title}</p>
              <ul className="space-y-1">
                {g.rows.map(([k, v]) => (
                  <li
                    key={k}
                    className="grid grid-cols-[5.5rem_1fr] gap-3 text-ink"
                  >
                    <span className="text-accent tabular-nums">{k}</span>
                    <span className="text-muted">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
