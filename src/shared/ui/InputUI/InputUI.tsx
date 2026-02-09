import React, { useState, useRef } from 'react';
import styles from './InputUI.module.css';
import Eye from '../../../assets/icons/eye.svg?react';

interface InputUIProps {}

const InputUI: React.FC<InputUIProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordFieldRef = useRef<HTMLInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
    if (passwordFieldRef.current) {
      passwordFieldRef.current.type = showPassword ? 'password' : 'text';
    }
  };

  return (
    <div className={styles['form']}>
      <div className={`${styles['input-container']} input-container`}>
        <label className={`${styles['label']} label`}>Email</label>
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles['input-field']} input-field`}
        />
      </div>
      <div className={`${styles['input-container']} input-container`}>
        <label className={`${styles['label']} label`}>Пароль</label>
        <div className={styles['password-input-wrapper']}>
          <input
            ref={passwordFieldRef}
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles['input-field']} input-field`}
          />
          <button
            className={styles['eye-button']}
            onClick={togglePasswordVisibility}
            aria-label="Показать/скрыть пароль"
          >
            <Eye className={styles.eye}/>            
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputUI;