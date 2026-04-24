import { NavLink, Link } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200',
    isActive
      ? 'text-indigo-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-700 after:rounded-full'
      : 'text-zinc-500 hover:text-indigo-700',
  ].join(' ');

// Custom SVG Logo
const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Angeles Logo">
    <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="#4338ca" />
    <text x="18" y="25" textAnchor="middle" fontSize="18" fontWeight="800" fontFamily="Georgia, serif" fill="white">A</text>
    <circle cx="27" cy="9" r="3" fill="#a5b4fc" />
  </svg>
);

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo + Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <div className="flex flex-col leading-tight">
            <span className="text-[15px] font-extrabold text-zinc-900 tracking-tight group-hover:text-indigo-700 transition-colors">
              Angeles
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-500">
              BSIT · Portfolio
            </span>
          </div>
        </NavLink>

        {/* Nav Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Enhancement 3: Auth access points */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/auth/signin"
            className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 hover:text-indigo-700 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/auth/signup"
            className="inline-flex items-center rounded-full bg-indigo-700 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-indigo-800 transition-colors shadow"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu icon */}
        <button className="flex flex-col gap-1.5 p-2 md:hidden" aria-label="Open menu">
          <span className="block h-0.5 w-5 bg-zinc-700 rounded" />
          <span className="block h-0.5 w-5 bg-zinc-700 rounded" />
          <span className="block h-0.5 w-5 bg-zinc-700 rounded" />
        </button>

      </div>
    </header>
  );
};

export default NavBar;