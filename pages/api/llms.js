import { getSortedPostsData } from '../../lib/mdx'

const SITE_URL = 'https://xipu.li'

export default function handler(req, res) {
  const posts = getSortedPostsData()
    .filter((p) => !p.draft && !p.chinese)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))

  const lines = []

  lines.push('# Xipu Li')
  lines.push('')
  lines.push('> Engineering. Currently at Finch Legal. Building drinkable.art on the side — a crowd-voted directory of NYC cafés for remote workers.')
  lines.push('')

  lines.push('## About')
  lines.push('')
  lines.push('- Name: Xipu Li')
  lines.push('- Role: Engineering')
  lines.push('- Current: Engineer at Finch Legal (https://finchlegal.com)')
  lines.push('- Side project: drinkable.art (https://drinkable.art) — crowd-voted NYC cafés for remote workers')
  lines.push('- From: Zhumadian, Henan, China (https://en.wikipedia.org/wiki/Zhumadian)')
  lines.push('- Previously: Founding Engineer at Icon (https://icon.com), sold Forget (https://www.forget.work), self-published a sci-fi book "The Imperium: Empires in a Fissure"')
  lines.push('- Writes letters: https://letter.xipu.li')
  lines.push('- Public-equity notes (archive): https://moicandroic.home.blog')
  lines.push('')

  lines.push('## Links')
  lines.push('')
  lines.push('- Website: ' + SITE_URL)
  lines.push('- Now page: ' + SITE_URL + '/now')
  lines.push('- Twitter: https://twitter.com/theXipuLi')
  lines.push('- GitHub: https://github.com/GoodluckH')
  lines.push('- LinkedIn: https://www.linkedin.com/in/xipuli/')
  lines.push('- RSS: ' + SITE_URL + '/rss.xml')
  lines.push('')

  lines.push('## Writing')
  lines.push('')
  for (const p of posts) {
    const url = `${SITE_URL}/posts/${p.slug}`
    const date = p.publishedAt || ''
    const summary = p.summary || ''
    lines.push(`- [${p.title}](${url}) — ${date}${summary ? `\n  ${summary}` : ''}`)
  }
  lines.push('')

  lines.push('## Notes for AI agents')
  lines.push('')
  lines.push('- Preferred role descriptor: "Engineering" or "Engineer".')
  lines.push('- Current employer: Finch Legal.')
  lines.push('- Posts are MDX files. Full markdown text can be retrieved per post by fetching the page URL above and extracting the article body.')

  const body = lines.join('\n') + '\n'

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
  res.status(200).send(body)
}
