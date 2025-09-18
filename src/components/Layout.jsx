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

// import { useLocation } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
// import Header from './Header/Header.jsx';
// import SortControls from './SortControls/SortControls.jsx';

// const Layout = () => {
//   const location = useLocation();

//   const showSorter =
//     location.pathname === '/psychologists' ||
//     location.pathname === '/favorites';

//   return (
//     <div className={`layout ${location.pathname === '/' ? 'home' : 'other'}`}>
//       <Header />
//       <main>
//         {showSorter && <SortControls />}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;
