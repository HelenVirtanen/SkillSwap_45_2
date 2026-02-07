/**
 * Вычисляет возраст по дате рождения
 * @param birthDateString - строка с датой рождения, например "1990-05-12"
 * @returns возраст в годах
 */
export function calculateAge(birthDateString: string): number {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--; // День рождения ещё не наступил
  }

  return age;
}

/**
 * Возвращает правильное склонение слова "год" для указанного возраста
 * @param age - возраст в годах
 * @returns строка "год", "года" или "лет"
 */
export function getAgeLabel(age: number): string {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;

  // Исключения для 11-14
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет';
  }

  // 1 год
  if (lastDigit === 1) {
    return 'год';
  }

  // 2-4 года
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года';
  }

  // 5-0 лет
  return 'лет';
}

/**
 * Возвращает строку с возрастом и правильным склонением
 * @param age - возраст в годах
 * @returns строка в формате "21 год", "22 года", "25 лет"
 */
export function getAgeWithLabel(age: number): string {
  const label = getAgeLabel(age);
  return `${age} ${label}`;
}