import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500 mb-2">
          Get started
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Sign Up
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Create your account with the same monochrome layout pattern and shared button treatment.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">

        {/* First + Last name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="signup-confirm" className="text-sm font-medium text-zinc-700">
            Confirm Password
          </label>
          <input
            id="signup-confirm"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
          />
        </div>

        {/* Terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer text-sm text-zinc-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-indigo-700 shrink-0"
          />
          <span>
            I agree to the{' '}
            <span className="font-semibold text-indigo-700 hover:underline cursor-pointer">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="font-semibold text-indigo-700 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </span>
        </label>

        {/* Submit */}
        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        {/* Divider */}
        <div className="relative flex items-center gap-3 py-1">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        {/* Social buttons */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>

      </form>

      {/* Sign in link */}
      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600 text-center">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-indigo-700 transition hover:text-indigo-900"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;