import React from 'react';
import styles from './HeaderUserMenuUI.module.css';
import NotificationBell from '@widgets/NotificationBell/NotificationBell';
import FavoriteButtonUI from '../FavoriteButtonUI/FavoriteButtonUI';
import ThemeToggle from '@widgets/ThemeToggle/ThemeToggle';

type HeaderUserMenuAction = 'user' | 'favorite' | 'notifications';
interface HeaderUserMenuUIProps {
  hasNewNotifications: boolean;
  userName: string;
  userAvatarUrl: string;
  onAction: (action: HeaderUserMenuAction) => void;
}

const HeaderUserMenuUI: React.FunctionComponent<HeaderUserMenuUIProps> = ({
  hasNewNotifications,
  userName,
  userAvatarUrl,
  onAction,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <ThemeToggle isLight /> 
        <NotificationBell
          hasNewNotifications={hasNewNotifications}
          onClick={() => onAction('notifications')}
        />
        <FavoriteButtonUI onClick={() => onAction('favorite')} />
      </div>

      <button
        className={styles.userContainer}
        type="button"
        onClick={() => onAction('user')}
      >
        <span className={styles.userName}>{userName}</span>
        <img src={userAvatarUrl} alt={userName} className={styles.userAvatar} />
      </button>
    </div>
  );
};

export default HeaderUserMenuUI;
