import React, { useRef, useState } from 'react';
import styles from './AvatarUI.module.css';
import AddIcon from '/src/assets/icons/add1.svg?react';
import UserIcon from '/src/assets/icons/user-circle.svg?react';

interface AvatarUIProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  className?: string;
}

const AvatarUI: React.FC<AvatarUIProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [imageError, setImageError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('📁 File selected:', file);
    
    if (file) {
      const url = URL.createObjectURL(file);
      console.log('🔗 Created URL:', url);
      setPreview(url);
      setImageError(false);
      onChange?.(url);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`${styles.main} ${className}`}>
      <button
        type="button"
        className={`${styles.imageButton} ${!preview ? styles.fallback : ''}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="Изменить аватар"
      >
        {preview && !imageError ? (
          <img
            src={preview}
            alt=""
            className={styles.image}
            onError={handleImageError}
          />
        ) : (
          <UserIcon className={styles.fallbackIcon} />
        )}

        <AddIcon className={styles.add} aria-hidden="true" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AvatarUI;