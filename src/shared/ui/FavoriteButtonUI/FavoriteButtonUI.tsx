import React, { type MouseEventHandler } from 'react';
import styles from './FavoriteButtonUI.module.css';
import LikeIcon from '@assets/icons/like.svg?react';
import LikeSelectedIcon from '@assets/icons/like-selected.svg?react';

interface FavoriteButtonUIProps {
  isActive?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const FavoriteButtonUI: React.FunctionComponent<FavoriteButtonUIProps> = ({
  isActive = false,
  onClick,
  className
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
      aria-label={isActive ? 'Удалить из избранного' : 'В избранное'}
    >
      {isActive ? (
        <LikeSelectedIcon className={styles.icon} />
      ) : (
        <LikeIcon className={styles.icon} />
      )}
    </button>
  );
};

export default FavoriteButtonUI;
