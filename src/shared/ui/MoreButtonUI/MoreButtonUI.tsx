import React from 'react';
import styles from './MoreButtonUI.module.css';
import MoreIcon from '../../../assets/icons/more-square.svg?react';

const MoreButtonUI: React.FunctionComponent = () => {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Ещё"
    >
      <MoreIcon className={styles.icon} />
    </button>
  );
};

export default MoreButtonUI;
