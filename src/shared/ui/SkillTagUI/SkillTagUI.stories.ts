import type { Meta, StoryObj } from '@storybook/react-vite';
import SkillTagUI, { TSkillVariant } from './SkillTagUI';

const meta = {
  title: 'Main/UI/SkillTag',
  component: SkillTagUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Пример навыка',
    variant: 'other',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'business',
        'languages',
        'home',
        'art',
        'education',
        'health',
        'other',
      ] satisfies TSkillVariant[],
    },
  },
} satisfies Meta<typeof SkillTagUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Business: Story = {
  args: {
    title: 'Маркетинг и реклама',
    variant: 'business',
  },
};

export const Languages: Story = {
  args: {
    title: 'Английский язык',
    variant: 'languages',
  },
};

export const Home: Story = {
  args: {
    title: 'Ремонт',
    variant: 'home',
  },
};

export const Art: Story = {
  args: {
    title: 'Игра на барабанах',
    variant: 'art',
  },
};

export const Education: Story = {
  args: {
    title: 'Навыки преподавания',
    variant: 'education',
  },
};

export const Health: Story = {
  args: {
    title: 'Медитация',
    variant: 'health',
  },
};

export const Other: Story = {
  args: {
    title: '+2',
    variant: 'other',
  },
};
