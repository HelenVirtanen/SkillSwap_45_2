import React from 'react';
import styles from './NotificationItemUI.module.css';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import Idea from '@assets/icons/idea.svg?react';

interface NotificationItemUIProps {
  mainText?: string;
  subText?: string;
  date?: string; 
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const NotificationItemUI: React.FC<NotificationItemUIProps> = ({
  mainText = 'Николай принял ваш обмен',
  subText = 'Перейдите в профиль, чтобы обсудить детали',
  date = 'сегодня',
  onClick,
  disabled = true,
}) => {
  return (
    <article className={styles.notificationItem}>
      <Idea className={styles.icon} aria-hidden="true"/>
      <div className={styles.content}>        
        <div className={styles.mainText}>{mainText}</div>
        <div className={styles.subText}>{subText}</div>
      </div>
      <time className={styles.date}>{date}</time>
      {disabled !== false && (
        <ButtonUI variant="submit" title="Перейти" onClick={onClick} className={styles.button} />
      )}
    </article>
  );
};

export default NotificationItemUI;