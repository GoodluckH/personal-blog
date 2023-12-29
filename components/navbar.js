import { useState, useEffect } from 'react'
import Link from 'next/link'
import { makePublicRouterInstance, useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => setScrollPosition(window.scrollY)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`w-full border-2 border-black transition duration-500 ease-in-out bg-white backdrop-filter  ${
        scrollPosition > 100
          ? 'backdrop-blur-md bg-opacity-80'
          : 'backdrop-blur-sm bg-opacity-20'
      }`}
    >
      <div className="py-3">
        <div className="mx-auto max-w-4xl flex justify-between items-center px-9">
          {/*If not home page, then display link to home*/}
          {router.pathname !== '/' && (
            <Link href="/">
              <a className="text-black dark:text-white font-semibold">
                Xipu Li
              </a>
            </Link>
          )}
          {router.pathname == '/' && (
            <Link href={'/now/'}>
              <a className="text-black dark:text-white font-semibold">Now</a>
            </Link>
          )}

          <div className="space-x-1.5 flex items-center">
            {/*Dark mode toggle*/}
            {/*     <button
              onClick={toggleDarkMode}
              className="w-9 h-9 text-gray-800 transition-colors duration-500 ease-in-out inline-flex
              items-center justify-center dark:bg-transparent dark:border-gray-300 dark:text-white"
            >
              Now
            </button> */}
            <nav className="space-x-2">
              {router.pathname !== '/now' && router.pathname !== '/' && (
                <span>
                  <Link href={'/now/'}>
                    <a className="text-black dark:text-white font-semibold">
                      Now
                    </a>
                  </Link>
                </span>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
