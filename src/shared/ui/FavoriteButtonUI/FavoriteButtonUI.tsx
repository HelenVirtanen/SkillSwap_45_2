import React, { type MouseEventHandler } from 'react';
import styles from './FavoriteButtonUI.module.css';
import LikeIcon from '../../../assets/icons/like.svg?react';
import LikeSelectedIcon from '../../../assets/icons/like-selected.svg?react';

interface FavoriteButtonUIProps {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FavoriteButtonUI: React.FunctionComponent<FavoriteButtonUIProps> = ({
  isActive,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={isActive ? 'Удалить из избранного' : 'В избранное'}
    >
      isActive
        ? (<LikeSelectedIcon className={styles.icon} />)
        : (<LikeIcon className={styles.icon} />)
    </button>
  );
};
