import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import useTheme from '../lib/useTheme'

function MyApp({ Component, pageProps }) {
  useTheme()
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default MyApp
