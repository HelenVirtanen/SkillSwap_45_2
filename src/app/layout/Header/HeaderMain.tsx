import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import styles from './HeaderMain.module.css';
import Logo from '../../../features/Logo/Logo';
import Link from '../../../features/navigation/Link/Link';
import SearchInputUI from '../../../shared/ui/SearchInputUI/SearchInputUI';
import SkillsDropdown from '../../../widgets/SkillDropDown/SkillDropdown';
import ButtonUI from '../../../shared/ui/ButtonUI/ButtonUI';
import HeaderUserMenuUI from '../../../shared/ui/HeaderUserMenuUI/HeaderUserMenuUI';

const useAuth = () => {
  // Это временная заглушка
  return { isAuthenticated: false, userData: null };
};

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
  const { isAuthenticated } = useAuth();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange?.(value);
  };

  const handleSearchClear = () => {
    onSearchChange?.('');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
              onClick={onClose}
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
          <div onClick={handleLogoClick} className={styles.logoContainer}>
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

        {/* Правая часть: авторизация */}
        <div className={styles.right}>
          {isAuthenticated ? (
            // Авторизованный пользователь - полное меню с колокольчиком внутри
            <HeaderUserMenuUI
              hasNewNotifications={true}
              userName="Иван Иванов"
              userAvatarUrl="https://via.placeholder.com/40"
              onAction={handleUserMenuAction}
            />
          ) : (
            // Гость - только кнопки входа и регистрации
            <div className={styles.buttons}>
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
          )}
        </div>
      </header>
    </div>
  );
};

export default HeaderMain;