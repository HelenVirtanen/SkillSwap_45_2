import type { FC } from 'react';
import RadioGroupUI from '@shared/ui/RadioGroupUI/RadioGroupUI';
import styles from './FiltersSidebar.module.css';

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.heading}>Фильтры</h2>
      <div className={styles.filterSections}>
        <RadioGroupUI
          name="role"
          value='all'
          onChange={() => {}}
          options={[
            { value: 'all', label: 'Всё' },
            { value: 'Хочу научиться', label: 'Хочу научиться' },
            { value: 'Могу научить', label: 'Могу научить' },
          ]}
        />

        <RadioGroupUI
          label="Пол автора"
          name="gender"
          value='any'
          onChange={() => {}}
          options={[
            { value: 'any', label: 'Не имеет значения' },
            { value: 'Мужской', label: 'Мужской' },
            { value: 'Женский', label: 'Женский' },
          ]}
        />
      </div>
    </aside>
  );
};
export default FilterSidebar;
