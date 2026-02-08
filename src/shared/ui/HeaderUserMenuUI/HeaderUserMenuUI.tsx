import React, { type MouseEventHandler } from 'react';
import styles from './HeaderUserMenuUI.module.css';
import NotificationBell from '../../../widgets/NotificationBell/NotificationBell';
import FavoriteButtonUI from '../FavoriteButtonUI/FavoriteButtonUI';
import ThemeToggle from '../../../widgets/ThemeToggle/ThemeToggle';

interface HeaderUserMenuUIProps {
  hasNewNotifications: boolean;
  userName: string;
  userAvatarUrl: string;
  onNotificationBellClick: MouseEventHandler<HTMLButtonElement>;
  onFavoriteButtonClick: MouseEventHandler<HTMLButtonElement>;
  onUserClick: MouseEventHandler<HTMLButtonElement>;
}

const HeaderUserMenuUI: React.FunctionComponent<HeaderUserMenuUIProps> = ({
  hasNewNotifications,
  userName,
  userAvatarUrl,
  onNotificationBellClick,
  onFavoriteButtonClick,
  onUserClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconsContainer}>
        <ThemeToggle isLight /> 
        <NotificationBell
          hasNewNotifications={hasNewNotifications}
          onClick={onNotificationBellClick}
        />
        <FavoriteButtonUI onClick={onFavoriteButtonClick} />
      </div>

      <button
        className={styles.userContainer}
        type="button"
        onClick={onUserClick}
      >
        <span className={styles.userName}>{userName}</span>
        <img src={userAvatarUrl} alt={userName} className={styles.userAvatar} />
      </button>
    </div>
  );
};

export default HeaderUserMenuUI;
