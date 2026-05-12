import { useState } from 'react'

export default function ExpandableCard({ title, children, toggleId }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <button
        data-toggle={toggleId}
        className="text-left flex items-center gap-2 group text-[13px]"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="dim">[{expanded ? '−' : '+'}]</span>
        <span className="text-ink group-hover:text-accent transition-colors">
          {title}
        </span>
      </button>
      {expanded && <div className="pt-3 pl-4 border-l border-rule ml-1">{children}</div>}
    </div>
  )
}
