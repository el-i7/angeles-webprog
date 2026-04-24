import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">

        {/* ── Left — Full cover image panel ── */}
        <div className="relative hidden lg:block">
          {/* Full cover photo */}
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85"
            alt="Developer working"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-indigo-950/60" />

          {/* Content on top of image */}
          <div className="relative z-10 flex h-full flex-col justify-between p-12">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <svg width="38" height="38" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="18,2 33,10 33,26 18,34 3,26 3,10" fill="#6366f1" />
                <text x="18" y="25" textAnchor="middle" fontSize="18" fontWeight="800" fontFamily="Georgia, serif" fill="white">A</text>
                <circle cx="27" cy="9" r="3" fill="#a5b4fc" />
              </svg>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-extrabold text-white tracking-tight">Angeles</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-indigo-300">BSIT · Portfolio</span>
              </div>
            </Link>

            {/* Bottom quote */}
            <div>
              <p className="text-2xl font-extrabold leading-snug text-white max-w-sm">
                "Every great developer you know got there by solving problems they were unqualified to solve."
              </p>
              <p className="mt-4 text-sm text-indigo-300 font-medium">— Patrick McKenzie</p>
            </div>
          </div>
        </div>

        {/* ── Right — Auth form ── */}
        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">

            {/* Back to Home button — top of form panel */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 hover:text-indigo-700 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>

            <Outlet />
          </div>
        </main>

      </div>
    </section>
  );
};

export default AuthLayout;