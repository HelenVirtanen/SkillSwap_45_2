import { type FC } from 'react';
import styles from './UserInfoUI.module.css';
import { calculateAge, getAgeWithLabel} from '../../utils/calculateAge';

// Типизация пропсов
interface UserInfoProps {
  avatar: string; // URL аватара
  name: string; // Имя пользователя
  birthDate: string; // Дата рождения в формате "ГГГГ-ММ-ДД"
  city: string; // Город
  isFavorite?: boolean; // Для будущей интеграции с сердечком
}

const UserInfoUI: FC<UserInfoProps> = ({
  avatar,
  name,
  birthDate,
  city,
  isFavorite = false,
}) => {
  // Рассчитываем возраст
  const age = calculateAge(birthDate); 
  const ageLabel = getAgeWithLabel(age);

  return (
    <div className={styles.userInfo}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <img
            src={avatar}
            alt={name}
            className={styles.avatar}
          />
        </div>

        <div className={styles.info}>
          <h4 className={styles.name}>{name}</h4>
          <div className={styles.details}>
            <div className={styles.city}>
              <span>{city},</span>
            </div>
            <span className={styles.age}>{ageLabel}</span>
          </div>
        </div>

        {/* место для компонента FavoriteButton*/}
        {/* <div className={styles.favoriteButton}>
          <FavoriteButton isFavorite={isFavorite} />
        </div> */}
      </div>
    </div>
  );
};

export default UserInfoUI;