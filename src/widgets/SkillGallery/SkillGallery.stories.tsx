import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillGallery } from './SkillGallery';
import image1 from '@assets/image for test/image.jpg';
import image2 from '@assets/image for test/Image (1).png';
import image3 from '@assets/image for test/Image (2).png';
import image4 from '@assets/image for test/3aaa87619f4111f05c60657e37b8861a7166ae17.jpg';
import image5 from '@assets/image for test/Image (Копия 2).png';
import image6 from '@assets/image for test/Image (Копия).png';

const meta: Meta<typeof SkillGallery> = {
  title: 'Main/Widgets/SkillGallery',
  component: SkillGallery,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SkillGallery>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 440, padding: '40px' }}>
      <SkillGallery {...args} />
    </div>
  ),
  args: {
    images: [image1, image2, image3, image4, image5, image6],
  },
};
