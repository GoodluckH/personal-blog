import matter from 'gray-matter'
import { join } from 'path'
import readingTime from 'reading-time'
import { readdirSync, readFileSync } from 'fs'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'

import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import remarkFootnotes from 'remark-footnotes'

export async function getFiles() {
  return readdirSync(join(process.cwd(), 'posts'))
}

export async function getFileBySlug(slug) {
  const source = readFileSync(
    join(process.cwd(), 'posts', `${slug}.mdx`),
    'utf8'
  )

  const { code, frontmatter } = await bundleMDX({
    source: source,
    xdmOptions(options) {
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [remarkFootnotes, { inlineNotes: true }],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ]
      return options
    },
  })

  return {
    code,
    frontMatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  }
}

export async function getAllFilesFrontMatter() {
  const files = readdirSync(join(process.cwd(), 'posts'))

  return files.reduce((allPosts, postSlug) => {
    const source = readFileSync(join(process.cwd(), 'posts', postSlug), 'utf8')
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
        readingTime: readingTime(source),
      },
      ...allPosts,
    ]
  }, [])
}

export function getSortedPostsData() {
  const postsDirectory = path.join(process.cwd(), 'posts')

  const files = readdirSync(postsDirectory)

  const allPostsData = files.map((filename) => {
    console.log(filename)
    const slug = filename.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return {
      slug,
      readingTime: readingTime(fileContents),
      ...matterResult.data,
    }
  })
  console.log(allPostsData.length)
  return allPostsData.sort((a, b) => {
    if (a.date > b.date) {
      return -1
    } else {
      return 1
    }
  })
}
