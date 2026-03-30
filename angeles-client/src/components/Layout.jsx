import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-400 tracking-wide">
            © 2025 Angeles INF 234 Studio. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-zinc-400">
            <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="/about" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="/articles" className="hover:text-indigo-600 transition-colors">Articles</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;