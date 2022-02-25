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
            As of Feb 24, 2022
            </span>
          </h4>
          <section className="mt-[10px] md:mt-[10px]">
            <h3 className="mt-[10px] md:mt-[20px]">Manhanttan, NY</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              After my graduation, I have started my full-time job at EDPR as an Investment Analyst. 
            </p>
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">Currently, I work and live in Manhattan. </p>

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

            <h3 className="mt-[10px] md:mt-[20px]">mealq</h3> 
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
              If I have a MacBook and know how to code, why not build some iOS apps? mealq is a social networking app that I spend a good portion of my free time on.
            </p>
            <p className="pt-2 text-base sm:text-lg text-slate-600 dark:text-slate-200">
             It is still in beta, sign up here [link to come] to become a beta tester!
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
                href="https://www.amazon.com/Token-Economy-Web3-reinvents-Internet/dp/3982103819"
                target="_blank"
                rel="noreferrer"
                className="italic"
              >
                Token Economy: How the Web3 reinvents the Internet
              </a>
            </li>
            <li>
              The <a
                href="https://doc.rust-lang.org/book/"
                target="_blank"
                rel="noreferrer"
                className="italic">
                 book
              </a> to learn Rust programming language
            </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
