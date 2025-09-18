import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { login, register as registerUser } from '../../services/authService';
import s from './AuthModal.module.css';

export default function AuthModal({ type, onClose }) {
  // Закриття по Esc
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const stopPropagation = e => e.stopPropagation();

  // Схеми валідації
  const schema = yup.object().shape({
    name:
      type === 'register'
        ? yup.string().required('Name is required')
        : yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Min 6 characters')
      .required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Сабміт
  const onSubmit = async data => {
    try {
      if (type === 'login') {
        await login(data.email, data.password);
      } else {
        await registerUser(data.email, data.password, data.name);
      }
      onClose(); // закриваємо модалку після успіху
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.modal} onClick={stopPropagation}>
        <button type="button" className={s.closeBtn} onClick={onClose}>
          <svg width="32" height="32">
            <path d="M7 7 L25 25 M25 7 L7 25" stroke="black" strokeWidth="2" />
          </svg>
        </button>

        <h2 className={s.title}>
          {type === 'login' ? 'Log In' : 'Registration'}
        </h2>
        <p className={s.text}>
          {type === 'login'
            ? 'Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.'
            : 'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'}
        </p>

        {/* Форма */}
        <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
          {type === 'register' && (
            <>
              <input
                className={s.modalInput}
                type="text"
                placeholder="Name"
                {...register('name')}
              />
              {errors.name && <p className={s.error}>{errors.name.message}</p>}
            </>
          )}

          <input
            className={s.modalInput}
            type="email"
            placeholder="Email"
            autoComplete="off"
            {...register('email')}
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}

          <input
            className={s.modalInput}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register('password')}
          />
          {errors.password && (
            <p className={s.error}>{errors.password.message}</p>
          )}

          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Processing...'
              : type === 'login'
              ? 'Log In'
              : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
