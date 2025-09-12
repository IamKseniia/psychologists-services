import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Layout from './Layout.jsx';
import Loader from './Loader/Loader.jsx';
import PrivateRoute from './PrivateRoute.jsx';

const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const PsychologistsPage = lazy(() =>
  import('../pages/PsychologistsPage/PsychologistsPage.jsx')
);
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage/FavoritesPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage.jsx')
);

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
