import React from 'react';
import styles from './ActionButtons.module.css';

import FavoriteButtonUI from '@shared/ui/FavoriteButtonUI/FavoriteButtonUI';
import SharedButtonUI from '@shared/ui/SharedButtonUI/SharedButtonUI';
import MoreButtonUI from '@shared/ui/MoreButtonUI/MoreButtonUI';

interface ActionButtonsProps {
  isFavorite?: boolean;
  onFavoriteClick: React.MouseEventHandler<HTMLButtonElement>;
  onShareClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMoreClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isFavorite,
  onFavoriteClick,
  onShareClick,
  onMoreClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <FavoriteButtonUI
        isActive={isFavorite}
        onClick={onFavoriteClick}
      />

      <SharedButtonUI onClick={onShareClick} />

      <MoreButtonUI onClick={onMoreClick} />
    </div>
  );
};

export default ActionButtons;
