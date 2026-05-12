import Navbar from './navbar'
import SocialIcons from './SocialIcons'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-24 animate-fadein">
        {children}
      </main>

      <footer className="w-full max-w-2xl mx-auto px-6 md:px-8 pb-10">
        <div className="border-t border-rule pt-6 flex items-center justify-between">
          <span className="label">Xipu Li · {new Date().getFullYear()}</span>
          <SocialIcons />
        </div>
      </footer>
    </div>
  )
}
