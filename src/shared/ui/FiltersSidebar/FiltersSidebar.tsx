import { FC, useEffect } from 'react';
import RadioGroupUI from '@shared/ui/RadioGroupUI/RadioGroupUI';
import styles from './FiltersSidebar.module.css';
import {
  Category,
  CategoryGroupUI,
} from '@shared/ui/CheckboxGroupUI/CheckboxGroupUI.tsx';
import { TCategory } from '@entities/Skills.ts';
import { useDispatch, useSelector } from '@app/store/store.ts';
import { getSkills, fetchSkills } from '@app/store/slices/filters';

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ className = '' }) => {
  const skills: TCategory[] = useSelector(getSkills);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!skills.length) {
      dispatch(fetchSkills());
    }
  }, []);

  const convertTCategoriesToCategories = (
    tCategories: TCategory[],
  ): Category[] =>
    tCategories.map((tCategory, categoryIndex) => ({
      id: categoryIndex.toString(),
      label: tCategory.title,
      subcategories: tCategory.skills.map((skill, skillIndex) => ({
        id: skillIndex.toString(),
        label: skill,
      })),
    }));

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.heading}>Фильтры</h2>
      <div className={styles.filterSections}>
        <RadioGroupUI
          name="role"
          value="all"
          onChange={() => {}}
          options={[
            { value: 'all', label: 'Всё' },
            { value: 'needLearn', label: 'Хочу научиться' },
            { value: 'canTeach', label: 'Могу научить' },
          ]}
        />
        <CategoryGroupUI
          categories={convertTCategoriesToCategories(skills)}
          selectedSubcategories={[]}
          onSubcategoryToggle={(id: string) => {}}
        />
        <RadioGroupUI
          label="Пол автора"
          name="gender"
          value="any"
          onChange={() => {}}
          options={[
            { value: 'any', label: 'Не имеет значения' },
            { value: 'men', label: 'Мужской' },
            { value: 'women', label: 'Женский' },
          ]}
        />
      </div>
    </aside>
  );
};
export default FilterSidebar;
