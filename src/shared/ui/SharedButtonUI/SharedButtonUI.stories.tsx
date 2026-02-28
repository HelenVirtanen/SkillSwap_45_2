import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import SharedButtonUI from './SharedButtonUI';

const meta = {
  title: 'Main/UI/SharedButton',
  component: SharedButtonUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof SharedButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
