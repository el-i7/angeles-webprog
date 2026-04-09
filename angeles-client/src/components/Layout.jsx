import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-zinc-900 bg-zinc-900 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              {/* Inline logo */}
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="#6366f1" />
                <text x="18" y="25" textAnchor="middle" fontSize="18" fontWeight="800" fontFamily="Georgia, serif" fill="white">A</text>
                <circle cx="27" cy="9" r="3" fill="#a5b4fc" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold text-white tracking-tight">Angeles</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-400">BSIT · Portfolio</span>
              </div>
            </div>
            <p className="text-xs leading-6 text-zinc-400">
              A personal portfolio built with React JS and Tailwind CSS as part of INF 234 — Web Programming.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Navigation
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Articles', to: '/articles' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-xs text-zinc-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Topics I Write About
            </p>
            <div className="flex flex-wrap gap-2">
              {['HTML & CSS', 'JavaScript', 'React JS', 'UI/UX Design', 'Tailwind CSS'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-700 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-zinc-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-zinc-500">
            © {currentYear} Angeles · BSIT Student, National University
          </p>
          <p className="text-[11px] text-zinc-600">
            Built with React JS · Tailwind CSS · Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <NavBar />
      {/* pt-20 offsets the fixed navbar height */}
      <main className="flex-1 pb-0 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;