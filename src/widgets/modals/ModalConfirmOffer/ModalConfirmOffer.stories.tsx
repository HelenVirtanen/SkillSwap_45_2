import type { Meta, StoryObj } from '@storybook/react';
import { ModalConfirmOffer } from './ModalConfirmOffer';

import image1 from '@assets/image for test/image.jpg';
import image2 from '@assets/image for test/Image (1).png';
import image3 from '@assets/image for test/Image (2).png';
import image4 from '@assets/image for test/3aaa87619f4111f05c60657e37b8861a7166ae17.jpg';

const meta: Meta<typeof ModalConfirmOffer> = {
  title: 'Main/Widgets/Modals/ModalConfirmOffer',
  component: ModalConfirmOffer,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ModalConfirmOffer>;

export const Default: Story = {
  args: {
    title: 'Ваше предложение',
    description: 'Пожалуйста, проверьте и подтвердите правильность данных',

    aboutSkillProps: {
      title: 'Игра на барабанах',
      category: 'Творчество и искусство',
      subcategory: 'Музыка и звук',
      description:
        'Привет! Я играю на барабанах уже больше 10 лет           —от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    },

    galleryProps: {
      images: [image1, image2, image3, image4],
    },

    onEdit: () => console.log('Редактировать'),
    onConfirm: () => console.log('Готово'),
  },
};
