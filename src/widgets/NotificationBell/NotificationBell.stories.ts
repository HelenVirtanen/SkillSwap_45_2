import type { Meta, StoryObj } from '@storybook/react-vite';

import NotificationBell from './NotificationBell.tsx';
import { fn } from 'storybook/test';

const meta = {
  title: 'Main/Widgets/NotificationBell',
  component: NotificationBell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoNotification: Story = {
  args: {
    hasNewNotifications: false,
  },
};

export const HasNotification: Story = {
  args: {
    hasNewNotifications: true,
  },
};

