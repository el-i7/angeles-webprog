import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">

        {/* Big 404 */}
        <p className="text-[120px] font-extrabold leading-none text-indigo-200 select-none">
          404
        </p>

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-zinc-900 bg-white shadow-md -mt-4">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-indigo-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 14.828L12 12m0 0l2.828-2.828M12 12L9.172 9.172M12 12l2.828 2.828M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-extrabold text-zinc-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm leading-7 text-zinc-500">
          The link you followed to get here must be broken, or the page may have been moved.
          Don't worry — let's get you back on track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-indigo-700 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-indigo-800 transition-colors shadow"
          >
            Back to Home
          </Link>
          <Link
            to="/articles"
            className="inline-flex items-center rounded-full border-2 border-indigo-700 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            Browse Articles
          </Link>
        </div>

        {/* Subtle nav hint */}
        <p className="mt-8 text-xs text-zinc-400">
          You can also try{' '}
          <Link to="/about" className="text-indigo-600 hover:underline">About</Link>
          {' '}or check the navigation bar above.
        </p>

      </div>
    </div>
  );
}

export default NotFoundPage;