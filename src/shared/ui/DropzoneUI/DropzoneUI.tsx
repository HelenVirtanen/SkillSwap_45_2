import React from 'react';
import styles from './DropzoneUI.module.css';
import UploadIcon from '@assets/icons/gallery-add.svg?react';

export const DropzoneUI: React.FC = () => {
  return (
    <div className={styles.dropzone}>
      <p className={styles.text}>
        Перетащите или выберите изображения навыка
      </p>

      <button type="button" className={styles.button}>
        <UploadIcon className={styles.icon} />
        <span>Выбрать изображения</span>
      </button>
    </div>
  );
};
