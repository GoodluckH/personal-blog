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
            As of Sep 16, 2022
            </span>
          </h4>
          <section className="mt-[10px] md:mt-[10px]">
            <h3 className="mt-[10px] md:mt-[20px]">San Francisco, CA</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              I am back to school. This year I will try to get a driver&#39;s license.
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

            <h3 className="mt-[10px] md:mt-[20px]">Life</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              Since I have already secured a software engineer internship for summer 2023, I plan to fully enjoy life to make up my rather hectic undergrad time. hmu if you are around SF, I am down to try out anything!      
              </p>
        

            <h3 className="mt-[10px] md:mt-[20px]">Reading</h3> 
            <ul
            role="list"
            className="text-base sm:text-lg text-slate-600 dark:text-slate-200"
          >
            <li>
              <a
                href="https://amzn.to/3UbUyup"
                target="_blank"
                rel="noreferrer"
                className="italic"
              >
                The Rise of Theodore Roosevelt
              </a>
            </li>
            <li>
              <a
                href="https://amzn.to/3Bu3vGW"
                target="_blank"
                rel="noreferrer"
                className="italic"
              >
                Amazon Unbound: Jeff Bezos and the Invention of a Global Empire
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
