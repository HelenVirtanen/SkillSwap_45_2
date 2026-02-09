import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import ActionButtons from './ActionButtons';

const meta = {
  title: 'Main/Widgets/ActionButtons',
  component: ActionButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isFavorite: false,
    onFavoriteClick: fn(),
    onShareClick: fn(),
    onMoreClick: fn(),
  },
} satisfies Meta<typeof ActionButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FavoriteActive: Story = {
  args: {
    isFavorite: true,
  },
};
