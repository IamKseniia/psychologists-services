import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = psychologist => {
    setFavorites(prev => {
      const exists = prev.some(
        p => p.license === psychologist.license && p.name === psychologist.name
      );
      if (exists) {
        return prev.filter(
          p =>
            !(
              p.license === psychologist.license && p.name === psychologist.name
            )
        );
      } else {
        return [...prev, psychologist];
      }
    });
  };

  const isFavorite = psychologist =>
    favorites.some(
      p => p.license === psychologist.license && p.name === psychologist.name
    );

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
