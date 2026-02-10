import type { FC } from 'react';
import styles from './CheckboxUI.module.css';

import CheckboxDefaultIcon from '@assets/icons/checkbox-Default.svg?react';
import CheckboxDoneIcon from '@assets/icons/checkbox-Done-Active.svg?react';
import CheckboxRemoveIcon from '@assets/icons/checkbox-Remove-Active.svg?react';

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
        {state === 'default' && <CheckboxDefaultIcon/>}
        {state === 'done' && <CheckboxDoneIcon />}
        {state === 'remove' && <CheckboxRemoveIcon/>}
      </span>

      <span className={styles.label}>{label}</span>
    </label>
  );
};

// чтобы проверить работу надо вставить и переменные подключить к main
// import { useState } from 'react';
// import { CheckboxUI } from '../../shared/ui/CheckboxUI/CheckboxUI';
// import type { CheckboxState } from '../../shared/ui/CheckboxUI/CheckboxUI';

// const MainPage: React.FC = () => {
//   const [categoryState, setCategoryState] =
//     useState<CheckboxState>('default');

//   const [subCategoryState, setSubCategoryState] =
//     useState<CheckboxState>('default');

//   const toggleCategory = (current: CheckboxState): CheckboxState => {
//     return current === 'default' ? 'remove' : 'default';
//   };

//   const toggleSubCategory = (current: CheckboxState): CheckboxState => {
//     return current === 'default' ? 'done' : 'default';
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Главная страница</h1>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//         <CheckboxUI
//           label="Категория"
//           state={categoryState}
//           onChange={(state) =>
//             setCategoryState(toggleCategory(state))
//           }
//         />

//         <CheckboxUI
//           label="Подкатегория"
//           state={subCategoryState}
//           onChange={(state) =>
//             setSubCategoryState(toggleSubCategory(state))
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default MainPage;
