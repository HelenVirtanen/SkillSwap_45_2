import type { Meta, StoryObj } from '@storybook/react-vite';
import NotificationsPanel from './NotificationsPanel';

const meta: Meta<typeof NotificationsPanel> = {
  title: 'Main/Widgets/NotificationsPanel',
  component: NotificationsPanel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof NotificationsPanel>;

export const Default: Story = {};

export const WithManyNotifications: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Вариант отображения с большим количеством уведомлений для проверки прокрутки и визуальной нагрузки.',
      },
    },
  },
};
