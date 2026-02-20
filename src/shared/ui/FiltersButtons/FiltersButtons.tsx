import { FC } from 'react';
import styles from './FiltersButtons.module.css';
import {
  Filters,
} from '@shared/ui/FiltersSidebar/FiltersSidebar.tsx';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI.tsx';
import CrossIcon from '@assets/icons/cross.svg?react';

interface FiltersButtons {
  filters: Filters;
  defaultFilters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const options = {
  teachStatus: [
    { value: 'all', label: 'Всё' },
    { value: 'needLearn', label: 'Хочу научиться' },
    { value: 'canTeach', label: 'Могу научить' },
  ],
  gender: [
    { value: 'any', label: 'Не имеет значения' },
    { value: 'мужской', label: 'Мужской' },
    { value: 'женский', label: 'Женский' },
  ],
};

const FiltersButtons: FC<FiltersButtons> = ({
  filters,
  defaultFilters,
  onFiltersChange,
}) => {
  return (
    <div className={`${styles.buttonsContainer}`}>
      {filters.teachStatus !== defaultFilters.teachStatus && (
        <ButtonUI
          title={
            options.teachStatus.find((obj) => obj.value === filters.teachStatus)
              ?.label ?? filters.teachStatus
          }
          variant={'tertiary'}
          iconRight={<CrossIcon />}
          className={`${styles.crossButton}`}
          onClick={() => {
            onFiltersChange({
              ...filters,
              teachStatus: defaultFilters.teachStatus,
            });
          }}
        />
      )}
      {filters.gender !== defaultFilters.gender && (
        <ButtonUI
          title={
            options.gender.find((obj) => obj.value === filters.gender)?.label ??
            filters.gender
          }
          variant={'tertiary'}
          iconRight={<CrossIcon />}
          className={`${styles.crossButton}`}
          onClick={() => {
            onFiltersChange({
              ...filters,
              gender: defaultFilters.gender,
            });
          }}
        />
      )}
      {filters.skillSubcategories.map((skill) => (
        <ButtonUI
          key={skill.id}
          title={skill.title}
          variant={'tertiary'}
          iconRight={<CrossIcon />}
          className={styles.crossButton}
          onClick={() => {
            onFiltersChange({
              ...filters,
              skillSubcategories: filters.skillSubcategories.filter(
                (s) => s.id !== skill.id,
              ),
            });
          }}
        />
      ))}
      {filters.cities.map((city) => (
        <ButtonUI
          key={city.id}
          title={city.name}
          variant={'tertiary'}
          iconRight={<CrossIcon />}
          className={styles.crossButton}
          onClick={() => {
            onFiltersChange({
              ...filters,
              cities: filters.cities.filter(  (s) => s.id !== city.id),
            });
          }}
        />
      ))}
    </div>
  );
};

export default FiltersButtons;
