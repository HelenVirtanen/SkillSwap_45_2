import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CategoryGroupUI } from './CheckboxGroupUI';

const meta: Meta<typeof CategoryGroupUI> = {
  title: 'Main/Shared/CategoryGroupUI',
  component: CategoryGroupUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CategoryGroupUI>;

/* ---------------- ДАННЫЕ ---------------- */

const categories = [
  {
    id: '1',
    label: 'Бизнес и карьера',
    subcategories: [
      { id: '1-1', label: 'Управление командой' },
      { id: '1-2', label: 'Маркетинг и реклама' },
      { id: '1-3', label: 'Продажи и переговоры' },
      { id: '1-4', label: 'Личный бренд' },
      { id: '1-5', label: 'Резюме и собеседование' },
      { id: '1-6', label: 'Тайм-менеджмент' },
      { id: '1-7', label: 'Проектное управление' },
      { id: '1-8', label: 'Предпринимательство' },
    ],
  },
  {
    id: '2',
    label: 'Иностранные языки',
    subcategories: [
      { id: '2-1', label: 'Английский' },
      { id: '2-2', label: 'Французский' },
      { id: '2-3', label: 'Испанский' },
      { id: '2-4', label: 'Немецкий' },
      { id: '2-5', label: 'Китайский' },
      { id: '2-6', label: 'Японский' },
      { id: '2-7', label: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    id: '3',
    label: 'Дом и уют',
    subcategories: [
      { id: '3-1', label: 'Уборка и организация' },
      { id: '3-2', label: 'Домашние финансы' },
      { id: '3-3', label: 'Приготовление еды' },
      { id: '3-4', label: 'Домашние растения' },
      { id: '3-5', label: 'Ремонт' },
      { id: '3-6', label: 'Хранение вещей' },
    ],
  },
  {
    id: '4',
    label: 'Творчество и искусство',
    subcategories: [
      { id: '4-1', label: 'Рисование и иллюстрация' },
      { id: '4-2', label: 'Фотография' },
      { id: '4-3', label: 'Видеомонтаж' },
      { id: '4-4', label: 'Музыка и звук' },
      { id: '4-5', label: 'Актёрское мастерство' },
      { id: '4-6', label: 'Креативное письмо' },
      { id: '4-7', label: 'Арт-терапия' },
      { id: '4-8', label: 'Декор и DIY' },
    ],
  },
  {
    id: '5',
    label: 'Образование и развитие',
    subcategories: [
      { id: '5-1', label: 'Личностное развитие' },
      { id: '5-2', label: 'Навыки обучения' },
      { id: '5-3', label: 'Когнитивные техники' },
      { id: '5-4', label: 'Скорочтение' },
      { id: '5-5', label: 'Навыки преподавания' },
      { id: '5-6', label: 'Коучинг' },
    ],
  },
  {
    id: '6',
    label: 'Здоровье и лайфстайл',
    subcategories: [
      { id: '6-1', label: 'Йога и медитация' },
      { id: '6-2', label: 'Питание и ЗОЖ' },
      { id: '6-3', label: 'Ментальное здоровье' },
      { id: '6-4', label: 'Осознанность' },
      { id: '6-5', label: 'Физические тренировки' },
      { id: '6-6', label: 'Сон и восстановление' },
      { id: '6-7', label: 'Баланс жизни и работы' },
    ],
  },
];

/* ---------------- STORY ---------------- */

export const Default: Story = {
  render: () => {
    const [selectedSubcategories, setSelectedSubcategories] = useState<
      string[]
    >([]);

    const handleSubcategoryToggle = (subId: string) => {
      setSelectedSubcategories((prev) =>
        prev.includes(subId)
          ? prev.filter((id) => id !== subId)
          : [...prev, subId],
      );
    };

    return (
      <div
        style={{
          width: 284,
          height: 580,
          border: '1px solid #E5E5E5',
          borderRadius: 12,
          background: '#fff',
        }}
      >
        <CategoryGroupUI
          categories={categories}
          selectedSubcategories={selectedSubcategories}
          onSubcategoryToggle={handleSubcategoryToggle}
        />
      </div>
    );
  },
};
