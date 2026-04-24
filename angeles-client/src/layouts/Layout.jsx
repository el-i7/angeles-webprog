import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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