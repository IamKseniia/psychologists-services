import s from './PsychologistCard.module.css';
import { useFavorites } from '../../context/FavoritesContext';

export default function PsychologistCard({ psychologist }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    name,
    avatar_url,
    experience,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psychologist;

  // const favorite = isFavorite(psychologist.license);
  const favorite = isFavorite(psychologist);

  return (
    <div className={s.card}>
      {/* Верхній правий кут */}
      <div className={s.topRight}>
        <span className={s.rating}>
          <svg width="16" height="16" aria-hidden="true">
            <use href="/icons.svg#icon-star" />
          </svg>{' '}
          Rating: {rating}
        </span>
        <span>
          Price / 1 hour: <span className={s.price}>{price_per_hour}$</span>
        </span>
        <button
          className={s.heartBtn}
          aria-label="Add to favorites"
          onClick={() => toggleFavorite(psychologist)}
        >
          <svg
            className={`${s.favoriteIcon} ${favorite ? s.active : ''}`}
            width="26"
            height="26"
            aria-hidden="true"
          >
            <use href="/icons.svg#icon-heart-normal" />
          </svg>
        </button>
      </div>

      {/* Аватар */}
      <div className={s.avatarContainer}>
        <img src={avatar_url} alt={name} className={s.avatar} loading="lazy" />
        <span className={s.statusDot} aria-label="online" />
      </div>

      {/* Інфо */}
      <div className={s.info}>
        <p className={s.greyTitle}>Psychologist</p>
        <h3 className={s.name}>{name}</h3>
        <ul className={s.infoDetails}>
          <li className={s.experience}>
            <span className={s.greyTitle}>Experience:</span> {experience}
          </li>
          <li className={s.license}>
            <span className={s.greyTitle}>License:</span> {license}
          </li>
          <li className={s.specialization}>
            <span className={s.greyTitle}>Specialization:</span>{' '}
            {specialization}
          </li>
          <li className={s.consultation}>
            <span className={s.greyTitle}>Initial_consultation:</span>{' '}
            {initial_consultation}
          </li>
        </ul>
        <p className={s.about}>{about}</p>

        <button className={s.readMoreButton}>Read more</button>
      </div>
    </div>
  );
}
