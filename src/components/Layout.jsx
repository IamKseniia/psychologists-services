import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header.jsx';

const Layout = () => {
  const location = useLocation();

  return (
    <div className={`layout ${location.pathname === '/' ? 'home' : 'other'}`}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
