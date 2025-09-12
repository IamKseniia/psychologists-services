import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = psychologist => {
    setFavorites(prev => {
      const exists = prev.find(p => p.name === psychologist.name);
      if (exists) {
        return prev.filter(p => p.name !== psychologist.name);
      }
      return [...prev, psychologist];
    });
  };

  const isFavorite = name => favorites.some(p => p.name === name);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
