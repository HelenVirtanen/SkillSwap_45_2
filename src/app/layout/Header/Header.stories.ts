import type { Meta, StoryObj } from '@storybook/react-vite';

import Header from './Header.tsx';


const meta = {
  title: 'Main/Header',
  component: Header,
  tags: ['autodocs']
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};
