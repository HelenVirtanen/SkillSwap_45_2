import { useMemo } from 'react';
import { Filters } from '@shared/ui/FiltersSidebar/FiltersSidebar';
import { IUserCardData } from '@widgets/UserCardsGroup/UserCardsGroup';
import { SkillCategory } from '@app/store/slices/staticData/staticDataSlice';

export const useUserFilters = (
  users: IUserCardData[],
  filters: Filters,
  categories: SkillCategory[],
) => {
  return useMemo(() => {
    const selectedTitles = {
      categories: filters.skillCategories.map((c) => c.title),
      subcategories: filters.skillSubcategories.map((s) => s.title),
    };

    const hasSkillFilters =
      selectedTitles.categories.length > 0 ||
      selectedTitles.subcategories.length > 0;

    const isSkillInCategory = (skillTitle: string, categoryTitle: string) => {
      const category = categories.find((c) => c.title === categoryTitle);
      return (
        category?.subcategories.some((sub) => sub.title === skillTitle) ?? false
      );
    };

    const matchesFilters = (user: IUserCardData) => {
      // Город
      const cityMatch =
        filters.cities.length === 0 ||
        filters.cities.some((city) => city.name === user.city);

      // Пол
      const genderMatch =
        filters.gender === 'any' || user.gender === filters.gender;

      // Навыки
      let skillMatch = true;
      if (hasSkillFilters) {
        const teachingMatches =
          selectedTitles.subcategories.includes(user.teachingSkill.title) ||
          selectedTitles.categories.some((cat) =>
            isSkillInCategory(user.teachingSkill.title, cat),
          );
        const learningMatches = user.learningSkills.some(
          (skill) =>
            selectedTitles.subcategories.includes(skill.title),
        );

        skillMatch =
          filters.teachStatus === 'needLearn'
            ? learningMatches
            : filters.teachStatus === 'canTeach'
              ? teachingMatches
              : teachingMatches || learningMatches;
      }

      return cityMatch && genderMatch && skillMatch;
    };

    return users.filter(matchesFilters);
  }, [users, filters, categories]);
};
