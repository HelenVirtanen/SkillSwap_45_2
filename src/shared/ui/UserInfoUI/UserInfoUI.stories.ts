import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import UserInfoUI from './UserInfoUI';

const meta = {
  title: 'Main/UI/UserInfoUI',
  component: UserInfoUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    avatar: 'src/assets/avatars/ivan.png',
    name: 'Иван',
    birthDate: '1991-10-01',
    city: 'Санкт-Петербург',
    isFavorite: false,
    onFavoriteToggle: fn(),
  },
} satisfies Meta<typeof UserInfoUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Favorited: Story = {
  args: {
    avatar: 'src/assets/avatars/ivan.png',
    name: 'Иван',
    birthDate: '1991-10-01',
    city: 'Санкт-Петербург',
    isFavorite: true,
  },
};
