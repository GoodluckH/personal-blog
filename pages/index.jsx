import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/mdx'
import useDarkMode from '../lib/useDarkMode'
import ProjectGrid from '../components/ProjectGrid'
import projects from '../data/projects.json'
import Subscribe from '../components/Subscribe'
import React, { useState } from 'react'

const COLORS_BY_YEAR = {
  2022: 'sky-500',
  2023: 'sky-500',
  2024: 'amber-500',
}

export default function Home({ allPostsData }) {
  const [darkMode] = useDarkMode()
  const [postPage, setPostPage] = useState(1)
  const PAGINATION = 5
  return (
    <>
      <Head>
        <title>Xipu Li</title>
        <meta name="description" content="Xipu Li's personal website" />

        {darkMode ? (
          <link
            rel="icon"
            href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💡</text></svg>`}
          />
        ) : (
          <link
            rel="icon"
            href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔨</text></svg>`}
          />
        )}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="bg-purple-500 pt-[10rem]">
        {/** my description and intro */}
        <div className="max-w-4xl bg-black -mr-2 sm:mr-0">
          <div className="border-2 border-black -translate-x-2 -translate-y-2 sm:-translate-x-3 sm:-translate-y-3 bg-white">
            <section className="bg-cyan-500 px-5 py-5 border-b-2 border-black">
              <h2 className="text-gray-900 dark:text-white">
                <span className="text-4xl font-black">Xipu Li</span>
              </h2>
              <ul role="list" className="text-lg md:text-xl font-semibold">
                <li>
                  born in{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Zhumadian"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Zhumadian
                  </a>
                  , a city in Henan, China{' '}
                </li>
                {/* <li>
              went to high school in{' '}
              <a
                href="https://www.archbishopryan.com/"
                target="_blank"
                rel="noreferrer"
              >
                Philadelphia
              </a>{' '}
              and{' '}
              <a
                href="https://www.bishopodowd.org/"
                target="_blank"
                rel="noreferrer"
              >
                Oakland
              </a>
            </li> */}
                <li>
                  wrote and self-published{' '}
                  <a
                    href="https://www.google.com/search?sxsrf=APq-WBty9ezcwY-ZvGwsNUu3FwiIfzqkmw:1644460579880&q=The+Imperium:+Empires+in+a+Fissure+Xipu+Li&stick=H4sIAAAAAAAAAOPgE-LVT9c3NEyJt0yPN62qUIJw0y3KLeJTinK0pLKTrfST8vOz9RNLSzLyi6xA7GKF_LycykWsWiEZqQqeuQWpRZmluVYKrrkFmUWpxQqZeQqJCm6ZxcWlRakKEZkFpQo-mTtYGQGb87a7bAAAAA&sa=X&ved=2ahUKEwiVydeFjfT1AhW4kokEHR4MCMEQmxMoAXoECB4QAw&biw=1299&bih=947&dpr=1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    a sci-fi book
                  </a>
                </li>
                <li>
                  <a
                    href="https://moicandroic.home.blog/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    wrote about
                  </a>{' '}
                  and invested in public equity
                </li>
                <li>
                  <a
                    href="https://letter.xipu.li/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    more writings
                  </a>
                </li>
              </ul>
              <p className="py-1 text-slate-900 font-bold text-lg md:text-xl">
                <Link href={'/now/'}>
                  <a>now</a>
                </Link>
                , I am building a consumer startup in San Francisco, CA
              </p>
            </section>

            <iframe
              src="https://embeds.beehiiv.com/f6a777c5-a3a3-4f63-91f6-5c902b7cff3f"
              data-test-id="beehiiv-embed"
              width="100%"
              height="320"
              frameborder="0"
              style={{
                borderRadius: '4px',
                border: '2px solid #e5e7eb',
                margin: '0',
                backgroundColor: '#FC05B0',
              }}
            ></iframe>

            <section className="pt-[50px]  px-5 py-5  bg-pink-300">
              <h1 className="text-4xl font-black mb-2">Writings</h1>

              {allPostsData
                .sort((a, b) => {
                  if (a.publishedAt > b.publishedAt) {
                    return -1
                  } else {
                    return 1
                  }
                })
                .slice(0, postPage * PAGINATION)
                .map((post) => {
                  if (!post.draft && !post.chinese) {
                    return (
                      <div
                        className={`mb-10 bg-black rounded-xl`}
                        key={post.slug}
                      >
                        <Link href={`/posts/${post.slug}`}>
                          <div className="border-2 border-black rounded-xl p-4 bg-yellow-500 hover:-translate-y-2 hover:-translate-x-2 hover:cursor-pointer active:translate-x-0 active:translate-y-0 transition duration-100 ease-in-out">
                            <h2 className="text-xl md:text-2xl pt-0 font-bold">
                              {post.title}
                            </h2>

                            <div className="flex items-center space-x-3">
                              <p
                                className={`border-black border-2 bg-lime-400 text-black px-3 py-1 text-sm font-bold rounded-full`}
                              >
                                {post.readingTime.text}
                              </p>
                              <p
                                className={`border-black border-2 bg-lime-400 text-black px-3 py-1 text-sm font-bold rounded-full`}
                              >
                                {post.publishedAt}
                              </p>
                            </div>

                            <p className="text-base italic pt-3 dark:text-gray-300 font-semibold">
                              {post.summary}
                            </p>
                          </div>
                        </Link>
                      </div>
                    )
                  }
                })}
              {postPage * PAGINATION < allPostsData.length && (
                <button
                  className="mt-5 text-gray-900 dark:text-white"
                  onClick={() => setPostPage(postPage + 1)}
                >
                  Load More
                </button>
              )}

              {/*Projects section*/}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
