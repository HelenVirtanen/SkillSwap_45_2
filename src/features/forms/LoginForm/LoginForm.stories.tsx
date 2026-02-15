import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Main/Features/Forms/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};

export const WithValidationError: Story = {
  render: () => {
    return <LoginForm />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByText('Войти');
    await userEvent.click(button);
  },
};
