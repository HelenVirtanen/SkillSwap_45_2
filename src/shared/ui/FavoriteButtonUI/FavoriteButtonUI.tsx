import React, { type MouseEventHandler } from 'react';
import styles from './FavoriteButtonUI.module.css';
import likeIcon from '../../../assets/icons/like.svg';
import likeSelectedIcon from '../../../assets/icons/like-selected.svg';

interface FavoriteButtonUIProps {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const FavoriteButtonUI: React.FunctionComponent<FavoriteButtonUIProps> = ({
  isActive,
  onClick,
}) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <img
        src={isActive ? likeSelectedIcon : likeIcon}
        alt="Избранное"
        className={styles.icon}
      />
    </button>
  );
};
