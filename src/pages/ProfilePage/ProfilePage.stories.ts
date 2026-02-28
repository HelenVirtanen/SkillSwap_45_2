import type { Meta, StoryObj } from '@storybook/react-vite';

import ProfilePage from './ProfilePage';

const meta = {
  title: 'Main/Pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
