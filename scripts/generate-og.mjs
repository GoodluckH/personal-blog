import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const ROOT = process.cwd()
const POSTS_DIR = join(ROOT, 'posts')
const FONTS_DIR = join(ROOT, 'public/fonts')
const OUT_DIR = join(ROOT, 'public/og')

mkdirSync(OUT_DIR, { recursive: true })

const fontRegular = readFileSync(join(FONTS_DIR, 'JetBrainsMono-Regular.ttf'))
const fontBold = readFileSync(join(FONTS_DIR, 'JetBrainsMono-Bold.ttf'))

const PAPER = '#0E0E0C'
const INK = '#E8E5DA'
const DIM = '#7E7C75'
const ACCENT = '#D29A78'
const RULE = '#2D2B27'
const SURFACE = '#181714'

const W = 1200
const H = 630

function div(props, children) {
  return { type: 'div', props: { ...props, children } }
}
function span(props, children) {
  return { type: 'span', props: { ...props, children } }
}

function makeCard({ cwd, command, title, subtitle, meta }) {
  return div(
    {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: PAPER,
        color: INK,
        fontFamily: 'JetBrains Mono',
        padding: '56px 64px',
      },
    },
    [
      // top prompt row
      div(
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: 22,
            color: DIM,
            marginBottom: 8,
          },
        },
        [
          span({ style: { color: DIM } }, 'xipu@li'),
          span({ style: { color: RULE } }, ':'),
          span({ style: { color: ACCENT } }, cwd),
          span({ style: { color: RULE } }, '$'),
          span({ style: { color: INK } }, command),
        ],
      ),

      // divider
      div(
        {
          style: {
            width: '100%',
            height: 1,
            background: RULE,
            marginTop: 14,
            marginBottom: 36,
            display: 'flex',
          },
        },
        '',
      ),

      // title
      div(
        {
          style: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '18px',
            marginBottom: 18,
          },
        },
        [
          span(
            { style: { color: DIM, fontSize: 56, lineHeight: 1, paddingTop: 4 } },
            '#',
          ),
          span(
            {
              style: {
                color: INK,
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.01em',
                display: 'block',
                maxWidth: 940,
              },
            },
            title,
          ),
        ],
      ),

      // subtitle
      subtitle
        ? div(
            {
              style: {
                fontSize: 26,
                color: DIM,
                lineHeight: 1.45,
                maxWidth: 980,
                display: 'block',
              },
            },
            subtitle,
          )
        : div({ style: { display: 'flex' } }, ''),

      // spacer
      div({ style: { flex: 1, display: 'flex' } }, ''),

      // meta row
      div(
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
            borderTop: `1px solid ${RULE}`,
            fontSize: 20,
            color: DIM,
          },
        },
        [
          span({ style: { color: DIM, display: 'flex', gap: 14 } }, meta || ''),
          span({ style: { color: ACCENT } }, 'xipu.li'),
        ],
      ),
    ],
  )
}

async function renderPng(card) {
  const svg = await satori(card, {
    width: W,
    height: H,
    fonts: [
      { name: 'JetBrains Mono', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'JetBrains Mono', data: fontBold, weight: 700, style: 'normal' },
    ],
  })
  const resvg = new Resvg(svg, { background: PAPER })
  return resvg.render().asPng()
}

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toISOString().slice(0, 10)
}

async function main() {
  let count = 0

  // default card (home)
  const home = makeCard({
    cwd: '~/',
    command: 'whoami',
    title: 'Xipu Li',
    subtitle:
      'Engineering at Finch Legal. Building drinkable.art — crowd-voted NYC cafés for remote workers.',
    meta: 'engineer · nyc · writes things',
  })
  writeFileSync(join(OUT_DIR, 'default.png'), await renderPng(home))
  count++

  // now card
  const nowCard = makeCard({
    cwd: '~/now',
    command: 'cat now.md',
    title: 'Now',
    subtitle: 'What I am working on, reading, and thinking about right now.',
    meta: 'updated regularly',
  })
  writeFileSync(join(OUT_DIR, 'now.png'), await renderPng(nowCard))
  count++

  // per-post cards
  const files = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  for (const f of files) {
    const slug = f.replace(/\.mdx$/, '')
    const raw = readFileSync(join(POSTS_DIR, f), 'utf8')
    const { data } = matter(raw)
    if (data.draft || data.chinese) continue

    const rt = readingTime(raw)
    const card = makeCard({
      cwd: '~/writing',
      command: `cat ${slug}.md`,
      title: data.title || slug,
      subtitle: data.summary || '',
      meta: [
        fmtDate(data.publishedAt),
        rt.text,
        `${rt.words.toLocaleString()} words`,
      ]
        .filter(Boolean)
        .join('  ·  '),
    })
    writeFileSync(join(OUT_DIR, `${slug}.png`), await renderPng(card))
    count++
  }

  console.log(`generated ${count} OG images → public/og/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
