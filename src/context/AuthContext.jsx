import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    navigate('/');
  };

  const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
