
// Базовые типы
export type UserId = number;
export type SubcategoryId = number;
export type IsoDate = string; // "2025-02-16T12:00:00Z"

// Пол
export type Gender = 'male' | 'female' | 'other' | null;

// Минимальный пользователь (для превью в списке)
export interface UserPreview {
  id: UserId;
  name: string;
  avatarUrl?: string;
}

// Полный профиль пользователя (приходит с сервера)
export interface User {
  id: UserId;
  name: string;
  email: string;
  avatarUrl?: string;
  about?: string;
  city?: string;
  birthDate?: IsoDate;           // дата рождения
  gender?: Gender;
  registrationDate: IsoDate;     // дата создания профиля (не меняется)
  
  // Навыки
  teachSkillId?: SubcategoryId;  // ID одного навыка, который может преподавать
  learnSkillIds: SubcategoryId[]; // массив ID навыков, которые хочет изучить
  
  // Избранное / лайки
  isFavorite?: boolean;          // добавил ли текущий пользователь в избранное
  favoritesCount?: number;       // сколько людей добавили этого пользователя
}

// Данные для регистрации (отправляем на сервер)
export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  birthDate: string;             // ISO-строка
  gender: Gender;
  city?: string;
  teachSkillId?: SubcategoryId;  // один навык преподавания (опционально)
  learnSkillIds: SubcategoryId[]; // навыки, которые хочет изучить
  about?: string;
  avatarUrl?: string;
}

// Данные для редактирования профиля (PATCH)
export interface UpdateUserDTO {
  name?: string;
  about?: string;
  avatarUrl?: string;
  city?: string;
  birthDate?: string;
  gender?: Gender;
  teachSkillId?: SubcategoryId;
  learnSkillIds?: SubcategoryId[];
}