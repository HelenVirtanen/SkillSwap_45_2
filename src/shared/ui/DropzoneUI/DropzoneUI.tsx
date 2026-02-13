import React from 'react';
import styles from './DropzoneUI.module.css';
import UploadIcon from '@assets/icons/gallery-add.svg?react';

type DropzoneUIProps = {
  onClick?: () => void;
};

export const DropzoneUI: React.FC<DropzoneUIProps> = ({ onClick }) => {
  return (
    <div className={styles.dropzone}>
      <p className={styles.text}>
        Перетащите или выберите изображения навыка
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={onClick}
      >
        <UploadIcon className={styles.icon} />
        <span>Выбрать изображения</span>
      </button>
    </div>
  );
};
