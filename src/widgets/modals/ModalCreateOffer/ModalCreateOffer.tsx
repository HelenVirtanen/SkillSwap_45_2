import type { FC } from 'react';
import styles from './ModalCreateOffer.module.css';

import CreateOfferIcon from '@assets/icons/user-icon.svg?react';
import NotificationIcon from '@assets/icons/notification-icon.svg?react';
import DoneIcon from '@assets/icons/Done-icon.svg?react';

import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';

export type ModalVariant = 'created' | 'sent' | 'accepted';

export interface ModalCreateOfferProps {
  variant: ModalVariant;
  onSubmit: () => void;
}

export const ModalCreateOffer: FC<ModalCreateOfferProps> = ({
  variant,
  onSubmit,
}) => {
  // Определяем иконку, заголовок, описание и высоту в зависимости от варианта
  const config = {
    created: {
      Icon: CreateOfferIcon,
      title: 'Ваше предложение создано',
      description: 'Теперь вы можете предложить обмен',
      heightClass: styles.created,
    },
    sent: {
      Icon: NotificationIcon,
      title: 'Вы предложили обмен',
      description: 'Теперь дождитесь подтверждения. Вам придёт уведомление',
      heightClass: styles.sent,
    },
    accepted: {
      Icon: DoneIcon,
      title: 'Ваше предложение создано',
      description: 'Теперь вы можете предложить обмен',
      heightClass: styles.created,
    },
  };

  const { Icon, title, description, heightClass } = config[variant];

  return (
    <div className={`${styles.modal} ${heightClass}`}>
      <Icon className={styles.icon} />

      <div className={styles.content}>
        <div className={styles.content_text}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <ButtonUI
          variant="primary"
          title="Готово"
          onClick={onSubmit}
          className={styles.button}
        />
      </div>
    </div>
  );
};
