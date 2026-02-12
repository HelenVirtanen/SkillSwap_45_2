import React from 'react';
import styles from './UserMenuUI.module.css';
import LogoutIcon from '@assets/icons/logout.svg?react';

interface UserMenuUIProps {
  onProfileClick?: () => void;
  onLogoutClick?: () => void;
}

export const UserMenuUI: React.FC<UserMenuUIProps> = ({
  onProfileClick,
  onLogoutClick,
}) => {
  return (
    <div className={styles.menu}>
      <button
        type="button"
        className={styles.item}
        onClick={onProfileClick}
      >
        Личный кабинет
      </button>

      <button
        type="button"
        className={styles.item}
        onClick={onLogoutClick}
      >
        <span>Выйти из аккаунта</span>
        <LogoutIcon className={styles.icon} />
      </button>
    </div>
  );
};
