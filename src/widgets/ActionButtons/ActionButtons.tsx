import React from 'react';
import styles from './ActionButtons.module.css';

import FavoriteButtonUI from '@shared/ui/FavoriteButtonUI/FavoriteButtonUI';
import SharedButtonUI from '@shared/ui/SharedButtonUI/SharedButtonUI';
import MoreButtonUI from '@shared/ui/MoreButtonUI/MoreButtonUI';

export type ButtonActionType = 'favorite' | 'share' | 'more';

interface ActionButtonsProps {
  isFavorite?: boolean;
  onAction: (action: ButtonActionType) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isFavorite,
  onAction,
}) => {
  return (
    <div className={styles.wrapper}>
      <FavoriteButtonUI
        isActive={isFavorite}
        onClick={() => onAction('favorite')}
      />

      <SharedButtonUI onClick={() => onAction('share')} />

      <MoreButtonUI onClick={() => onAction('more')} />
    </div>
  );
};

export default ActionButtons;
