import { useRef } from 'react'
import CLIShell from '../components/CLIShell'
import ExpandableCard from '../components/ExpandableCard'
import SEO from '../components/SEO'
import { getSortedPostsData } from '../lib/mdx'
import useLinkWalk from '../lib/useLinkWalk'

export default function Now({ allPostsData }) {
  const containerRef = useRef(null)
  useLinkWalk({ containerRef })

  const posts = (allPostsData || [])
    .filter((p) => !p.draft && !p.chinese)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))

  return (
    <>
      <SEO
        title="Now"
        description="What Xipu Li is working on, reading, and thinking about right now."
        path="/now"
        image="/og/now.png"
      />

      <CLIShell posts={posts} cwd="~/now">
        <div ref={containerRef}>
        <p className="px-2 text-[12px] md:text-[13px] dim mb-2">
          <span className="text-accent">$</span> cat now.md
        </p>

        <div className="px-2 space-y-6 text-[13px] md:text-[14px]">
          <p className="dim">
            <span className="text-accent"># </span>
            now — updated 2026-05-11
          </p>

          <Section heading="work">
            <p>
              Engineer at <Ext href="https://finchlegal.com">Finch</Ext>.
            </p>
          </Section>

          <Section heading="side">
            <p>
              Building <Ext href="https://drinkable.art">drinkable.art</Ext> —
              a crowd-voted directory of NYC cafés for remote workers.
            </p>
          </Section>

          <Section heading="reading">
            <ul className="space-y-0.5">
              <Item>
                <Ext href="https://amzn.to/4li1vpU">One Golden Summer</Ext>
              </Item>
              <Item>
                <Ext href="https://amzn.to/4meaxp2">
                  Sam Walton: Made In America
                </Ext>
              </Item>
            </ul>
          </Section>

          <Section heading="archive">
            <ExpandableCard title="bookshelf" toggleId="bookshelf">
              <BookYear year="2025">
                <Book href="https://amzn.to/4eckvn6">
                  Grinding It Out: The Making of McDonald&#39;s
                </Book>
                <Book href="https://amzn.to/4dfip4n">
                  Caste: The Origins of Our Discontents
                </Book>
              </BookYear>
              <BookYear year="2024">
                <Book href="https://amzn.to/3ZFO7EK">Same as Ever</Book>
                <Book href="https://amzn.to/4dC7bIv">Chaos Monkeys</Book>
                <Book href="https://amzn.to/3AzU3on">The Algebra of Wealth</Book>
                <Book href="https://amzn.to/4dY8iBL">Disrupted</Book>
                <Book href="https://amzn.to/3S0ABaS">Six of Crows</Book>
                <Book href="https://amzn.to/4g2pQhV">Daring Greatly</Book>
                <Book href="https://amzn.to/3XmxJrt">Status and Culture</Book>
              </BookYear>
              <BookYear year="2023">
                <Book href="https://amzn.to/3UbUyup">
                  The Rise of Theodore Roosevelt
                </Book>
                <Book href="https://amzn.to/3WqWj6J">
                  Lights Out: The Fall of GE
                </Book>
                <Book href="https://amzn.to/46me39G">Red Queen</Book>
                <Book href="https://amzn.to/44f1RFB">Outlive</Book>
                <Book href="https://amzn.to/3pdP9Z9">
                  Guns, Germs, and Steel
                </Book>
                <Book href="https://amzn.to/3PtggKr">To Sell Is Human</Book>
                <Book href="https://amzn.to/3NJM6B5">Influence</Book>
                <Book href="https://amzn.to/3DTiAV3">Ikigai</Book>
              </BookYear>
              <BookYear year="2022">
                <Book href="https://amzn.to/3SucSwY">Onward</Book>
                <Book href="https://amzn.to/3Bu3vGW">Amazon Unbound</Book>
                <Book href="https://amzn.to/3dPc7jg">Give and Take</Book>
                <Book href="https://amzn.to/3SsetTS">Ego Is the Enemy</Book>
                <Book href="https://amzn.to/3BKcIuD">Red Roulette</Book>
                <Book href="https://amzn.to/3ffuuym">Frankenstein</Book>
                <Book href="https://amzn.to/3LI3JyE">Mental Immunity</Book>
                <Book href="https://amzn.to/3r34SYh">
                  Counselling for Toads
                </Book>
                <Book href="https://amzn.to/3xTtCps">
                  Adult Children of Emotionally Immature Parents
                </Book>
                <Book href="https://amzn.to/3S6g6XL">What Happened to You?</Book>
                <Book href="https://amzn.to/3CbPa3r">Token Economy</Book>
                <Book href="https://amzn.to/3LHklXc">Status Anxiety</Book>
              </BookYear>
              <BookYear year="2021">
                <Book href="https://amzn.to/3DVjikU">
                  The Subtle Art of Not Giving a F*ck
                </Book>
                <Book href="https://amzn.to/3DYjy2B">Stillness Is the Key</Book>
                <Book href="https://amzn.to/3DQ4hAz">Land of Big Numbers</Book>
                <Book href="https://amzn.to/3r8kk5c">What If?</Book>
                <Book href="https://amzn.to/3Su4JbS">
                  A Compass to Fulfillment
                </Book>
                <Book href="https://amzn.to/3Sj2wQT">
                  You Can Be a Stock Market Genius
                </Book>
                <Book href="https://amzn.to/3BLFACG">Delivering Happiness</Book>
                <Book href="https://amzn.to/3RdEG7J">Value Investing</Book>
                <Book href="https://amzn.to/3RdE4yQ">
                  Competition Demystified
                </Book>
                <Book href="https://amzn.to/3DTTndo">
                  The Most Important Thing
                </Book>
                <Book href="https://amzn.to/3UELcaM">Tools of Titans</Book>
              </BookYear>
              <BookYear year="2020">
                <Book href="https://amzn.to/3xSG1tY">
                  The Almanack of Naval Ravikant
                </Book>
                <Book href="https://amzn.to/3DUvZfE">
                  The Psychology of Money
                </Book>
                <Book href="https://amzn.to/3Sxnj2V">
                  What I Learned Losing A Million Dollars
                </Book>
                <Book href="https://amzn.to/3Su3rxy">Kochland</Book>
                <Book href="https://amzn.to/3C48FK3">Zero to One</Book>
                <Book href="https://amzn.to/3Reyahd">AI Superpowers</Book>
                <Book href="https://amzn.to/3C8uh91">Thing Explainer</Book>
                <Book href="https://amzn.to/3r329Ox">
                  Distressed Debt Analysis
                </Book>
                <Book href="https://amzn.to/3xROopu">1984</Book>
              </BookYear>
            </ExpandableCard>
          </Section>

          <p className="dim pt-6">
            <span className="text-accent">--</span> EOF · inspired by{' '}
            <Ext href="https://www.natecation.com/now/">nathan&apos;s now</Ext>
          </p>
        </div>
        </div>
      </CLIShell>
    </>
  )
}

function Section({ heading, children }) {
  return (
    <section>
      <p className="dim mb-1.5">
        <span className="text-accent">## </span>
        {heading}
      </p>
      <div className="text-ink">{children}</div>
    </section>
  )
}

function Item({ children }) {
  return (
    <li className="flex gap-2">
      <span className="dim">–</span>
      <span>{children}</span>
    </li>
  )
}

function BookYear({ year, children }) {
  return (
    <div className="mt-4 first:mt-2 grid grid-cols-[3.5rem_1fr] gap-x-3 text-[13px]">
      <p className="dim tnum pt-0.5">{year}</p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  )
}

function Book({ href, children }) {
  return (
    <li className="flex gap-2">
      <span className="dim">–</span>
      <Ext href={href}>{children}</Ext>
    </li>
  )
}

function Ext({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline decoration-rule underline-offset-2 hover:decoration-accent hover:text-accent"
    >
      {children}
    </a>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return { props: { allPostsData } }
}
