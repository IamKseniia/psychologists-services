import { useFavorites } from '../../context/FavoritesContext';
import PsychologistCard from '../../components/PsychologistCard/PsychologistCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((item, index) => (
          <PsychologistCard key={index} psychologist={item} />
        ))
      )}
    </div>
  );
}
