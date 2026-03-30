import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'bg-indigo-700 text-white hover:bg-indigo-800 shadow-md hover:shadow-lg',
  secondary: 'bg-white text-indigo-700 border-2 border-indigo-700 hover:bg-indigo-50',
  ghost: 'bg-transparent text-indigo-700 hover:bg-indigo-50 border border-indigo-300',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200 cursor-pointer',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;