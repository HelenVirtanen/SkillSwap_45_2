import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ModalWrapperUI } from './ModalWrapperUI.tsx';

const meta = {
  title: 'Main/UI/ModalWrapper',
  component: ModalWrapperUI,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalWrapperUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MediumSize: Story = {
  args: {
    isOpen: true,
    size: 'md',
    children: (
      <div style={{ padding: '20px' }}>
        <h2>Модалка MD</h2>
        <p>Средний размер модалки (556px).</p>
      </div>
    ),
    onClose: fn(),
  },
};

export const LargeSize: Story = {
  args: {
    isOpen: true,
    size: 'lg',
    children: (
      <div style={{ padding: '20px' }}>
        <h2>Модалка LG</h2>
        <p>Большой размер модалки (1024px).</p>
      </div>
    ),
    onClose: fn(),
  },
};
