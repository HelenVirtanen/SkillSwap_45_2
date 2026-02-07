import React, { type MouseEventHandler } from 'react';
import styles from './NotificationBell.module.css';
import NotificationIcon from '../../assets/icons/notification.svg?react';
import NotificationNewIcon from '../../assets/icons/notification-new.svg?react';

interface NotificationBellProps {
hasNewNotifications: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const NotificationBell: React.FunctionComponent<NotificationBellProps> = ({
  hasNewNotifications,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={'Уведомления'}
    >
      {hasNewNotifications ? (
        <NotificationNewIcon className={styles.icon} />
      ) : (
        <NotificationIcon className={styles.icon} />
      )}
    </button>
  );
};

export default NotificationBell;
