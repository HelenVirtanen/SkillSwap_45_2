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
}

const NotificationItemUI: React.FC<NotificationItemUIProps> = ({
  mainText,
  subText,
  date,
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
    <div className={styles.notificationItem}>
      <Idea className={styles.icon} />
      <div className={styles.content}>        
        <div className={styles.mainText}>{mainText || 'Николай принял ваш обмен'}</div>
        <div className={styles.subText}>{subText || 'Перейдите в профиль, чтобы обсудить детали'}</div>
      </div>
      <div className={styles.date}>{date || 'сегодня'}</div>      
      {disabled !== false && (
        <ButtonUI variant="submit" title="Перейти" onClick={onClick} className={styles.button} />
      )}
    </div>
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