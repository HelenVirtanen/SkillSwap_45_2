import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import ButtonUI from './ButtonUI.tsx';
import styles from './ButtonUI.module.css';

const meta = {
  title: 'Main/UI/Button',
  component: ButtonUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn(), disabled: false, type: 'button', title: 'Button' },
} satisfies Meta<typeof ButtonUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    className: `${styles.button} ${styles.primary}`,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    className: `${styles.button} ${styles.secondary}`,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    className: `${styles.button} ${styles.tertiary}`,
  },
};

export const Social: Story = {
  args: {
    variant: 'social',
    className: `${styles.button} ${styles.social}`,
  },
};

export const Submit: Story = {
  args: {
    variant: 'submit',
    className: `${styles.button} ${styles.submit}`,
  },
};

export const Simple: Story = {
  args: {
    variant: 'simple',
    className: `${styles.button} ${styles.simple}`,
  },
};
