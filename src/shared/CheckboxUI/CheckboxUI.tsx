import type { FC } from 'react';
import styles from './CheckboxUI.module.css';

import CheckboxDefaultIcon from '../../assets/icons/checkbox-Default.svg?react';
import CheckboxDoneIcon from '../../assets/icons/checkbox-Done-Active.svg?react';
import CheckboxRemoveIcon from '../../assets/icons/checkbox-Remove-Active.svg?react';

export type CheckboxState = 'default' | 'done' | 'remove';

export interface CheckboxUIProps {
  label: string;
  state: CheckboxState;
  onChange: (state: CheckboxState) => void;
  disabled?: boolean;
  name?: string;
  className?: string;
}

const getAriaChecked = (state: CheckboxState): 'true' | 'false' | 'mixed' => {
  switch (state) {
    case 'done':
      return 'true';
    case 'remove':
      return 'mixed';
    default:
      return 'false';
  }
};

export const CheckboxUI: FC<CheckboxUIProps> = ({
  label,
  state,
  onChange,
  disabled = false,
  name,
  className,
}) => {
  return (
    <label
      className={[styles.root, styles[state], className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="checkbox"
        className={styles.input}
        name={name}
        disabled={disabled}
        checked={state !== 'default'}
        aria-checked={getAriaChecked(state)}
        onChange={() => onChange(state)}
      />

      <span className={styles.icon}>
        {state === 'default' && <img src={CheckboxDefaultIcon} alt="" />}
        {state === 'done' && <img src={CheckboxDoneIcon} alt="" />}
        {state === 'remove' && <img src={CheckboxRemoveIcon} alt="" />}
      </span>

      <span className={styles.label}>{label}</span>
    </label>
  );
};
