import { useMemo } from "react";
import Image from "next/image";
import Head from "next/head";
import useDarkMode from "../../lib/useDarkMode";


import { getFiles, getFileBySlug } from "../../lib/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import MDXComponent from "../../components/MDXComponents";

import {Markup} from 'interweave';

export default function BlogSlug({ code, frontMatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  let caption = String(frontMatter.coverImageCaption)
  const [darkMode] = useDarkMode()
  return (
    <>
      <Head>
        <title>{frontMatter.title} || Xipu Li</title>
        <meta name="description" content={frontMatter.summary} />
        {darkMode ? 
        <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>π‘</text></svg>`} />
          :
          <link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>π¨</text></svg>`} />
        }
      </Head>
      <div className="flex max-w-6xl mx-auto">
        <div className="flex flex-col max-w-4xl px-5 mx-auto space-y-10">
          <div className="flex flex-col mt-25 space-y-7">
            {frontMatter.draft ? <h2 className="text-red-500 dark:text-red-300">DRAFT</h2> : <></>}
            {frontMatter.chinese ? <h2 className="text-red-500 dark:text-red-300">δΈ­ζ</h2> : <></>}
            <h1>{frontMatter.title}</h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">{frontMatter.summary}</p>
            <div className="flex items-center space-x-3">
              <p className="px-3 py-1 text-sm font-medium text-sky-500 bg-gray-100 dark:bg-slate-200 rounded-full">
                {frontMatter.readingTime.text}
              </p>
              <p className="px-3 py-1 text-sm font-medium text-sky-500 bg-gray-100 dark:bg-slate-200 rounded-full">
                Date : {frontMatter.publishedAt}
              </p>
            </div>
            <div className="overflow-hidden">
              <Image
                priority
                src={frontMatter.image}
                width={800}
                height={533}
                layout="responsive"
                objectFit="cover"
                alt="cover image"
                className="dark:brightness-90 rounded-xl"
              />
              <figcaption>
              <Markup content={caption} />
              </figcaption>
            </div>
          </div>
          <article>
            <Component components={{ ...MDXComponent }} />
          </article>
          <hr/>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles();

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug(params.slug);

  return { props: { ...post } };
}
