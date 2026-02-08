import React from 'react';
import styles from './SharedButtonUI.module.css';
import ShareIcon from '../../../assets/icons/share.svg?react';

const SharedButtonUI: React.FunctionComponent = () => {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Поделиться"
    >
      <ShareIcon className={styles.icon} />
    </button>
  );
};

export default SharedButtonUI;

