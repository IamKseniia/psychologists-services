import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import AuthModal from '../AuthModal/AuthModal.jsx';
import s from './Header.module.css';
import clsx from 'clsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const { currentUser, logout } = useAuth();

  function isActiveClass({ isActive }) {
    return isActive ? s.isActive : '';
  }

  const openModal = type => {
    setAuthType(type);
    setIsAuthModalOpen(true);
  };

  const closeModal = () => setIsAuthModalOpen(false);

  return (
    <header className={s.headerContainer}>
      <div className="container">
        <div className={s.headerInner}>
          <svg width="218" height="28">
            <use xlinkHref="/icons.svg#icon-logo" />
          </svg>

          <nav className={s.nav}>
            <ul className={s.list}>
              <li className={s.item}>
                <NavLink className={isActiveClass} to="/">
                  Home
                </NavLink>
              </li>
              <li className={s.item}>
                <NavLink className={isActiveClass} to="/psychologists">
                  Psychologists
                </NavLink>
              </li>
              {currentUser && (
                <li className={s.item}>
                  <NavLink className={isActiveClass} to="/favorites">
                    Favorites
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          <div className={s.authButtons}>
            {!currentUser ? (
              <>
                <button
                  onClick={() => openModal('login')}
                  className={clsx('button', s.logButton)}
                >
                  Log In
                </button>
                <button
                  onClick={() => openModal('register')}
                  className={clsx('button', s.regButton)}
                >
                  Registration
                </button>
              </>
            ) : (
              <div className={s.userBox}>
                <div className={s.userName}>
                  <svg
                    className={s.userIcon}
                    width="40"
                    height="40"
                    aria-hidden="true"
                  >
                    <use href="/icons.svg#icon-image" />
                  </svg>
                  <span>{currentUser.displayName || currentUser.email}</span>
                </div>
                <button
                  className={clsx('button', s.logButton)}
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {isAuthModalOpen && <AuthModal type={authType} onClose={closeModal} />}
      </div>
    </header>
  );
}
