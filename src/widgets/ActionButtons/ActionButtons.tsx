import React from 'react';
import styles from './ActionButtons.module.css';
import FavoriteButtonUI from '../../shared/ui/FavoriteButtonUI/FavoriteButtonUI';
import SharedButtonUI from '../../shared/ui/SharedButtonUI/SharedButtonUI';
import MoreButtonUI from '../../shared/ui/MoreButtonUI/MoreButtonUI';


const ActionButtons: React.FunctionComponent = () => {
  return (
    <div className={styles.wrapper}>
      <FavoriteButtonUI isActive={false} onClick={() => {}} />
      <SharedButtonUI />
      <MoreButtonUI />
    </div>
  );
};

export default ActionButtons;
