import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalCreateOffer } from './ModalCreateOffer';

const meta: Meta<typeof ModalCreateOffer> = {
  title: 'Main/Widgets/Modals/ModalCreateOffer',
  component: ModalCreateOffer,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ModalCreateOffer>;

/* Первое окно: Ваше предложение создано с человечком (420px) */
export const Created: Story = {
  args: {
    variant: 'created',
    onSubmit: () => {
      console.log('Created modal: "Готово" clicked');
    },
  },
};

/* Второе окно: Вы предложили обмен (480px) */
export const Sent: Story = {
  args: {
    variant: 'sent',
    onSubmit: () => {
      console.log('Sent modal: "Готово" clicked');
    },
  },
};

/* Третье окно: Предложение создано done (420px) */
export const Accepted: Story = {
  args: {
    variant: 'accepted',
    onSubmit: () => {
      console.log('Accepted modal: "Готово" clicked');
    },
  },
};
