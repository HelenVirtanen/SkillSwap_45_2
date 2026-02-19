import  { FC, useState } from 'react';
import styles from './CityGroupUI.module.css';
import { CheckboxUI, type CheckboxState } from '../CheckboxUI/CheckboxUI';

export interface CheckboxGroupItem {
  id: string;
  label: string;
}

interface CityGroupUIProps {
  title: string;
  maxItems?: number;
  items: CheckboxGroupItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
}

export const CityGroupUI: FC<CityGroupUIProps> = ({
  title,
  maxItems,
  items,
  selectedItems,
  onItemToggle,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const switchOpen = () => setIsOpened(!isOpened);

  const getState = (id: string): CheckboxState =>
    selectedItems.includes(id) ? 'done' : 'default';
  const slicedItems = isOpened
    ? items
    : items.slice(0, maxItems || items.length);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.list}>
        {slicedItems.map((item) => (
          <CheckboxUI
            key={item.id}
            label={item.label}
            state={getState(item.id)}
            onChange={() => onItemToggle(item.id)}
            name={`city-${item.id}`}
          />
        ))}
        {maxItems && (
          <button className={styles.dropdownButton} onClick={() => switchOpen()}>
            {isOpened ? 'Скрыть' : 'Все города'}
          </button>
        )}
      </div>
    </div>
  );
};
