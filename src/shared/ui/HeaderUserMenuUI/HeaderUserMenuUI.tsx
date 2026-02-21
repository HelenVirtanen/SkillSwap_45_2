import React, { useState } from 'react';
import styles from './HeaderUserMenuUI.module.css';
import NotificationBell from '@widgets/NotificationBell/NotificationBell';
import FavoriteButtonUI from '../FavoriteButtonUI/FavoriteButtonUI';
import ThemeToggle from '@widgets/ThemeToggle/ThemeToggle';
import { useTheme } from '@shared/lib/theme/useTheme';
import { UserMenuUI } from '@shared/ui/UserMenuUI/UserMenuUI';

type HeaderUserMenuAction =
  | 'user'
  | 'favorite'
  | 'notifications'
  | 'logout';

interface HeaderUserMenuUIProps {
  hasNewNotifications: boolean;
  userName: string;
  userAvatarUrl: string;
  onAction: (action: HeaderUserMenuAction) => void;
}

const HeaderUserMenuUI: React.FC<HeaderUserMenuUIProps> = ({
  hasNewNotifications,
  userName,
  userAvatarUrl,
  onAction,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleUserClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <ThemeToggle
          isLight={theme === 'light'}
          onToggle={toggleTheme}
        />

        <NotificationBell
          hasNewNotifications={hasNewNotifications}
          onClick={() => onAction('notifications')}
        />

        <FavoriteButtonUI
          onClick={() => onAction('favorite')}
        />
      </div>

      <button
        className={styles.userContainer}
        type="button"
        onClick={handleUserClick}
      >
        <span className={styles.userName}>{userName}</span>
        <img
          src={userAvatarUrl}
          alt={userName}
          className={styles.userAvatar}
        />
      </button>

      {isMenuOpen && (
        <UserMenuUI
          onProfileClick={() => {
            setIsMenuOpen(false);
            onAction('user');
          }}
          onLogoutClick={() => {
            setIsMenuOpen(false);
            onAction('logout');
          }}
        />
      )}
    </div>
  );
};

export default HeaderUserMenuUI;