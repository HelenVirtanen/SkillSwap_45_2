import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import SearchInputUI from './SearchInputUI.tsx';

const meta = {
  title: 'Main/UI/SearchInput',
  component: SearchInputUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { placeholder: 'Искать навык', onClear: fn(), onChange: fn() },
} satisfies Meta<typeof SearchInputUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPlaceholder: Story = {};
