import Layout from '../components/layout'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import DarkModeContext from '../lib/dark_mode_context'
import { useEffect, useState } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  // const [darkMode, setDarkMode] = useState(false)

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setDarkMode(true)
  //     document.body.classList.add('dark')
  //   } else {
  //     setDarkMode(false)
  //     document.body.classList.remove('dark')
  //   }
  // }, [])

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode)

  //   if (darkMode) {
  //     document.body.classList.remove('dark')
  //   } else {
  //     document.body.classList.add('dark')
  //   }
  // }

  return (
    // <DarkModeContext.Provider value={[darkMode, toggleDarkMode]}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    // </DarkModeContext.Provider>
  )
}

export default MyApp
