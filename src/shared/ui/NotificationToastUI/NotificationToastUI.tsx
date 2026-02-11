import React, { useState } from 'react';
import styles from './NotificationToastUI.module.css';
import Idea from '@assets/icons/idea.svg?react';
import Cross from '@assets/icons/cross.svg?react';


interface NotificationToastUIProps {
    onClose: () => void;
}

const NotificationToastUI: React.FC<NotificationToastUIProps> = ({ onClose }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={styles.notificationToast}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Idea className={styles.icon} />
        <span className={styles.text}>{/* Тут нужно будет добавить переменную пользователя */}Олег предлагает вам обмен</span>
        <button className={styles.closeButton} onClick={onClose}>
          <Cross/>
        </button>
        {isHovered && (
          <button className={styles.goButton}>Перейти</button>
        )}
      </div>
    );
};

export default NotificationToastUI;