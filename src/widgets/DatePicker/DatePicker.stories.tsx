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
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '208px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Дата рождения',
    language: 'ru',
    placeholder: 'дд.мм.гггг',
  },
};