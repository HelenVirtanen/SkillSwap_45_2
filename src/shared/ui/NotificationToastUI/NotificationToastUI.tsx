import React, { ReactNode, useState } from 'react';
import styles from './NotificationToastUI.module.css';
import IconIdea from '@assets/icons/idea.svg?react';
import Cross from '@assets/icons/cross.svg?react';

interface NotificationToastUIProps {
  onClose: () => void;
  onAction?: () => void;
  children: ReactNode;
}

const NotificationToastUI: React.FC<NotificationToastUIProps> = ({
  onClose,
  onAction,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.notificationToast}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconIdea className={styles.icon} />
      <span className={styles.text}>{children}</span>
      <button className={styles.closeButton} onClick={onClose}>
        <Cross />
      </button>
      {isHovered && (
        <button className={styles.goButton} onClick={onAction} aria-label="Закрыть уведомление">
          Перейти
        </button>
      )}
    </div>
  );
};

export default NotificationToastUI;
