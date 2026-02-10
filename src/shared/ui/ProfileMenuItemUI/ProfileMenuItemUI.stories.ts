import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import ProfileMenuItemUI from './ProfileMenuItemUI';
import UserIcon from '../../../assets/icons/user.svg?react';

const meta = {
  title: 'Main/UI/ProfileMenuItem',
  component: ProfileMenuItemUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Личные данные',
    route: '/',
    Icon: React.createElement(UserIcon),
  },
} satisfies Meta<typeof ProfileMenuItemUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
