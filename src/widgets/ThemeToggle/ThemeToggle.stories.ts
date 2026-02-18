import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import ThemeToggle from './ThemeToggle.tsx';

const meta = {
  title: 'Main/Widgets/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoDark: Story = {
  args: {
    isLight: false,
  },
};

export const IsDark: Story = {
  args: {
    isLight: true,
  },
};
