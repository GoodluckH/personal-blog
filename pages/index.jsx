import Head from 'next/head'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/mdx'
import useDarkMode from '../lib/useDarkMode'
import ProjectGrid from '../components/ProjectGrid'
import projects from '../data/projects.json'
import Subscribe from '../components/Subscribe'
export default function Home({ allPostsData }) {
  const [darkMode] = useDarkMode()
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
      <div className="space-y-24 max-w-4xl px-5">
        {/** my description and intro */}
        <div>
          <h2 className="text-gray-900 dark:text-white">
            <span className="text-2xl md:text-3xl">
              👋 Hi, I&apos;m <b>Xipu</b>
            </span>
          </h2>
          <ul role="list" className="text-lg md:text-xl">
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
            <li>
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
            </li>
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
            <li>studied finance at Fordham University</li>
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
          </ul>
          <p className="py-1 text-slate-900 dark:text-gray-300 text-lg md:text-xl">
            <Link href={'/now/'}>
              <a>Now</a>
            </Link>
            , I am in San Francisco, CA
          </p>


          <section className="mt-[50px] md:mt-[80px]">
            <h2>Blog posts</h2>
            <section className="mt-[20px] mb-[40px] md:mt-[20px] md:mb-[40px]">
        
          </section>
            {allPostsData.map((post) => {
              if (!post.draft && !post.chinese) {
                return (
                  <div
                    className="mt-5 border-l-[4px] md:border-l-[7px] border-sky-200"
                    key={post.slug}
                  >
                    <div className="pl-5">
                      <h2 className="text-xl md:text-2xl pt-0">
                        <Link href={`/posts/${post.slug}`}>
                          <a> {post.title} </a>
                        </Link>
                      </h2>

                      <div className="flex items-center space-x-3">
                        <p className="px-3 py-1 text-sm font-medium text-sky-500 bg-gray-100 dark:bg-slate-200 rounded-full">
                          {post.readingTime.text}
                        </p>
                        <p className="px-3 py-1 text-sm font-medium text-sky-500 bg-gray-100 dark:bg-slate-200 rounded-full">
                          {post.publishedAt}
                        </p>
                      </div>

                      <p className="text-base italic pt-3 dark:text-gray-300">
                        {post.summary}
                      </p>
                    </div>
                  </div>
                )
              }
            })}
        <section className='mt-[30px]'>
        <Subscribe />
        </section>


          {/*Projects section*/}
          <section className="mt-[50px] md:mt-[80px]">
            <h2>Projects</h2>
            <ProjectGrid projects={projects} />
          </section>

          </section>
        </div>
      </div>
    </>
  )
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData.length)
  return {
    props: {
      allPostsData,
    },
  }
}
