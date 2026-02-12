import React from 'react';
import styles from './NotificationItemUI.module.css';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import Idea from '@assets/icons/idea.svg?react';

interface NotificationItemUIProps {
  mainText?: string; // заголовочный текст уведомления
  subText?: string; // дополнительный поясняющий текст
  date?: string;     // дата события
  onClick: () => void; // обработчик клика кнопки
}

const NotificationItemUI: React.FC<NotificationItemUIProps> = ({
  mainText,
  subText,
  date,
  onClick
}) => {
  return (
    <div className={styles.notificationItem}>
      <Idea className={styles.icon} />
      <div className={styles.content}>        
        <div className={styles.mainText}>{mainText || 'Николай принял ваш обмен'}</div>
        <div className={styles.subText}>{subText || 'Перейдите в профиль, чтобы обсудить детали'}</div>
      </div>
      <div className={styles.date}>{date || 'сегодня'}</div>
      <ButtonUI variant="submit" title="Перейти" onClick={onClick} className={styles.button} />
    </div>
  );
};

export default NotificationItemUI;