import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { loginUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100';
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });

      // Enhancement 1: Viewers cannot log in to the dashboard
      if (data.type === 'viewer') {
        setError('Viewer accounts do not have dashboard access.');
        setLoading(false);
        return;
      }

      // Save to localStorage for admin and editor only
      localStorage.setItem('token', data.token);
      localStorage.setItem('type', data.type);
      localStorage.setItem('firstName', data.firstName);

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500 mb-2">
          Welcome back
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Log In
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Access your account using the same monochrome wireframe language used across the site.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-600 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-indigo-700" />
            <span>Remember me</span>
          </label>
          <button type="button" className="font-medium text-indigo-600 transition hover:text-indigo-800 text-sm">
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>

        <div className="relative flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>Log In with Google</Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>Log In with Apple</Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600 text-center">
        No account yet?{' '}
        <Link to="/auth/signup" className="font-semibold text-indigo-700 transition hover:text-indigo-900">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;