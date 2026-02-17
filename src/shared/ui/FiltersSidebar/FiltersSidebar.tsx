import { FC, useState } from 'react';
import RadioGroupUI from '@shared/ui/RadioGroupUI/RadioGroupUI';
import styles from './FiltersSidebar.module.css';
// import { getSkills, getCities, fetchSkills } from '@app/store/slices/filters';
import {
  Category,
  CategoryGroupUI,
} from '@shared/ui/CategoryGroupUI/CategoryGroupUI.tsx';
import { useAppSelector } from '@app/store/store.ts';
import {
  CheckboxGroupItem,
  CityGroupUI,
} from '@shared/ui/CityGroupUI/CityGroupUI.tsx';
import {
  City,
  selectCategories,
  selectCities,
  SkillCategory,
} from '@app/store/slices/staticData/staticDataSlice.ts';

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ className = '' }) => {
  const skills = useAppSelector(selectCategories);
  const cities = useAppSelector(selectCities);

  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleSubcategoryToggle = (subId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subId)
        ? prev.filter((id) => id !== subId)
        : [...prev, subId],
    );
  };

  const handleCityToggle = (id: string) => {
    setSelectedCities((prev) =>
      prev.includes(id)
        ? prev.filter((cityId) => cityId !== id)
        : [...prev, id],
    );
  };

  const convertSkills = (skillCategories: SkillCategory[]): Category[] =>
    skillCategories.map((category) => ({
      id: category.id.toString(),
      label: category.title,
      subcategories: category.subcategories.map((skill) => ({
        id: `${category.id.toString()}-${skill.id.toString()}`,
        label: skill.title,
      })),
    }));

  const convertCities = (cities: City[]): CheckboxGroupItem[] =>
    cities.map((city) => ({
      id: city.id.toString(),
      label: city.name
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
          categories={convertSkills(skills)}
          selectedSubcategories={selectedSubcategories}
          onSubcategoryToggle={handleSubcategoryToggle}
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
        <CityGroupUI
          title={'Город'}
          items={convertCities(cities)}
          selectedItems={selectedCities}
          onItemToggle={handleCityToggle}
        />
      </div>
    </aside>
  );
};
export default FilterSidebar;
