import Navbar from "./navbar";
import SocialIcons from "./SocialIcons";
export default function Layout({ children, home }) {
  return (
    <div>
      <div className="transition-colors duration-500 ease-in-out bg-white dark:bg-slate-900 min-h-screen">
        <header className="w-full fixed top-0 z-10">
          <Navbar />
        </header>
        <main className="max-w-4xl mx-auto px-4 pb-24 pt-28">{children}</main>
        <footer className="sticky top-[100vh] pb-1 sm:pb-5 md:pb-8">
          <SocialIcons />
        </footer>
      </div>
    </div>
  );
}
