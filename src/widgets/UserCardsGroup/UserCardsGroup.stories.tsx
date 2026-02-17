import type { Meta, StoryObj } from '@storybook/react-vite';
import UserCardsGroup from './UserCardsGroup';

// Моковые данные из users.json
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
    id: '2',
    avatar: '/src/assets/avatars/alla.png',
    name: 'Алла',
    birthDate: '1995-03-22',
    city: 'Москва',
    isFavorite: false,
    teachingSkill: {
      title: 'Английский',
      variant: 'languages' as const,
    },
    learningSkills: [
      { title: 'Управление командой', variant: 'business' as const },
      { title: 'Йога и медитация', variant: 'health' as const },
      { title: 'Рисование и иллюстрация', variant: 'art' as const },
    ],
  },
  {
    id: '3',
    avatar: '/src/assets/avatars/konstantin.png',
    name: 'Константин',
    birthDate: '1988-11-10',
    city: 'Новосибирск',
    isFavorite: true,
    teachingSkill: {
      title: 'Продажи и переговоры',
      variant: 'business' as const,
    },
    learningSkills: [
      { title: 'Китайский', variant: 'languages' as const },
      { title: 'Приготовление еды', variant: 'home' as const },
      { title: 'Видеомонтаж', variant: 'art' as const },
    ],
  },
  {
    id: '4',
    avatar: '/src/assets/avatars/ekaterina.png',
    name: 'Екатерина',
    birthDate: '1990-09-05',
    city: 'Екатеринбург',
    isFavorite: false,
    teachingSkill: {
      title: 'Йога и медитация',
      variant: 'health' as const,
    },
    learningSkills: [
      { title: 'Домашние растения', variant: 'home' as const },
      { title: 'Креативное письмо', variant: 'art' as const },
      { title: 'Испанский', variant: 'languages' as const },
    ],
  },
  {
    id: '5',
    avatar: '/src/assets/avatars/maksim.png',
    name: 'Максим',
    birthDate: '1993-12-18',
    city: 'Нижний Новгород',
    isFavorite: false,
    teachingSkill: {
      title: 'Ремонт',
      variant: 'home' as const,
    },
    learningSkills: [
      { title: 'Проектное управление', variant: 'business' as const },
      { title: 'Немецкий', variant: 'languages' as const },
      { title: 'Фотография', variant: 'art' as const },
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
  {
    id: '7',
    avatar: '/src/assets/avatars/ivan.png',
    name: 'Дмитрий',
    birthDate: '1991-04-12',
    city: 'Самара',
    isFavorite: false,
    teachingSkill: {
      title: 'Программирование',
      variant: 'education' as const,
    },
    learningSkills: [
      { title: 'Английский', variant: 'languages' as const },
      { title: 'Йога', variant: 'health' as const },
    ],
  },
];

const meta = {
  title: 'Main/Widgets/UserCardsGroup',
  component: UserCardsGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Группа карточек пользователей. Десктоп: 3 колонки, gap 24px. Адаптивность: 2 колонки на планшете, 1 колонка на мобильном.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserCardsGroup>;

export default meta;
type Story = StoryObj<typeof UserCardsGroup>;

// 3 карточки - ровно один ряд
export const ThreeCards: Story = {
  args: {
    users: mockUsers.slice(0, 3),
    onMessageClick: (id) => console.log('Message to:', id),
  },
};

// 4 карточки - второй ряд начинается с 4-й карточки
export const FourCards: Story = {
  args: {
    users: mockUsers.slice(0, 4),
    onMessageClick: (id) => console.log('Message to:', id),
  },
};

// 6 карточек - два полных ряда
export const SixCards: Story = {
  args: {
    users: mockUsers.slice(0, 6),
    onMessageClick: (id) => console.log('Message to:', id),
  },
};

// 7 карточек - два полных ряда + 1 карточка в третьем ряду
export const SevenCards: Story = {
  args: {
    users: mockUsers.slice(0, 7),
    onMessageClick: (id) => console.log('Message to:', id),
  },
};

// С сердечками (для страницы избранного)
export const WithFavorites: Story = {
  args: {
    users: mockUsers.filter(u => u.isFavorite).slice(0, 3),
    onFavoriteToggle: (id) => console.log('Toggle favorite:', id),
    onMessageClick: (id) => console.log('Message to:', id),
  },
};

// Планшет - 2 колонки
export const TabletView: Story = {
  args: {
    users: mockUsers.slice(0, 4),
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// Мобильный вид - 1 колонка
export const MobileView: Story = {
  args: {
    users: mockUsers.slice(0, 3),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Пустое состояние
export const Empty: Story = {
  args: {
    users: [],
  },
};