import nc from 'next-connect'

import feed from './feed.json'

const metadata = {
  title: 'Xipu Li',
  description: 'Learn more about what I am doing at xipuli.com/now',
  link: 'https://xipu.li',
}

const BASE_URL = 'https://xipu.li'

const handler = nc()

/**
 * Respond with an rss.xml
 *
 * @param {object} req NextApiRequest
 * @param {object} res NextApiResponse
 */
handler.get(async (req, res) => {
  try {
    const postItems = feed
      .filter((post) => !post.data.draft)
      .map((page) => {
        const url = `${BASE_URL}/posts/${page.filePath.replace('.mdx', '')}`
        const coverImage = `${BASE_URL}/${page.data.image}`

        return `<item>
          <title>${page.data.title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${page.data.publishedAt}</pubDate>
          <coverImage>${coverImage}</coverImage>
          <coverImageCaption>${page.data.coverImageCaption}</coverImageCaption>
          ${
            page.data.summary &&
            `<description>${page.data.summary}</description>`
          }
          <content:encoded><![CDATA[${page.content}]]></content:encoded>
        </item>`
      })
      .join('')

    // Add urlSet to entire sitemap string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
      <title>${metadata.title}</title>
      <description>${metadata.description}</description>
      <link>${metadata.link}</link>
      <lastBuildDate>${feed[0].data.publishedAt}</lastBuildDate>
      ${postItems}
      </channel>
      </rss>`

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml')

    return res.status(200).send(sitemap)
  } catch (e) {
    if (!(e instanceof Error)) {
      throw e
    }

    return res.status(500).json({ error: e.message || '' })
  }
})

export default handler
