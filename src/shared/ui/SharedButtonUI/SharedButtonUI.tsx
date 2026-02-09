import React from 'react';
import styles from './SharedButtonUI.module.css';
import ShareIcon from '@assets/icons/share.svg?react';

interface SharedButtonUIProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SharedButtonUI: React.FC<SharedButtonUIProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Поделиться"
      onClick={onClick}
    >
      <ShareIcon className={styles.icon} />
    </button>
  );
};

export default SharedButtonUI;
