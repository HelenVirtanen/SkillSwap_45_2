import type { Meta, StoryObj } from '@storybook/react';
import SkillPage from './SkillPage';

const meta: Meta<typeof SkillPage> = {
  title: 'Main/Pages/SkillPage',
  component: SkillPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Страница навыка с карточкой пользователя (слева) и карточкой навыка (справа)'
      }
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onProposeExchange: { action: 'propose exchange clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof SkillPage>;

// Моковые данные из макета
const mockUser = {
  id: '1',
  avatar: 'https://i.pravatar.cc/150?img=1',
  name: 'Иван',
  birthDate: '1990-03-15',
  city: 'Санкт-Петербург',
  about: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
  teachingSkill: {
    title: 'Игра на барабанах',
    variant: 'art' as const
  },
  learningSkills: [
    { title: 'Тайм-менеджмент', variant: 'business' as const },
    { title: 'Медитация', variant: 'health' as const }
  ]
};

const mockSkill = {
  id: 1,
  title: 'Игра на барабанах',
  categories: ['Творчество и искусство', 'Музыка и звук'],
  description: 'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
  images: [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3'
  ]
};

// Базовая история 
export const Default: Story = {
  args: {
    user: mockUser,
    skill: mockSkill,
    onProposeExchange: () => console.log('Propose exchange clicked'),
  },
};

// Пользователь без описания
export const UserWithoutAbout: Story = {
  args: {
    user: {
      ...mockUser,
      about: undefined,
    },
    skill: mockSkill,
    onProposeExchange: () => console.log('Propose exchange clicked'),
  },
};

// С длинным списком навыков для изучения
export const UserWithManyLearningSkills: Story = {
  args: {
    user: {
      ...mockUser,
      learningSkills: [
        { title: 'Тайм-менеджмент', variant: 'business' as const },
        { title: 'Медитация', variant: 'health' as const },
        { title: 'Фотография', variant: 'art' as const },
        { title: 'Английский', variant: 'languages' as const },
        { title: 'Йога', variant: 'health' as const }
      ],
    },
    skill: mockSkill,
    onProposeExchange: () => console.log('Propose exchange clicked'),
  },
};

// С другим навыком (для примера)
export const DifferentSkill: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Анна',
      avatar: 'https://i.pravatar.cc/150?img=2',
      teachingSkill: {
        title: 'Английский язык',
        variant: 'languages' as const
      },
    },
    skill: {
      ...mockSkill,
      id: 2,
      title: 'Английский для начинающих',
      categories: ['Языки', 'Образование'],
      description: 'Научу английскому с нуля. Индивидуальный подход, разговорная практика, подготовка к экзаменам.',
      images: [
        'https://picsum.photos/400/300?random=4',
        'https://picsum.photos/400/300?random=5',
        'https://picsum.photos/400/300?random=6'
      ]
    },
    onProposeExchange: () => console.log('Propose exchange clicked'),
  },
};

// Мобильная версия
export const Mobile: Story = {
  args: {
    user: mockUser,
    skill: mockSkill,
    onProposeExchange: () => console.log('Propose exchange clicked'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Мобильная версия - карточки располагаются вертикально',
      },
    },
  },
};

// Планшетная версия
export const Tablet: Story = {
  args: {
    user: mockUser,
    skill: mockSkill,
    onProposeExchange: () => console.log('Propose exchange clicked'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// Интерактивная история для тестирования
export const Interactive: Story = {
  args: {
    user: mockUser,
    skill: mockSkill,
    onProposeExchange: () => alert('Предложить обмен'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная версия с всплывающим уведомлением при клике',
      },
    },
  },
};