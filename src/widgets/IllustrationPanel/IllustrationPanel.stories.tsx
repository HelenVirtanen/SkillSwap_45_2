import type { Meta, StoryObj } from '@storybook/react';
import { IllustrationPanel } from './IllustrationPanel';

import LoginImage from '@assets/illustrations/light-bulb.svg?react';
import ProfileImage from '@assets/illustrations/user-info.svg?react';
import SkillImage from '@assets/illustrations/school-board.svg?react';

const meta: Meta<typeof IllustrationPanel> = {
  title: 'Widgets/IllustrationPanel',
  component: IllustrationPanel,
};

export default meta;

type Story = StoryObj<typeof IllustrationPanel>;

export const Login: Story = {
  args: {
    image: <LoginImage />,
    title: 'С возвращением в SkillSwap!',
    description:
      'Обменивайтесь знаниями и навыками с другими людьми',
  },
};

export const Profile: Story = {
  args: {
    image: <ProfileImage />,
    title: 'Расскажите немного о себе',
    description:
      'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
  },
};

export const Skill: Story = {
  args: {
    image: <SkillImage />,
    title: 'Укажите, чем вы готовы поделиться',
    description:
      'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
  },
};