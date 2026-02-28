import { createSelector } from '@reduxjs/toolkit';
import { selectAllUsers, selectMappedUsers } from '../User/usersSlise';
import { selectFavouritesCountMap } from '../likes/likesSlice';

/* ---------------- ПОПУЛЯРНЫЕ ---------------- */

export const selectPopularUsers = createSelector(
  [selectMappedUsers, selectFavouritesCountMap],
  (users, likesMap) => {
    return [...users]
      .sort((a, b) => {
        const likesA = likesMap[Number(a.id)] || 0;
        const likesB = likesMap[Number(b.id)] || 0;
        return likesB - likesA;
      })
      .slice(0, 6);
  }
);

/* ---------------- НОВЫЕ ---------------- */

export const selectNewUsers = createSelector(
  [selectMappedUsers, selectAllUsers],
  (mappedUsers, allUsers) => {
    const sortedIds = [...allUsers]
      .filter((u) => u.createdAt)
      .sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() -
          new Date(a.createdAt!).getTime()
      )
      .slice(0, 6)
      .map((u) => String(u.id));

    return mappedUsers.filter((user) =>
      sortedIds.includes(user.id)
    );
  }
);


/* ---------------- РЕКОМЕНДУЕМ ---------------- */

export const selectRecommendedUsers = createSelector(
  [selectMappedUsers],
  (users) => {
    return [...users].sort(() => Math.random() - 0.5);
  }
);
