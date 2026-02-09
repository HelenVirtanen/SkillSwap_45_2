import type { Meta, StoryObj } from '@storybook/react-vite';

import HeaderAuth from './HeaderAuth';

const meta = {
  title: 'Main/HeaderAuth',
  component: HeaderAuth,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderAuth>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
