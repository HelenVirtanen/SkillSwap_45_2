import type { Meta, StoryObj } from '@storybook/react';
import SkillsListUI from './SkillsListUI';
import { ISkillTagUIProps } from '../SkillTagUI/SkillTagUI';
import { createElement } from 'react';

const meta = {
  title: 'Main/UI/SkillsListUI',
  component: SkillsListUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент для отображения навыков пользователя в двух секциях',
      },
    },
  },
  argTypes: {
    teachingSkill: {
      description: 'Навык, которому пользователь может научить',
      control: 'object',
    },
    learningSkills: {
      description: 'Навыки, которым пользователь хочет научиться',
      control: 'object',
    },
  },
} satisfies Meta<typeof SkillsListUI>;

export default meta;

type Story = StoryObj<typeof SkillsListUI>;

// Моки для тестирования
const teachingSkillMock: ISkillTagUIProps = { 
  title: 'Английский язык', 
  variant: 'languages' 
};

const learningSkillsMock: ISkillTagUIProps[] = [
  { title: 'Тайм Менеджмент', variant: 'education' },
  { title: 'Медитация', variant: 'health' },
  { title: 'Игра на барабанах', variant: 'art' },
  { title: 'Бизнес-план', variant: 'business' },
];

const singleLearningSkillMock: ISkillTagUIProps[] = [
  { title: 'Медитация', variant: 'health' },
];

// Основная история с множеством навыков
export const ManySkills: Story = {
  render: (args) =>
    createElement(
      'div',
      {
        style: { width: 320, padding: 20 },
      },
      createElement(SkillsListUI, args),
    ),
  args: {
    teachingSkill: teachingSkillMock,
    learningSkills: learningSkillsMock,
  },
};

// История с одним навыком в каждой секции
export const SingleSkill: Story = {
  render: (args) =>
    createElement(
      'div',
      {
        style: { width: 320, padding: 20 },
      },
      createElement(SkillsListUI, args),
    ),
  args: {
    teachingSkill: teachingSkillMock,
    learningSkills: singleLearningSkillMock,
  },
};