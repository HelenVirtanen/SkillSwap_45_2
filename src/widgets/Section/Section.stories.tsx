import { Meta, StoryFn } from '@storybook/react';
import Section, { SectionProps } from '../Section/Section';
import {IUserCardData} from '@widgets/UserCardsGroup/UserCardsGroup';


const usersData: IUserCardData[] = [
  {
    id: '1',
    avatar: '../src/assets/avatars/ivan.png',
    name: 'Иван',
    birthDate: '1992-07-15',
    city: 'Санкт-Петербург',
    teachingSkill: { title: 'Игра на барабанах', variant: 'art' },
    learningSkills: [
      { title: 'Тайм-менеджмент', variant: 'business' },
      { title: 'Медитация', variant: 'health' },
      { title: 'Личный бренд', variant: 'business' },
      { title: 'Личный бренд', variant: 'business' },
    ],
    isFavorite: true,
  },
  {
    id: '6',
    avatar: '../src/assets/avatars/anna.png',
    name: 'Анна',
    birthDate: '1992-07-15',
    city: 'Казань',
    teachingSkill: { title: 'Английский язык', variant: 'art' },
    learningSkills: [
      { title: 'Тайм-менеджмент', variant: 'business' },
      { title: 'Медитация', variant: 'health' },
      { title: 'Личный бренд', variant: 'business' },
      { title: 'Личный бренд', variant: 'business' },
    ],
    isFavorite: true,
  },
  {
    id: '5',
    avatar: '../src/assets/avatars/maksim.png',
    name: 'Максим',
    birthDate: '1992-07-15',
    city: 'Москва',
    teachingSkill: { title: 'Бизнесс-план', variant: 'art' },
    learningSkills: [
      { title: 'Тайм-менеджмент', variant: 'business' },
      { title: 'Медитация', variant: 'health' },
      { title: 'Личный бренд', variant: 'business' },
      { title: 'Личный бренд', variant: 'business' },
    ],
    isFavorite: true,
  },   
];

export default {
  title: 'Widgets/Section',
  component: Section,
  argTypes: {
    onShowAll: { action: 'Смотреть все' },
  },
} as Meta;

const Template: StoryFn<SectionProps> = (args) => <Section {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Популярное',
  users: usersData,
  onShowAll: () => alert('Смотреть все'),
};

export const EmptyUsers = Template.bind({});
EmptyUsers.args = {
  title: 'Нет пользователей',
  users: [],
  onShowAll: () => alert('Смотреть все'),
};