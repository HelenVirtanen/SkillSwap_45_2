import React from 'react';
import styles from './MoreButtonUI.module.css';
import MoreIcon from '@assets/icons/more-square.svg?react';

interface MoreButtonUIProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const MoreButtonUI: React.FC<MoreButtonUIProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Ещё"
      onClick={onClick}
    >
      <MoreIcon className={styles.icon} />
    </button>
  );
};

export default MoreButtonUI;
