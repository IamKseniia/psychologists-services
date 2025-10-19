import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const location = useLocation();

  return (
    <div className={`layout ${location.pathname === '/' ? 'home' : 'other'}`}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#fff', color: '#191a15' },
        }}
      />
    </div>
  );
};

export default Layout;
