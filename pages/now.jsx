import Head from 'next/head'
import Link from 'next/link'
import ExpandableCard from '../components/ExpandableCard'
// import styles from "../styles/Home.module.css";
import timeGreeting from '../lib/time_based_greeting'

import useDarkMode from '../lib/useDarkMode'

export default function Home() {
  const [darkMode] = useDarkMode()
  return (
    <>
      <Head>
        <title>Now</title>
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
      </Head>
      <div className="max-w-4xl  mt-[10rem] bg-black  -mr-2 sm:mr-0">
<div className='bg-rose-300 border-black border-2 px-5 -translate-x-2 -translate-y-2'>    <div>
          <h2 className="text-gray-900 dark:text-white">
            <span className="text-4xl font-black">Now</span>
          </h2>
          <h4 className="text-black">
            <span className="text-base italic md:text-md">
              As of Sep 22, 2024
            </span>
          </h4>
          <section className="mt-[10px] md:mt-[10px] font-semibold">
            <h3 className="mt-[10px] md:mt-[20px] text-black font-extrabold">Amazon</h3>
            <p className="pt-2 text-base sm:text-lg ">
              I&apos;m working as a Software Development Engineer at Amazon.
            </p>


            <h3 className="mt-[10px] md:mt-[20px] text-black font-extrabold">Forget</h3>
            <p className="pt-2 text-base sm:text-lg text-black">
              I&#39;m building a <a href="https://forget.work" target="_blank" rel="noreferrer">productivity tool</a> that helps people with ADHD focus at work.
            </p>

            <h3 className="mt-[10px] md:mt-[20px] text-black font-extrabold">Reading</h3>
            <ul
              role="list"
              className="text-base sm:text-lg text-slate-600 dark:text-slate-200"
            >
            
              <li>
                <a
                  href="https://amzn.to/4eckvn6"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Grinding It Out: The Making of McDonald&#39;s
                </a>
              </li>
              <li>
                <a
                  href="https://amzn.to/4dfip4n"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Caste: The Origins of Our Discontents
                </a>
              </li>
         
            </ul>
            <h2></h2>

            <ExpandableCard title="Book Shelf">
            <h3 className="mt-[10px] md:mt-[20px]">2024</h3>
            <ul
                role="list"
                className="text-base sm:text-lg"
              >
                  <li>
                <a
                  href="https://amzn.to/3ZFO7EK"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Same as Ever: A Guide to What Never Changes
                </a>
              </li>
                 <li>
                <a
                  href="https://amzn.to/4dC7bIv"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Chaos Monkeys: Obscene Fortune and Random Failure in Silicon Valley
                </a>
              </li>
            
            <li>
                <a
                  href="https://amzn.to/3AzU3on"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
The Algebra of Wealth: A Simple Formula for Financial Security               
 </a>
              </li>
            <li>
                <a
                  href="https://amzn.to/4dY8iBL"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Disrupted: Ludicrous Misadventures in the Tech Start-up Bubble
                </a>
              </li>
              <li>
                <a
                  href="https://amzn.to/3S0ABaS"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Six of Crows
                </a>
              </li>
              <li>
                <a
                  href="https://amzn.to/4g2pQhV"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
Daring Greatly: How the Courage to Be Vulnerable Transforms the Way We Live, Love, Parent, and Lead                </a>
              </li>
              <li>
                <a
                  href="https://amzn.to/3XmxJrt"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
Status and Culture: How Our Desire for Social Rank Creates Taste, Identity, Art, Fashion, and Constant Change             
</a>
 </li>

                </ul>
            

            <h3 className="mt-[10px] md:mt-[20px]">2023</h3>

              <ul
                role="list"
                className="text-base sm:text-lg"
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
                  href="https://amzn.to/3WqWj6J"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                 Lights Out: Pride, Delusion, and the Fall of General Electric
                </a>
              </li>
              <li>
                <a
                  href="https://amzn.to/46me39G"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                 Red Queen
                </a>
              </li>
             
            <li>
                <a
                  href="https://amzn.to/44f1RFB"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                 Outlive: The Science and Art of Longevity
                </a>
              </li>
            <li>
                <a
                  href="https://amzn.to/3pdP9Z9"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                 Guns, Germs, and Steel: The Fates of Human Societies
                </a>
              </li>
            <li>
                <a
                  href="https://amzn.to/3PtggKr"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                 To Sell Is Human: The Surprising Truth About Moving Others
                </a>
              </li>
            <li>
                <a
                  href="https://amzn.to/3NJM6B5"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                 Influence: The Psychology of Persuasion
                </a>
              </li>
            <li>
                <a
                  href="https://amzn.to/3DTiAV3"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Ikigai: The Japanese Secret to a Long and Happy Life
                </a>
              </li>
                
                </ul>


              <h3 className="mt-[10px] md:mt-[20px]">2022</h3>
              <ul
                role="list"
                className="text-base sm:text-lg text-slate-600 dark:text-slate-200"
              >
                <li>
                <a
                  href="https://amzn.to/3SucSwY"
                  target="_blank"
                  rel="noreferrer"
                  className="italic"
                >
                  Onward: How Starbucks Fought for Its Life without Losing Its
                  Soul
                </a>
              </li>
                <li>
                  <a
                    href="https://amzn.to/3Bu3vGW"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Amazon Unbound: Jeff Bezos and the Invention of a Global
                    Empire
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3dPc7jg"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Give and Take: Why Helping Others Drives Our Success
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3SsetTS"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Ego Is the Enemy
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3BKcIuD"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Red Roulette: An Insider&#39;s Story of Wealth, Power,
                    Corruption, and Vengeance in Today&#39;s China
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3ffuuym"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Frankenstein
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3LI3JyE"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Mental Immunity: Infectious Ideas, Mind-Parasites, and the
                    Search for a Better Way to Think
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3r34SYh"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Counselling for Toads: A Psychological Adventure
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3xTtCps"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Adult Children of Emotionally Immature Parents: How to Heal
                    from Distant, Rejecting, or Self-Involved Parents
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3S6g6XL"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    What Happened to You?: Conversations on Trauma, Resilience,
                    and Healing
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3CbPa3r"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Token Economy: How the Web3 reinvents the Internet
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3LHklXc"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Status Anxiety
                  </a>
                </li>
              </ul>

              <h3 className="mt-[10px] md:mt-[20px]">2021</h3>
              <ul
                role="list"
                className="text-base sm:text-lg text-slate-600 dark:text-slate-200"
              >
                <li>
                  <a
                    href="https://amzn.to/3DVjikU"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    The Subtle Art of Not Giving a F*ck
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3DYjy2B"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Stillness Is the Key
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3DQ4hAz"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Land Of Big Numbers: Stories
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3r8kk5c"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    What If?: Serious Scientific Answers to Absurd Hypothetical
                    Questions
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3Su4JbS"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    A Compass to Fulfillment: Passion and Spirituality in Life
                    and Business
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3Sj2wQT"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    You Can Be a Stock Market Genius: Uncover the Secret Hiding
                    Places of Stock Market Profits
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3BLFACG"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Delivering Happiness
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3RdEG7J"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Value Investing: From Graham to Buffett and Beyond
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3RdE4yQ"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Competition Demystified: A Radically Simplified Approach to
                    Business Strategy
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3DTTndo"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    The Most Important Thing
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3UELcaM"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Tools Of Titans: The Tactics, Routines, and Habits of
                    Billionaires, Icons, and World-Class Performers
                  </a>
                </li>
              </ul>

              <h3 className="mt-[10px] md:mt-[20px]">2020</h3>
              <ul
                role="list"
                className="text-base sm:text-lg text-slate-600 dark:text-slate-200"
              >
                <li>
                  <a
                    href="https://amzn.to/3xSG1tY"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    The Almanack of Naval Ravikant: A Guide to Wealth and
                    Happiness
                  </a>
                </li>

                <li>
                  <a
                    href="https://amzn.to/3DUvZfE"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    The Psychology of Money: Timeless lessons on wealth, greed,
                    and happiness
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3Sxnj2V"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    What I Learned Losing A Million Dollars
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3Su3rxy"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Kochland: The Secret History of Koch Industries and
                    Corporate Power in America
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3C48FK3"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Zero To One
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3Reyahd"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Ai Superpowers
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3C8uh91"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Thing Explainer: Complicated Stuff in Simple Words
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3r329Ox"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    Distressed Debt Analysis: Strategies for Speculative
                    Investors
                  </a>
                </li>
                <li>
                  <a
                    href="https://amzn.to/3xROopu"
                    target="_blank"
                    rel="noreferrer"
                    className="italic"
                  >
                    1984
                  </a>
                </li>
              </ul>
            </ExpandableCard>
          </section>

          <p className="pt-10 italic text-sm sm:text-sm text-slate-8 mb-5">
            Inspired by{' '}
            <a
              href="https://www.natecation.com/"
              target="_blank"
              rel="noreferrer"
            >
              Nathan Leung
            </a>
            &apos;{' '}
            <a
              href="https://www.natecation.com/now/"
              target="_blank"
              rel="noreferrer"
            >
              now
            </a>{' '}
            page.
          </p>
        </div></div>
    
      </div>
    </>
  )
}
