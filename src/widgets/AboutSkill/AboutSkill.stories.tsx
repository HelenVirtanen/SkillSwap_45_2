import type { Meta, StoryObj } from '@storybook/react-vite';
import { AboutSkill } from './AboutSkill';

const meta: Meta<typeof AboutSkill> = {
  title: 'Widgets/AboutSkill',
  component: AboutSkill,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AboutSkill>;
export const Default: Story = {
    render: (args) => (
    <div style={{ width: 399 }}>
      <AboutSkill {...args} />
    </div>
  ),
  args: {
    title: 'Игра на барабанах',
    category: 'Творчество и искусство',
    subcategory: 'Музыка и звук',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    buttonText: 'Предложить обмен',
    onButtonClick: () => {
      console.log('click');
    },
  },
};
