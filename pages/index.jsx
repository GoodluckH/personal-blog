import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import timeGreeting from "../lib/time_based_greeting";
import { getSortedPostsData } from "../lib/mdx";
import readingTime from "reading-time";
import postcss from "postcss";

export default function Home({ allPostsData }) {
  allPostsData.map(item => {
    console.log(item.title)
  })
  return (
    <>
      <Head>
        <title>Xipu Li</title>
        <meta name="description" content="Xipu Li's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-24 max-w-4xl px-5">
        {/** my description and intro */}
        <div>
          <h2 className="text-gray-900 dark:text-white">
            <span className="text-2xl md:text-3xl">
            👋 Hi, I&apos;m <b>Xipu</b>
            </span>
          </h2>
          <ul
            role="list"
            className="text-lg md:text-xl"
          >
            <li>
              born in{" "}
              <a
                href="https://en.wikipedia.org/wiki/Zhumadian"
                target="_blank"
                rel="noreferrer"
              >
                Zhumadian
              </a>
              , a city in Henan, China{" "}
            </li>
            <li>
              went to high school in <a 
               href="https://www.archbishopryan.com/"
                target="_blank"
                rel="noreferrer">Philadelphia</a> and <a
                href="https://www.bishopodowd.org/"
                target="_blank"
                rel="noreferrer"
                >Oakland</a>
            </li>
            <li>
              wrote and self-published <a      
              href="https://www.google.com/search?sxsrf=APq-WBty9ezcwY-ZvGwsNUu3FwiIfzqkmw:1644460579880&q=The+Imperium:+Empires+in+a+Fissure+Xipu+Li&stick=H4sIAAAAAAAAAOPgE-LVT9c3NEyJt0yPN62qUIJw0y3KLeJTinK0pLKTrfST8vOz9RNLSzLyi6xA7GKF_LycykWsWiEZqQqeuQWpRZmluVYKrrkFmUWpxQqZeQqJCm6ZxcWlRakKEZkFpQo-mTtYGQGb87a7bAAAAA&sa=X&ved=2ahUKEwiVydeFjfT1AhW4kokEHR4MCMEQmxMoAXoECB4QAw&biw=1299&bih=947&dpr=1"
                target="_blank"
                rel="noreferrer">a sci-fi book</a>
            </li>
            <li>
              studied finance at Fordham University
            </li>
            <li>
              <a href="https://moicandroic.home.blog/"
                target="_blank"
                rel="noreferrer">wrote about</a> and invested in public equity
            </li>
          </ul>
          <p className="py-1 text-slate-900 dark:text-gray-300 text-lg md:text-xl">
            Now, I&apos;m working full-time in finance and building apps on the side.
          </p>

          <section className="mt-[50px] md:mt-[100px]">
            <h2>Blog posts</h2>
        {/*     <ul role="list" className="text-lg md:text-xl "> */}
              
              {allPostsData.map((post) => (
                 <div key={post.slug}>
                  <h2 >
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.summary}</p>
                   {post.readingTime.text}
                 </div>
                 
               
              ))}
              
   
          </section>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  console.log(allPostsData.length)
  return {
    props: {
      allPostsData
    }
  }
}