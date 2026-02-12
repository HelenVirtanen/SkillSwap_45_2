import styles from './NotificationsPanel.module.css';
import NotificationItemUI from '@shared/ui/NotificationItemUI/NotificationItemUI';

const NotificationsPanel = () => {
  const notificationsNew = [
    {
      id: 1,
      mainText: 'Николай принял ваш обмен',
      subText: 'Перейдите в профиль, чтобы обсудить детали',
      date: 'сегодня',
    },
    {
      id: 2,
      mainText: 'Татьяна предлагает вам обмен',
      subText: 'Примите обмен, чтобы обсудить детали',
      date: 'сегодня',
    },
  ];

  const notificationsOld = [
    {
      id: 3,
      mainText: 'Олег предлагает вам обмен',
      subText: 'Примите обмен, чтобы обсудить детали',
      date: 'вчера',
      disabled: false,
    },
    {
      id: 4,
      mainText: 'Игорь принял ваш обмен',
      subText: 'Перейдите в профиль, чтобы обсудить детали',
      date: '23 мая',
      disabled: false,
    },
  ];

  return (
    <div className={styles.notificationsPanel}>
      <div className={styles.notificationsWrapperNew}>
        <div className={styles.headerNew}>
          <span className={styles.title}>Новые уведомления</span>
          <button type="button" className={styles.readAllBtn}>
            Прочитать все
          </button>
        </div>

        {notificationsNew.map((notification) => (
          <NotificationItemUI key={notification.id} {...notification} />
        ))}
      </div>

      <div className={styles.notificationsWrapperOld}>
        <div className={styles.headerOld}>
          <span className={styles.title}>Просмотренные</span>
          <button type="button" className={styles.clearBtn}>
            Очистить
          </button>
        </div>
        {notificationsOld.map((notification) => (
          <NotificationItemUI key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
