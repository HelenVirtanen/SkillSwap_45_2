import type { Meta, StoryObj } from '@storybook/react';
import UserCard from './UserCard';

// Моковые данные
const mockUsers = [
  {
    id: '1',
    avatar: '/src/assets/avatars/ivan.png',
    name: 'Иван',
    birthDate: '1992-07-15',
    city: 'Санкт-Петербург',
    isFavorite: true,
    teachingSkill: {
      title: 'Музыка и звук',
      variant: 'art' as const,
    },
    learningSkills: [
      { title: 'Тайм-менеджмент', variant: 'business' as const },
      { title: 'Медитация', variant: 'health' as const },
      { title: 'Личный бренд', variant: 'business' as const },
    ],
  },
  {
    id: '6',
    avatar: '/src/assets/avatars/anna.png',
    name: 'Анна',
    birthDate: '1987-01-30',
    city: 'Казань',
    isFavorite: true,
    teachingSkill: {
      title: 'Рисование и иллюстрация',
      variant: 'art' as const,
    },
    learningSkills: [
      { title: 'Питание и ЗОЖ', variant: 'health' as const },
      { title: 'Маркетинг и реклама', variant: 'business' as const },
      { title: 'Скорочтение', variant: 'education' as const },
    ],
  },
];

const meta = {
  title: 'Widgets/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Карточка пользователя. Ширина 324px, высота 368px. Только кнопка "Написать".',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isFavorite: {
      control: 'boolean',
    },
    onFavoriteToggle: { action: 'favorite toggled' },
    onMessageClick: { action: 'message clicked' },
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Ivan: Story = {
  args: {
    ...mockUsers[0],
    onFavoriteToggle: () => console.log('toggle'),
    onMessageClick: () => console.log('message'),
  },
};

export const Anna: Story = {
  args: {
    ...mockUsers[1],
    onFavoriteToggle: () => console.log('toggle'),
    onMessageClick: () => console.log('message'),
  },
};

export const WithManySkills: Story = {
  args: {
    ...mockUsers[0],
    learningSkills: [
      { title: 'Тайм-менеджмент', variant: 'business' },
      { title: 'Медитация', variant: 'health' },
      { title: 'Личный бренд', variant: 'business' },
      { title: 'Английский', variant: 'languages' },
      { title: 'Рисование', variant: 'art' },
      { title: 'Йога', variant: 'health' },
    ],
    onFavoriteToggle: () => console.log('toggle'),
    onMessageClick: () => console.log('message'),
  },
};

export const NotFavorite: Story = {
  args: {
    ...mockUsers[0],
    isFavorite: false,
    onFavoriteToggle: () => console.log('toggle'),
    onMessageClick: () => console.log('message'),
  },
};

