import type { Meta, StoryObj } from '@storybook/react-vite';

import HeaderMain from './HeaderMain';


const meta = {
  title: 'Main/Layout/HeaderMain',
  component: HeaderMain,
  tags: ['autodocs']
} satisfies Meta<typeof HeaderMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};
