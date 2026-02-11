import type { Meta, StoryObj } from '@storybook/react-vite';

import ProfileSidebar from './ProfileSidebar';

const meta: Meta<typeof ProfileSidebar> = {
  title: 'Main/Widgets/ProfileSidebar',
  component: ProfileSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProfileSidebar>;

export const Default: Story = {};
