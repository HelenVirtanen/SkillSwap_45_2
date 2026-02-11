import type { Meta, StoryObj } from '@storybook/react-vite';

import Stepper from './Stepper.tsx';

const meta = {
  title: 'Main/widgets/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    currentStep: 1,
  },
};

export const Second: Story = {
  args: {
    currentStep: 2,
  },
};

export const Third: Story = {
  args: {
    currentStep: 3,
  },
};

export const InvalidStep: Story = {
  args: {
    currentStep: 4,
    totalSteps: -5,
  },
};
