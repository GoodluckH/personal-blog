export default function SocialIcons() {
  const links = [
    { label: 'Twitter', href: 'https://twitter.com/theXipuLi' },
    { label: 'GitHub', href: 'https://github.com/GoodluckH' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xipuli/' },
  ]

  return (
    <div className="flex items-center gap-5 text-[13px] text-muted">
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink"
        >
          {label}
        </a>
      ))}
    </div>
  )
}
