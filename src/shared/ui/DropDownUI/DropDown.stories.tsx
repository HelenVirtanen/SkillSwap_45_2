import type { Meta, StoryObj } from '@storybook/react-vite';
import DropDownUI from './DropDownUI';

const meta = {
  title: 'Main/UI/DropDownUI',
  component: DropDownUI,
  parameters: {
    layout: 'centered',
  },
  args: {
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Пол',
    options: ['Не указан', 'Мужской', 'Женский'],
  },
};

export const WithSelectedValue: Story = {
  args: {
    title: 'Пол',
    options: ['Не указан', 'Мужской', 'Женский'],
    value: 'Женский',
  },
};

