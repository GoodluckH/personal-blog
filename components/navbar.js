import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const isHome = router.pathname === '/'

  return (
    <div className="fixed top-0 inset-x-0 z-50 nav-glass">
      <div className="max-w-2xl mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        <Link href="/">
          <a className="text-[15px] font-medium tracking-tight2 text-ink hover:opacity-60">
            Xipu Li
          </a>
        </Link>
        <nav className="flex items-center gap-5 text-[14px] text-muted">
          {!isHome && (
            <Link href="/">
              <a className="hover:text-ink">Index</a>
            </Link>
          )}
          {router.pathname !== '/now' && (
            <Link href="/now">
              <a className="hover:text-ink">Now</a>
            </Link>
          )}
        </nav>
      </div>
    </div>
  )
}
