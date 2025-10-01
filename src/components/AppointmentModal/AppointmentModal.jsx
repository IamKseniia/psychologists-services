import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import s from './AppointmentModal.module.css';
import clsx from 'clsx';
import MeetingTimeDropdown from '../MeetingTimeDropdown/MeetingTimeDropdown';

// Схема валідації
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  message: yup.string().required('Message is required'),
});

export default function AppointmentModal({ psychologist, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Закриття по Esc
  useEffect(() => {
    const handleEsc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const onSubmit = data => {
    console.log('Appointment request:', {
      psychologist: psychologist.name,
      ...data,
    });
    reset();
    onClose();
  };

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="32" height="32">
            <path d="M7 7 L25 25 M25 7 L7 25" stroke="black" strokeWidth="2" />
          </svg>
        </button>
        <h2 className={s.title}>Make an appointment with a psychologists</h2>
        <p className={s.text}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        <div className={s.contPsychologist}>
          <img
            src={psychologist.avatar_url}
            alt={psychologist.name}
            className={s.avatar}
            loading="lazy"
          />
          <div className={s.contName}>
            <p className={s.psychologistTitle}>Your psychologists</p>
            <p className={s.psychologistName}>{psychologist.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <label>
            <input placeholder="Name" type="text" {...register('name')} />
            {errors.name && <p className={s.error}>{errors.name.message}</p>}
          </label>

          <div className={s.contPhoneTime}>
            <label>
              <input placeholder="+380" type="tel" {...register('phone')} />
              {errors.phone && (
                <p className={s.error}>{errors.phone.message}</p>
              )}
            </label>
            <MeetingTimeDropdown register={register} errors={errors} />
          </div>

          <label>
            <input placeholder="Email" type="email" {...register('email')} />
            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </label>

          <label>
            <textarea placeholder="Comment" {...register('message')} />
            {errors.message && (
              <p className={s.error}>{errors.message.message}</p>
            )}
          </label>

          <button type="submit" className={clsx('button', s.submitBtn)}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
