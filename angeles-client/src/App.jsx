import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Layouts
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import DashLayout from './layouts/DashLayout';

// Landing Pages
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

// Auth Pages
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Other
import NotFoundPage from './pages/NotFoundPage';

// ✅ Enhancement 1 fix: editors CAN access UsersPage, only viewers cannot
const EditorAndAboveRoute = ({ children }) => {
  const userType = localStorage.getItem('type') || 'admin';
  if (!userType) return <Navigate to="/auth/signin" />;
  if (userType === 'viewer') return <Navigate to="/dashboard/" />;
  return children;
};

// Protect entire dashboard from unauthenticated users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/auth/signin" />;
  return children;
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'articles', element: <ArticleListPage /> },
      { path: 'articles/:name', element: <ArticlePage /> },
    ],
  },
  {
    path: 'auth/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
    ],
  },
  {
    path: 'dashboard/',
    element: (
      <ProtectedRoute>
        <DashLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'reports', element: <ReportsPage /> },
      {
        path: 'users',
        element: (
          // ✅ admin and editor can access, viewer cannot
          <EditorAndAboveRoute>
            <UsersPage />
          </EditorAndAboveRoute>
        ),
      },
      { path: 'articles', element: <DashArticleListPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;