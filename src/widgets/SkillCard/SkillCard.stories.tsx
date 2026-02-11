import type { Meta, StoryObj } from '@storybook/react';
import SkillCard from './SkillCard';
import { Skill } from './SkillCard';
import styles from './SkillCard.module.css';

// Импортируем изображения из SkillGallery.stories
import image1 from '@assets/image for test/image.jpg';
import image2 from '@assets/image for test/Image (1).png';
import image3 from '@assets/image for test/Image (2).png';
import image4 from '@assets/image for test/3aaa87619f4111f05c60657e37b8861a7166ae17.jpg';
import image5 from '@assets/image for test/Image (Копия 2).png';
import image6 from '@assets/image for test/Image (Копия).png';

const meta: Meta<typeof SkillCard> = {
  title: 'Widgets/SkillCard',
  component: SkillCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    skill: {
      description: 'Данные о навыке',
      control: 'object',
    },
    proposeExchange: {
      description: 'Кнопка "Предложить обмен"',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkillCard>;

const defaultSkill: Skill = {
  id: 1,
  title: 'Игра на барабанах',
  categories: ['Творчество и искусство', 'Музыка и звук'],
  description: 'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
  images: [image1, image2, image3, image4, image5, image6],
};

const ExchangeButton = () => (
  <button
    className={styles.exchangeButton}
    onClick={() => console.log('Предложить обмен')}
  >
    Предложить обмен
  </button>
);

const ExchangeLink = () => (
  <a
    href="/exchange"
    className={styles.exchangeButton}
    onClick={(e) => {
      e.preventDefault();
      console.log('Предложить обмен');
    }}
  >
    Предложить обмен
  </a>
);

export const Default: Story = {
  args: {
    skill: defaultSkill,
    proposeExchange: <ExchangeButton />,
  },
};

export const NoCategories: Story = {
  args: {
    skill: {
      ...defaultSkill,
      categories: undefined,
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Без категорий',
};

export const NoDescription: Story = {
  args: {
    skill: {
      ...defaultSkill,
      description: undefined,
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Без описания',
};

export const NoImages: Story = {
  args: {
    skill: {
      ...defaultSkill,
      images: [],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Без изображений',
};

export const SingleImage: Story = {
  args: {
    skill: {
      ...defaultSkill,
      images: [image1],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Одно изображение',
};

export const TwoImages: Story = {
  args: {
    skill: {
      ...defaultSkill,
      images: [image1, image2],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Два изображения',
};

export const ThreeImages: Story = {
  args: {
    skill: {
      ...defaultSkill,
      images: [image1, image2, image3],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Три изображения',
};

export const FourImages: Story = {
  args: {
    skill: {
      ...defaultSkill,
      images: [image1, image2, image3, image4],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Четыре изображения',
};

export const FiveImages: Story = {
  args: {
    skill: {
      ...defaultSkill,
      images: [image1, image2, image3, image4, image5],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Пять изображений',
};

export const LongContent: Story = {
  args: {
    skill: {
      ...defaultSkill,
      title: 'Игра на барабанах и перкуссии с углубленным изучением ритмических паттернов',
      description: 'Меня зовут Алексей, и я профессиональный барабанщик с более чем 10-летним опытом. Я выступал на различных площадках Москвы и других городов, работал с разными музыкальными коллективами. Моя специализация включает: игру на ударной установке, перкуссии, изучение различных стилей (рок, джаз, фанк, латина), работу с метрономом, развитие чувства ритма, импровизацию. Я могу научить вас не только технике, но и музыкальному мышлению, пониманию структуры песен, взаимодействию с другими музыкантами. Занятия проводятся индивидуально, с учетом вашего уровня подготовки и музыкальных предпочтений. Первое занятие — бесплатное знакомство и определение целей.',
      categories: ['Творчество и искусство', 'Музыка и звук', 'Обучение', 'Развлечения'],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Длинный контент',
};

export const ManyCategories: Story = {
  args: {
    skill: {
      ...defaultSkill,
      categories: [
        'Творчество',
        'Искусство',
        'Музыка',
        'Звук',
        'Обучение',
        'Развлечение',
        'Хобби',
        'Профессия',
      ],
    },
    proposeExchange: <ExchangeButton />,
  },
  name: 'Множество категорий',
};

export const WithoutExchangeButton: Story = {
  args: {
    skill: defaultSkill,
    proposeExchange: undefined,
  },
  name: 'Без кнопки обмена',
};

export const WithExchangeLink: Story = {
  args: {
    skill: defaultSkill,
    proposeExchange: <ExchangeLink />,
  },
  name: 'Со ссылкой обмена',
};