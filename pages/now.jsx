import Head from "next/head";
import Link from "next/link";
// import styles from "../styles/Home.module.css";
import timeGreeting from "../lib/time_based_greeting";

import useDarkMode from "../lib/useDarkMode";

export default function Home() {
  const [darkMode] = useDarkMode()
  return (
    <>
      <Head>
        <title>Now</title>
        <meta name="description" content="Xipu Li's personal website" />
        {darkMode ? 
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💡</text></svg>`} />
          :
          <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔨</text></svg>`} />
        }
      </Head>
      <div className="space-y-24 max-w-4xl px-5">
        {/** my description and intro */}
        <div>
          <h2 className="text-gray-900 dark:text-white">
            <span className="text-2xl md:text-3xl">
            Now
            </span>
          </h2>
          <h4 className="text-gray-500 dark:text-gray-400">
            <span className="text-base italic md:text-md">
            As of June 18, 2022
            </span>
          </h4>
          <section className="mt-[10px] md:mt-[10px]">
            <h3 className="mt-[10px] md:mt-[20px]">San Diego, CA</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              I will be spending this summer in San Diego for a software engineer internship at <a 
              href="https://edge.app/"
              target="_blank"
              rel="noreferrer"
              >Edge</a>.
            </p>

            <h3 className="mt-[10px] md:mt-[20px]">VTOL</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              I am actively involved in and contributing to a <a 
              href="https://arrowair.com/"
              target="_blank"
              rel="noreferrer"
              >DAO</a> that aims to make <a 
              href="https://en.wikipedia.org/wiki/VTOL"
              target="_blank"
              rel="noreferrer"
              >VTOL</a> rideshare accessible to everyone (think Uber for drones).
            </p>

            <h3 className="mt-[10px] md:mt-[20px]">LeetCode</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              Apparently, I am breaking into tech at a very difficult time. Grinding LeetCode appears to be a good use of my free time.          
              </p>
        

            <h3 className="mt-[10px] md:mt-[20px]">Reading</h3> 
            <ul
            role="list"
            className="text-base sm:text-lg text-slate-600 dark:text-slate-200"
          >
            <li>
              <a
                href="https://www.amazon.com/Theodore-Roosevelt-Modern-Library-Paperback/dp/0375756787"
                target="_blank"
                rel="noreferrer"
                className="italic"
              >
                The Rise of Theodore Roosevelt
              </a>
            </li>
            <li>
              <a
                href="https://www.amazon.com/Give-Take-Helping-Others-Success"
                target="_blank"
                rel="noreferrer"
                className="italic"
              >
                Give and Take: A Revolutionary Approach to Success
              </a>
            </li>
            </ul>
          </section>

          <p className="pt-10 italic text-sm sm:text-sm text-slate-500 dark:text-slate-500">Inspired by <a
                href="https://www.natecation.com/"
                target="_blank"
                rel="noreferrer"
                >Nathan Leung
                  </a>&apos; <a
                href="https://www.natecation.com/now/"
                target="_blank"
                rel="noreferrer"
                >
                 now
              </a> page.</p>
        </div>
      </div>
    </>
  );
}
