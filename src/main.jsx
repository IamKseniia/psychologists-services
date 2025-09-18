import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App.jsx';
import { AuthProvider } from './context/AuthContext';
import { SorterProvider } from './context/SorterContext';
import { FavoritesProvider } from './context/FavoritesContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SorterProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </SorterProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
