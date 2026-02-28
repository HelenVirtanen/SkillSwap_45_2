import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderAuth.module.css';
import Logo from '@features/Logo/Logo';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import CloseIcon from '@assets/icons/cross.svg?react';

interface HeaderAuthProps {
  onClose?: () => void;
  className?: string;
}

const HeaderAuth: React.FC<HeaderAuthProps> = () => {
  const navigate = useNavigate();

  const handleBackHomeClick = () => {
    navigate('/');
  };

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
        onClick={handleBackHomeClick}
      />
    </div>

  </div>
</header>

  );
};

export default HeaderAuth;
