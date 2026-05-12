import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getFiles, getFileBySlug, getSortedPostsData } from '../../lib/mdx'
import { getMDXComponent } from 'mdx-bundler/client'
import MDXComponent from '../../components/MDXComponents'
import CLIShell from '../../components/CLIShell'
import SEO from '../../components/SEO'

import { Markup } from 'interweave'

export default function BlogSlug({ code, frontMatter, allPostsData }) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  const caption = String(frontMatter.coverImageCaption || '')
  const router = useRouter()

  const posts = (allPostsData || [])
    .filter((p) => !p.draft && !p.chinese)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))

  const myIndex = posts.findIndex((p) => p.slug === frontMatter.slug)
  const prev = myIndex > 0 ? posts[myIndex - 1] : null
  const next = myIndex >= 0 && myIndex < posts.length - 1 ? posts[myIndex + 1] : null

  return (
    <>
      <SEO
        title={frontMatter.title}
        description={frontMatter.summary}
        path={`/posts/${frontMatter.slug}`}
        image={`/og/${frontMatter.slug}.png`}
        type="article"
        publishedAt={frontMatter.publishedAt}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: frontMatter.title,
          description: frontMatter.summary,
          datePublished: frontMatter.publishedAt,
          author: { '@type': 'Person', name: 'Xipu Li', url: 'https://xipu.li' },
          publisher: { '@type': 'Person', name: 'Xipu Li' },
          mainEntityOfPage: `https://xipu.li/posts/${frontMatter.slug}`,
          image: `https://xipu.li/og/${frontMatter.slug}.png`,
          wordCount: frontMatter.wordCount,
        }}
      />

      <CLIShell posts={posts} cwd={`~/writing/${frontMatter.slug}.md`}>
        <article className="px-2">
          <p className="dim text-[12px] md:text-[13px] mb-3">
            <span className="text-accent">$</span> cat {frontMatter.slug}.md
          </p>

          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 dim text-[11px] md:text-[12px] mb-4 tnum">
              <span>date: {formatDate(frontMatter.publishedAt)}</span>
              <span className="text-rule">|</span>
              <span>read: {frontMatter.readingTime?.text}</span>
              <span className="text-rule">|</span>
              <span>words: {frontMatter.wordCount?.toLocaleString?.()}</span>
              {frontMatter.draft && (
                <>
                  <span className="text-rule">|</span>
                  <span className="text-accent">DRAFT</span>
                </>
              )}
            </div>
            <h1 className="text-[20px] md:text-[24px] leading-snug font-semibold text-ink mb-2">
              <span className="dim font-normal"># </span>
              {frontMatter.title}
            </h1>
            {frontMatter.summary && (
              <p className="dim text-[13px] md:text-[14px] leading-relaxed">
                {frontMatter.summary}
              </p>
            )}
          </header>

          {frontMatter.image && (
            <figure className="my-6">
              <div className="overflow-hidden rounded-sm border border-rule">
                <Image
                  priority
                  src={frontMatter.image}
                  width={800}
                  height={533}
                  layout="responsive"
                  objectFit="cover"
                  alt="cover image"
                />
              </div>
              {caption && (
                <figcaption className="text-center text-[12px] dim mt-2">
                  <Markup content={caption} />
                </figcaption>
              )}
            </figure>
          )}

          <div className="prose">
            <Component components={{ ...MDXComponent }} />
          </div>

          <nav className="mt-12 pt-4 border-t border-dashed border-rule grid grid-cols-2 gap-4 text-[12px] md:text-[13px]">
            <div>
              {next && (
                <Link href={`/posts/${next.slug}`}>
                  <a className="block group hover:bg-surface/60 p-2 rounded-sm -mx-2">
                    <span className="dim">← newer · :n</span>
                    <span className="block text-ink mt-0.5 truncate group-hover:text-accent">
                      {next.title}
                    </span>
                  </a>
                </Link>
              )}
            </div>
            <div className="text-right">
              {prev && (
                <Link href={`/posts/${prev.slug}`}>
                  <a className="block group hover:bg-surface/60 p-2 rounded-sm -mx-2">
                    <span className="dim">older → · :p</span>
                    <span className="block text-ink mt-0.5 truncate group-hover:text-accent">
                      {prev.title}
                    </span>
                  </a>
                </Link>
              )}
            </div>
          </nav>

        </article>
      </CLIShell>
    </>
  )
}

function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toISOString().slice(0, 10)
}

export async function getStaticPaths() {
  const posts = await getFiles()
  return {
    paths: posts.map((p) => ({
      params: { slug: p.replace(/\.mdx/, '') },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug(params.slug)
  const allPostsData = getSortedPostsData()
  return { props: { ...post, allPostsData } }
}
