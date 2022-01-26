import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import timeGreeting from "../lib/time_based_greeting";
export default function Home() {
  return (
    <>
      <Head>
        <title>Xipu Li</title>
        <meta name="description" content="Xipu Li's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-24">
        {/** my description and intro */}
        <div>
          <h1 className="text-gray-900 dark:text-white">
            <span className="text-2xl">
              Hi, I'm <b>Xipu</b>
            </span>
          </h1>
          <ul
            role="list"
            className="marker:text-sky-400 list-disc pl-5 max-w-4xl mt-5 text-lg md:text-xl text-gray-500 dark:text-gray-400"
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
          </ul>
          <br/>
          <p className=" text-gray-500 dark:text-gray-400">
            The site is under construction 🚧
          </p>
        </div>
      </div>
    </>
  );
}
