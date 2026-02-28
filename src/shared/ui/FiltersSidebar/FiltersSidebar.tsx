import { FC } from 'react';
import RadioGroupUI from '@shared/ui/RadioGroupUI/RadioGroupUI';
import styles from './FiltersSidebar.module.css';
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
import { isEqual } from 'lodash';

export interface Filters {
  cities: City[];
  skillCategories: Pick<SkillCategory, 'id' | 'title'>[];
  skillSubcategories: SkillCategory['subcategories'];
  gender: string;
  teachStatus: string;
}

interface FilterSidebarProps {
  filters: Filters;
  defaultFilters: Filters;
  onFiltersChange: (filters: Filters) => void;
  className?: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({
  filters,
  defaultFilters,
  onFiltersChange,
  className = '',
}) => {
  const skillCategories = useAppSelector(selectCategories);
  const cities = useAppSelector(selectCities);

  const handleCategoryToggle = (
    subcategoryIds: string[],
    shouldSelect: boolean,
  ) => {
    if (shouldSelect) {
      // Добавляем все подкатегории
      const skillsToAdd: SkillCategory['subcategories'] = [];
      let parentCategory: Pick<SkillCategory, 'id' | 'title'> | null = null;

      for (const subId of subcategoryIds) {
        for (const category of skillCategories) {
          const skill = category.subcategories.find(
            (sub) => sub.id.toString() === subId,
          );
          if (
            skill &&
            !filters.skillSubcategories.some((s) => s.id === skill.id)
          ) {
            skillsToAdd.push(skill);
            if (!parentCategory) {
              parentCategory = { id: category.id, title: category.title };
            }
          }
        }
      }

      const newSubcategories = [...filters.skillSubcategories, ...skillsToAdd];

      // Добавляем категорию, если её нет
      let newCategories = filters.skillCategories;
      if (
        parentCategory &&
        !newCategories.some((c) => c.id === parentCategory!.id)
      ) {
        newCategories = [...newCategories, parentCategory];
      }

      onFiltersChange({
        ...filters,
        skillCategories: newCategories,
        skillSubcategories: newSubcategories,
      });
    } else {
      // Удаляем все подкатегории
      const newSubcategories = filters.skillSubcategories.filter(
        (skill) => !subcategoryIds.includes(skill.id.toString()),
      );

      // Находим и удаляем категорию
      let categoryIdToRemove: number | null = null;
      for (const category of skillCategories) {
        const hasThisCategory = category.subcategories.some((sub) =>
          subcategoryIds.includes(sub.id.toString()),
        );
        if (hasThisCategory) {
          categoryIdToRemove = category.id;
          break;
        }
      }

      const newCategories = categoryIdToRemove
        ? filters.skillCategories.filter((c) => c.id !== categoryIdToRemove)
        : filters.skillCategories;

      onFiltersChange({
        ...filters,
        skillCategories: newCategories,
        skillSubcategories: newSubcategories,
      });
    }
  };

  const handleSubcategoryToggle = (subId: string) => {
    let foundSkill: SkillCategory['subcategories'][0] | null = null;
    let parentCategory: Pick<SkillCategory, 'id' | 'title'> | null = null;

    for (const category of skillCategories) {
      const skill = category.subcategories.find(
        (sub) => sub.id.toString() === subId,
      );
      if (skill) {
        foundSkill = skill;
        parentCategory = { id: category.id, title: category.title };
        break;
      }
    }

    if (!foundSkill || !parentCategory) return;

    const isAlreadySelected = filters.skillSubcategories.some(
      (s) => s.id === foundSkill!.id,
    );

    const newSubcategories = isAlreadySelected
      ? filters.skillSubcategories.filter((s) => s.id !== foundSkill!.id)
      : [...filters.skillSubcategories, foundSkill];

    const categorySubcategories =
      skillCategories.find((c) => c.id === parentCategory!.id)?.subcategories ||
      [];

    const allSubcategoriesSelected = categorySubcategories.every((sub) =>
      newSubcategories.some((s) => s.id === sub.id),
    );

    let newCategories = filters.skillCategories;

    if (allSubcategoriesSelected) {
      if (!newCategories.some((c) => c.id === parentCategory!.id)) {
        newCategories = [...newCategories, parentCategory];
      }
    } else {
      newCategories = newCategories.filter((c) => c.id !== parentCategory!.id);
    }

    onFiltersChange({
      ...filters,
      skillCategories: newCategories,
      skillSubcategories: newSubcategories,
    });
  };

  const handleCityToggle = (cityId: string) => {
    const city = cities.find((c) => c.id.toString() === cityId);
    if (!city) return;

    const isAlreadySelected = filters.cities.some((c) => c.id === city.id);

    const newCities = isAlreadySelected
      ? filters.cities.filter((c) => c.id !== city.id)
      : [...filters.cities, city];

    onFiltersChange({ ...filters, cities: newCities });
  };

  const handleTeachStatusChange = (value: string) => {
    onFiltersChange({ ...filters, teachStatus: value });
  };

  const handleGenderChange = (value: string) => {
    onFiltersChange({ ...filters, gender: value });
  };

  const convertSkills = (skillCategories: SkillCategory[]): Category[] =>
    skillCategories.map((category) => ({
      id: category.id.toString(),
      label: category.title,
      subcategories: category.subcategories.map((skill) => ({
        id: skill.id.toString(),
        label: skill.title,
      })),
    }));

  const convertCities = (cities: City[]): CheckboxGroupItem[] =>
    cities.map((city) => ({
      id: city.id.toString(),
      label: city.name,
    }));

  const selectedSkillIds = filters.skillSubcategories.map((s) =>
    s.id.toString(),
  );
  const selectedCityIds = filters.cities.map((c) => c.id.toString());
  
  const filtersCounter =
    filters.cities.length +
    filters.skillSubcategories.length +
    (filters.gender !== defaultFilters.gender ? 1 : 0) +
    (filters.teachStatus !== defaultFilters.teachStatus ? 1 : 0);

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <div className={`${styles.buttonsContainer}`}>
        <h2 className={styles.heading}>
          {`Фильтры${isEqual(filters, defaultFilters) ? '' : ` (${filtersCounter})`}`}
        </h2>
        {!isEqual(filters, defaultFilters) && (
          <button
            className={styles.crossButton}
            onClick={() => onFiltersChange(defaultFilters)}
          >
            Сбросить
          </button>
        )}
      </div>
      <div className={styles.filterSections}>
        <RadioGroupUI
          name="role"
          value={filters.teachStatus}
          onChange={handleTeachStatusChange}
          options={[
            { value: 'all', label: 'Всё' },
            { value: 'needLearn', label: 'Хочу научиться' },
            { value: 'canTeach', label: 'Могу научить' },
          ]}
        />

        <CategoryGroupUI
          label={'Навыки'}
          categories={convertSkills(skillCategories)}
          selectedSubcategories={selectedSkillIds}
          onSubcategoryToggle={handleSubcategoryToggle}
          onCategoryToggle={handleCategoryToggle}
        />

        <RadioGroupUI
          label="Пол автора"
          name="gender"
          value={filters.gender}
          onChange={handleGenderChange}
          options={[
            { value: 'any', label: 'Не имеет значения' },
            { value: 'мужской', label: 'Мужской' },
            { value: 'женский', label: 'Женский' },
          ]}
        />

        <CityGroupUI
          title={'Город'}
          items={convertCities(cities)}
          maxItems={5}
          selectedItems={selectedCityIds}
          onItemToggle={handleCityToggle}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
