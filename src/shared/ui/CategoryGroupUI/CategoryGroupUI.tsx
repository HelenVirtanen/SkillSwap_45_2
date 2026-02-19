import { useState } from 'react';
import type { FC } from 'react';
import styles from './CategoryGroupUI.module.css';
import { CheckboxUI, type CheckboxState } from '../CheckboxUI/CheckboxUI';

import ChevronDown from '@assets/icons/chevron-down.svg?react';
import ChevronUp from '@assets/icons/chevron-up.svg?react';

export interface Subcategory {
  id: string;
  label: string;
}

export interface Category {
  id: string;
  label: string;
  subcategories?: Subcategory[];
}

interface CategoryGroupProps {
  label?: string;
  categories: Category[];
  selectedSubcategories: string[];
  onSubcategoryToggle: (subcategoryId: string) => void;
  onCategoryToggle?: (subcategoryIds: string[], shouldSelect: boolean) => void;
}

export const CategoryGroupUI: FC<CategoryGroupProps> = ({
  label,
  categories,
  selectedSubcategories,
  onSubcategoryToggle,
  onCategoryToggle,
}) => {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  /* ---------------- ОТКРЫТИЕ / ЗАКРЫТИЕ ---------------- */

  const toggleCategoryOpen = (categoryId: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  /* ---------------- СОСТОЯНИЕ КАТЕГОРИИ ---------------- */

  const getCategoryState = (category: Category): CheckboxState => {
    if (!category.subcategories?.length) return 'default';

    const total = category.subcategories.length;
    const selectedCount = category.subcategories.filter((sub) =>
      selectedSubcategories.includes(sub.id),
    ).length;

    if (selectedCount === 0) return 'default';
    if (selectedCount === total) return 'done';

    return 'remove'; // indeterminate
  };

  /* ---------------- КЛИК ПО КАТЕГОРИИ ---------------- */

  const handleCategoryToggle = (category: Category) => {
    if (!category.subcategories?.length) return;

    const childIds = category.subcategories.map((sub) => sub.id);

    const allSelected = childIds.every((id) =>
      selectedSubcategories.includes(id),
    );

    // Если есть batch-обработчик - используем его
    if (onCategoryToggle) {
      onCategoryToggle(childIds, !allSelected);
    } else {
      // Fallback на старое поведение
      if (allSelected) {
        childIds.forEach((id) => {
          onSubcategoryToggle(id);
        });
      } else {
        const idsToAdd = childIds.filter(
          (id) => !selectedSubcategories.includes(id),
        );
        idsToAdd.forEach((id) => {
          onSubcategoryToggle(id);
        });
      }
    }
  };

  /* ---------------- СОСТОЯНИЕ ПОДКАТЕГОРИИ ---------------- */

  const getSubcategoryState = (subId: string): CheckboxState =>
    selectedSubcategories.includes(subId) ? 'done' : 'default';

  /* ---------------- RENDER ---------------- */

  return (
    <div>
      {label && <h3 className={styles.label}>{label}</h3>}
      <div className={styles.container}>
        {categories.map((category) => {
          const isOpen = openCategories.has(category.id);
          const categoryState = getCategoryState(category);

          return (
            <div key={category.id} className={styles.categoryWrapper}>
              <div className={styles.categoryRow}>
                <CheckboxUI
                  label={category.label}
                  state={categoryState}
                  onChange={() => handleCategoryToggle(category)}
                  name={`category-${category.id}`}
                />

                {category.subcategories?.length ? (
                  <button
                    type="button"
                    className={styles.expandButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategoryOpen(category.id);
                    }}
                  >
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                ) : null}
              </div>

              {isOpen && category.subcategories?.length ? (
                <div className={styles.subcategories}>
                  {category.subcategories.map((sub) => (
                    <CheckboxUI
                      key={sub.id}
                      label={sub.label}
                      state={getSubcategoryState(sub.id)}
                      onChange={() => onSubcategoryToggle(sub.id)}
                      name={`subcategory-${sub.id}`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
