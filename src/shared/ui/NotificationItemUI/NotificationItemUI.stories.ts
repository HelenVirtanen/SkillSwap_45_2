import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import NotificationItemUI from './NotificationItemUI.tsx';

const meta = {
  title: 'Main/UI/NotificationItem',
  component: NotificationItemUI,
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: fn(),
    mainText: 'Николай принял ваш обмен',
    subText: 'Перейдите в профиль, чтобы обсудить детали',
    date: 'сегодня',
    disabled: false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationItemUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
  },
};

export const CustomTexts: Story = {
  args: {
    mainText: 'Мария отправила вам сообщение',
    subText: 'Откройте чат, чтобы прочитать сообщение',
    date: 'вчера',
    disabled: false,
  },
};
