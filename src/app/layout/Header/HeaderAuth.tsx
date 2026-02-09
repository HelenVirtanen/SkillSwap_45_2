import React from 'react';
import styles from './HeaderAuth.module.css';
import Logo from '@features/Logo/Logo';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import CloseIcon from '@assets/icons/cross.svg?react';

const HeaderAuth: React.FC = () => {
  return (
    <header className={styles.header}>
  <div className={styles.content}>
    <Logo />

    <div className={styles.buttonWrapper}>
      <ButtonUI
        className={styles.button}
        variant="tertiary"
        title="Закрыть"
        iconRight={<CloseIcon />}
      />
    </div>

  </div>
</header>

  );
};

export default HeaderAuth;
