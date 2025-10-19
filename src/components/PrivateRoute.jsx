import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    toast('This page is available only for authorized users', { icon: '⚠️' });
    return <Navigate to="/" replace />;
  }

  return children;
}
