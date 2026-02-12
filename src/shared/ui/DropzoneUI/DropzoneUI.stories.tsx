import type { Meta, StoryObj } from '@storybook/react';
import { DropzoneUI } from './DropzoneUI';

const meta: Meta<typeof DropzoneUI> = {
  title: 'Main/UI/DropzoneUI',
  component: DropzoneUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DropzoneUI>;

export const Default: Story = {};
