import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-100';
const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // All required fields from User model
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    address: '',
    type: 'editor', // default per User model
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = form; // remove confirmPassword before sending
      await createUser(userData);
      navigate('/auth/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-500 mb-2">
          Get started
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Create your account to get started.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* First + Last Name */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">First Name</label>
            <input name="firstName" type="text" placeholder="First Name"
              className={inputClasses} value={form.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Last Name</label>
            <input name="lastName" type="text" placeholder="Last Name"
              className={inputClasses} value={form.lastName} onChange={handleChange} required />
          </div>
        </div>

        {/* Age + Gender */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-zinc-700">Age</label>
            <input name="age" type="text" placeholder="Age"
              className={inputClasses} value={form.age} onChange={handleChange} required />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700">Gender</label>
            <select name="gender" className={inputClasses} value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact + Address */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Contact Number</label>
          <input name="contactNumber" type="text" placeholder="09XXXXXXXXX"
            className={inputClasses} value={form.contactNumber} onChange={handleChange} required />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700">Address</label>
          <input name="address" type="text" placeholder="Your address"
            className={inputClasses} value={form.address} onChange={handleChange} required />
        </div>

        {/* Email + Username */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Email Address</label>
          <input name="email" type="email" placeholder="you@email.com"
            className={inputClasses} value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700">Username</label>
          <input name="username" type="text" placeholder="username"
            className={inputClasses} value={form.username} onChange={handleChange} required />
        </div>

        {/* Password + Confirm */}
        <div>
          <label className="text-sm font-medium text-zinc-700">Password</label>
          <input name="password" type="password" placeholder="••••••••"
            className={inputClasses} value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-700">Confirm Password</label>
          <input name="confirmPassword" type="password" placeholder="••••••••"
            className={inputClasses} value={form.confirmPassword} onChange={handleChange} required />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName} disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600 text-center">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-indigo-700 transition hover:text-indigo-900">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;