import type { Meta, StoryObj } from '@storybook/react-vite';

// import { fn } from 'storybook/test';
import DatePicker from '@widgets/DatePicker/DatePicker.tsx';

const meta = {
  title: 'Main/Widgets/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // args: { placeholder: 'дд.мм.гггг' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRu: Story = {
  args: {
    language: 'ru',
    placeholder: 'дд.мм.гггг',
  },
};

export const DefaultEn: Story = {
  args: {
    language: 'en',
    placeholder: 'dd.mm.yyyy',
  },
};
