import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { UserMenuUI } from './UserMenuUI';

const meta: Meta<typeof UserMenuUI> = {
  title: 'Main/UI/UserMenuUI',
  component: UserMenuUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onProfileClick: fn(),
    onLogoutClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof UserMenuUI>;

export const Default: Story = {};
