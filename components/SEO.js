import Head from 'next/head'

const SITE_URL = 'https://xipu.li'
const SITE_NAME = 'Xipu Li'
const TWITTER = '@theXipuLi'

export default function SEO({
  title,
  description = 'Engineering at Finch Legal. Builder. Occasional writer.',
  path = '/',
  image,
  type = 'website',
  publishedAt,
  jsonLd,
}) {
  const url = SITE_URL + (path === '/' ? '/' : path)
  const fullTitle = title ? title : SITE_NAME
  const displayTitle = title?.includes(SITE_NAME)
    ? title
    : title
    ? `${title} — ${SITE_NAME}`
    : SITE_NAME
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : SITE_URL + image
    : SITE_URL + '/og/default.png'

  return (
    <Head>
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#FAFAF7" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {publishedAt && <meta property="article:author" content="Xipu Li" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER} />
      <meta name="twitter:creator" content={TWITTER} />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Author / feed */}
      <meta name="author" content="Xipu Li" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={SITE_NAME}
        href={`${SITE_URL}/rss.xml`}
      />
      <link rel="alternate" type="text/markdown" href={`${SITE_URL}/llms.txt`} />

      {/* Favicon */}
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>$</text></svg>`}
      />

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  )
}
