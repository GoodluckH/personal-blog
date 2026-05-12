import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { getSortedPostsData } from '../lib/mdx'
import CLIShell from '../components/CLIShell'
import SEO from '../components/SEO'
import useLinkWalk from '../lib/useLinkWalk'

export default function Home({ allPostsData }) {
  const router = useRouter()
  const containerRef = useRef(null)
  const posts = allPostsData
    .filter((p) => !p.draft && !p.chinese)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))

  useLinkWalk({ containerRef })

  useEffect(() => {
    const move = (dir) => {
      const root = containerRef.current
      if (!root) return
      const links = Array.from(root.querySelectorAll('a[href]'))
      if (!links.length) return
      const cur = document.activeElement
      let idx = links.indexOf(cur)
      idx = idx === -1
        ? dir > 0 ? 0 : links.length - 1
        : Math.max(0, Math.min(links.length - 1, idx + dir))
      links[idx]?.focus()
      links[idx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
    const up = () => move(-1)
    const dn = () => move(1)
    window.addEventListener('cli:up', up)
    window.addEventListener('cli:down', dn)
    return () => {
      window.removeEventListener('cli:up', up)
      window.removeEventListener('cli:down', dn)
    }
  }, [])

  return (
    <>
      <SEO
        title="Xipu Li"
        description="Engineer at Finch Legal. Building drinkable.art — crowd-voted NYC cafés for remote workers. Writes occasionally."
        path="/"
        image="/og/default.png"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Xipu Li',
          url: 'https://xipu.li',
          jobTitle: 'Engineer',
          worksFor: { '@type': 'Organization', name: 'Finch Legal', url: 'https://finchlegal.com' },
          sameAs: [
            'https://twitter.com/theXipuLi',
            'https://github.com/GoodluckH',
            'https://www.linkedin.com/in/xipuli/',
          ],
        }}
      />

      <CLIShell posts={posts} cwd="~/">
        <div ref={containerRef}>
        <Block prompt="whoami" section="whoami">
          <dl className="grid grid-cols-[5.5rem_1fr] md:grid-cols-[7rem_1fr] gap-x-3 gap-y-1 text-[13px] md:text-[14px]">
            <Field k="name"  v="Xipu Li" />
            <Field k="role"  v={<>engineer @ <Ext href="https://finchlegal.com">Finch</Ext></>} />
            <Field k="from"  v={<><Ext href="https://en.wikipedia.org/wiki/Zhumadian">Zhumadian</Ext>, Henan, China</>} />
            <Field k="side"  v={<><Ext href="https://drinkable.art">drinkable.art</Ext> — crowd-voted NYC cafés for remote work</>} />
            <Field k="prev"  v={<>founding eng @ <Ext href="https://icon.com/">icon</Ext> · sold <Ext href="https://www.forget.work">forget</Ext> · self-published <Ext href="https://www.google.com/search?q=The+Imperium+Empires+in+a+Fissure+Xipu+Li">a sci-fi book</Ext></>} />
            <Field k="writes" v={<><Ext href="https://letter.xipu.li/">letters</Ext> · public-equity <Ext href="https://moicandroic.home.blog/">notes</Ext></>} />
            <Field k="now"   v={<a className="underline decoration-rule underline-offset-2 hover:decoration-accent hover:text-accent" href="/now">cat /now</a>} />
          </dl>
        </Block>

        <div className="h-6" />

        <Block prompt={`ls -lt writing/  # ${posts.length} entries`} section="writing">
          <ul className="font-mono">
            {posts.map((p, i) => (
              <li key={p.slug}>
                <a
                  href={`/posts/${p.slug}`}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(`/posts/${p.slug}`)
                  }}
                  className="row-link group flex items-baseline gap-2 md:gap-3 px-2 py-1.5 rounded-sm transition-colors no-underline text-ink hover:bg-surface/60 focus:outline-none focus-visible:bg-surface/60"
                >
                  <span className="shrink-0 w-4 row-cursor text-rule">{' '}</span>
                  <span className="shrink-0 dim tnum text-[12px] md:text-[13px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="shrink-0 dim tnum text-[12px] md:text-[13px] hidden sm:inline">
                    {formatDate(p.publishedAt)}
                  </span>
                  <span className="truncate text-[13px] md:text-[14px] text-ink">
                    {p.title}
                  </span>
                  <span className="ml-auto shrink-0 dim tnum text-[11px] md:text-[12px]">
                    {p.readingTime?.text?.replace(' read', '') || ''}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Block>
        </div>

      </CLIShell>
    </>
  )
}

function Block({ prompt, section, children }) {
  return (
    <section data-section={section}>
      <p className="px-2 text-[12px] md:text-[13px] dim mb-2">
        <span className="text-accent">$</span> {prompt}
      </p>
      {children}
    </section>
  )
}

function Field({ k, v }) {
  return (
    <>
      <dt className="dim">{k}</dt>
      <dd className="text-ink">{v}</dd>
    </>
  )
}

function Ext({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-rule underline-offset-2 hover:decoration-accent hover:text-accent"
    >
      {children}
    </a>
  )
}

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  const y = String(d.getFullYear()).slice(2)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}.${m}`
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return { props: { allPostsData } }
}
