import { useState } from 'react';
import s from './PsychologistCard.module.css';
import clsx from 'clsx';
import { useFavorites } from '../../context/FavoritesContext';
import AppointmentModal from '../AppointmentModal/AppointmentModal.jsx';

export default function PsychologistCard({ psychologist }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

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
    reviews = [],
  } = psychologist;

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

        {/* Read more */}
        <button
          className={s.readMoreButton}
          onClick={() => setIsExpanded(prev => !prev)}
        >
          {isExpanded ? 'Hide details' : 'Read more'}
        </button>

        {isExpanded && (
          <div className={s.reviewsSection}>
            {reviews.length === 0 ? (
              <p>No reviews yet</p>
            ) : (
              reviews.map((rev, idx) => (
                <div key={idx} className={s.reviewItem}>
                  <div className={s.reviewHeader}>
                    <div className={s.reviewAvatar}>
                      {rev.reviewer[0].toUpperCase()}
                    </div>
                    <div className={s.contNameRating}>
                      <p className={s.reviewName}>{rev.reviewer}</p>
                      <div className={s.reviewRating}>
                        <svg width="16" height="16" aria-hidden="true">
                          <use href="/icons.svg#icon-star" />
                        </svg>{' '}
                        {rev.rating}
                      </div>
                    </div>
                  </div>
                  <p className={s.about}>{rev.comment}</p>
                </div>
              ))
            )}
            <button
              className={clsx('button', s.appointmentButton)}
              onClick={() => setIsAppointmentOpen(true)}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>

      {/* Модальне вікно запису */}
      {isAppointmentOpen && (
        <AppointmentModal
          psychologist={psychologist}
          onClose={() => setIsAppointmentOpen(false)}
        />
      )}
    </div>
  );
}
