import { getSortedPostsData } from '../../lib/mdx'

const SITE_URL = 'https://xipu.li'

export default function handler(req, res) {
  const posts = getSortedPostsData()
    .filter((p) => !p.draft && !p.chinese)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))

  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    { loc: `${SITE_URL}/`, lastmod: today, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE_URL}/now`, lastmod: today, priority: '0.8', changefreq: 'monthly' },
    ...posts.map((p) => ({
      loc: `${SITE_URL}/posts/${p.slug}`,
      lastmod: p.publishedAt || today,
      priority: '0.7',
      changefreq: 'yearly',
    })),
  ]

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')
  res.status(200).send(xml)
}
