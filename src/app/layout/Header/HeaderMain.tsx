import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import styles from './HeaderMain.module.css';
import Logo from '@features/Logo/Logo';
import Link from '@features/navigation/Link/Link';
import ThemeToggle from '@widgets/ThemeToggle/ThemeToggle';
import SearchInputUI from '@shared/ui/SearchInputUI/SearchInputUI';
import SkillsDropdown from '@widgets/SkillDropDown/SkillDropdown';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import HeaderUserMenuUI from '@shared/ui/HeaderUserMenuUI/HeaderUserMenuUI';
import { useAppSelector } from '@app/store/store';
import { selectAuthUser } from '@app/store/slices/authUser/auth';
import { useTheme } from '@shared/lib/theme/useTheme';

export type HeaderVariant = 'guest' | 'auth';
export type UserMenuAction = 'user' | 'favorite' | 'notifications';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  onClose?: () => void;
  variant?: HeaderVariant;
  className?: string;
  searchValue?: string;
}

const HeaderMain: React.FC<HeaderProps> = ({
  onSearchChange,
  onClose,
  variant = 'guest',
  className = '',
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const user = useAppSelector(selectAuthUser);
const isAuthenticated = Boolean(user);

  const handleSearchChange = (value: string) => {
    onSearchChange?.(value);
  };

  const handleSearchClear = () => {
    onSearchChange?.('');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register/step1');
  };

  const handleUserMenuAction = (action: UserMenuAction) => {
    console.log('User menu action:', action);
    switch (action) {
      case 'user':
        navigate('/profile');
        break;
      case 'favorite':
        navigate('/favorites');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  const handleBackHomeClick = () => {
    navigate('/');
  };

  // Вариант для страниц авторизации
  if (variant === 'auth') {
    if (!onClose) {
      console.warn('HeaderMain: onClose is required when variant="auth"');
    }

    return (
      <div className={`${styles.wrapper} ${className}`}>
        <header
          className={`${styles.header} ${styles.authHeader}`}
          role="banner"
          aria-label="Заголовок страницы авторизации"
        >
          <div className={styles.left}>
            <Logo />
          </div>

          <div className={styles.right}>
            <ButtonUI
              variant="tertiary"
              title="Закрыть"
              onClick={handleBackHomeClick}
              aria-label="Закрыть страницу авторизации"
              iconRight={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path 
                    d="M18 6L6 18M6 6L18 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              }
              className={styles.closeButton}
            />
          </div>
        </header>
      </div>
    );
  }

  // Основной вариант (для гостей)
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <header 
        className={styles.header}
        role="banner"
        aria-label="Основной заголовок приложения"
      >
        {/* Левая часть: логотип и навигация */}
        <div className={styles.left}>
          <div onClick={handleBackHomeClick} className={styles.logoContainer}>
            <Logo />
          </div>
          <nav className={styles.nav} aria-label="Основная навигация">
            <Link to="/about" title="О проекте" />
            <SkillsDropdown />
          </nav>
        </div>

        {/* Центральная часть: поиск */}
        <div className={styles.center}>
          <SearchInputUI
            placeholder="Искать навык"
            onChange={handleSearchChange}
            onClear={handleSearchClear}
            aria-label="Поиск навыков"
          />
        </div>

        {/* Правая часть */}
        <div className={styles.right}>
          {isAuthenticated && user? (
            // Авторизованный пользователь - полное меню с колокольчиком внутри
            <HeaderUserMenuUI
              hasNewNotifications={true}
              userName={user.name}
              userAvatarUrl="https://via.placeholder.com/40"
              onAction={handleUserMenuAction}
            />
          ) : (
            // Гость - разделенная правая часть
            <div className={styles.rightContent}>
              {/* Кнопка темы рядом с поиском */}
              <div className={styles.themeSection}>
                <ThemeToggle 
                  isLight={theme === 'light'}
                  onToggle={toggleTheme}
                />
              </div>
              
              {/* Кнопки авторизации с отдельным отступом */}
              <div className={styles.authButtons}>
                <ButtonUI
                  variant="secondary"
                  onClick={handleLogin}
                  title="Войти"
                  aria-label="Войти в аккаунт"
                />
                <ButtonUI
                  variant="primary"
                  onClick={handleRegister}
                  title="Зарегистрироваться"
                  aria-label="Зарегистрировать новый аккаунт"
                />
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default HeaderMain;