import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import MoreButtonUI from './MoreButtonUI';

const meta = {
  title: 'Main/UI/MoreButton',
  component: MoreButtonUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof MoreButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
