import type { Meta, StoryObj } from '@storybook/react-vite';

import MainHeader from './MainHeader.tsx';


const meta = {
  title: 'Main/Header',
  component: MainHeader,
  tags: ['autodocs']
} satisfies Meta<typeof MainHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};
