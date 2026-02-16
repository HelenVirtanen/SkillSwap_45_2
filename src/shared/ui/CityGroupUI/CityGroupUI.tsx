import type { FC } from 'react';
import styles from './CityGroupUI.module.css';
import { CheckboxUI, type CheckboxState } from '../CheckboxUI/CheckboxUI';

export interface CheckboxGroupItem {
  id: string;
  label: string;
}

interface CityGroupUIProps {
  title: string;
  items: CheckboxGroupItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
}

export const CityGroupUI: FC<CityGroupUIProps> = ({
  title,
  items,
  selectedItems,
  onItemToggle,
}) => {
  const getState = (id: string): CheckboxState =>
    selectedItems.includes(id) ? 'done' : 'default';

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.list}>
        {items.map((item) => (
          <CheckboxUI
            key={item.id}
            label={item.label}
            state={getState(item.id)}
            onChange={() => onItemToggle(item.id)}
            name={`city-${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};
