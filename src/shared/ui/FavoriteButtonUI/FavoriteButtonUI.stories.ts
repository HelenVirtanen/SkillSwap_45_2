import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import FavoriteButtonUI from './FavoriteButtonUI.tsx';

const meta = {
  title: 'Main/UI/FavoriteButton',
  component: FavoriteButtonUI,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FavoriteButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoActive: Story = {
  args: {
    isActive: false,
  },
};

export const IsActive: Story = {
  args: {
    isActive: true,
  },
};