// C:\Users\ispun\OneDrive\Документы\GitHub\sales-bonus\SkillSwap_45_2\src\widgets\UserProfileCard\UserProfileCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import UserProfileCard from './UserProfileCard';

const meta: Meta<typeof UserProfileCard> = {
  title: '<Main/Widgets/UserProfileCard',
  component: UserProfileCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFavoriteToggle: { action: 'favorite toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

// Базовый пользователь
const mockUser = {
  id: '1',
  avatar: 'https://i.pravatar.cc/150?img=1',
  name: 'Анна',
  birthDate: '1995-05-15',
  city: 'Москва',
  about: 'Профессиональный фотограф с 5-летним опытом. Люблю делиться знаниями и учиться новому. В свободное время путешествую и изучаю иностранные языки.',
  teachingSkill: {
    title: 'Фотография',
    variant: 'art' as const
  },
  learningSkills: [
    { title: 'Photoshop', variant: 'art' as const },
    { title: 'Английский', variant: 'languages' as const },
    { title: 'Рисование', variant: 'art' as const }
  ]
};

export const Default: Story = {
  args: {
    user: mockUser,
    showFavorite: false,
    onFavoriteToggle: (userId) => console.log('favorite toggled for user:', userId),
  },
};

export const WithFavorite: Story = {
  args: {
    user: {
      ...mockUser,
      id: '2',
      name: 'Иван',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isFavorite: true,
    },
    showFavorite: true,
    onFavoriteToggle: (userId) => console.log('favorite toggled for user:', userId),
  },
};

export const WithoutAbout: Story = {
  args: {
    user: {
      ...mockUser,
      id: '3',
      name: 'Мария',
      avatar: 'https://i.pravatar.cc/150?img=3',
      about: undefined,
    },
    showFavorite: false,
    onFavoriteToggle: (userId) => console.log('favorite toggled for user:', userId),
  },
};

export const WithLongAbout: Story = {
  args: {
    user: {
      ...mockUser,
      id: '4',
      name: 'Алексей',
      avatar: 'https://i.pravatar.cc/150?img=4',
      about: 'Профессиональный фотограф с 5-летним опытом. Люблю делиться знаниями и учиться новому. В свободное время путешествую и изучаю иностранные языки. Также увлекаюсь кулинарией и программированием. Мечтаю объединить фотографию и технологии в своих проектах. Постоянно развиваюсь и слежу за новыми трендами в мире фотографии и дизайна. Веду свой блог о фотографии и провожу мастер-классы для начинающих.',
    },
    showFavorite: false,
    onFavoriteToggle: (userId) => console.log('favorite toggled for user:', userId),
  },
};

export const ManySkills: Story = {
  args: {
    user: {
      ...mockUser,
      id: '5',
      name: 'Екатерина',
      avatar: 'https://i.pravatar.cc/150?img=5',
      learningSkills: [
        { title: 'Photoshop', variant: 'art' as const },
        { title: 'Illustrator', variant: 'art' as const },
        { title: 'Figma', variant: 'art' as const },
        { title: 'Python', variant: 'education' as const },
        { title: 'JavaScript', variant: 'education' as const },
        { title: 'Кулинария', variant: 'home' as const },
        { title: 'Йога', variant: 'health' as const }
      ],
    },
    showFavorite: false,
    onFavoriteToggle: (userId) => console.log('favorite toggled for user:', userId),
  },
};

export const WithTeachingSkill: Story = {
  args: {
    user: {
      ...mockUser,
      id: '6',
      name: 'Дмитрий',
      avatar: 'https://i.pravatar.cc/150?img=6',
      teachingSkill: {
        title: 'Программирование',
        variant: 'education' as const
      },
      learningSkills: [
        { title: 'Английский', variant: 'languages' as const },
        { title: 'Фотография', variant: 'art' as const }
      ],
    },
    showFavorite: false,
    onFavoriteToggle: (userId) => console.log('favorite toggled for user:', userId),
  },
};