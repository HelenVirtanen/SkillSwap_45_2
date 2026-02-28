import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionPanel } from './SectionPanel';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';
import './SectionPanel.module.css';
import IconChevronRight from '@assets/icons/chevron-right.svg?react';

const meta: Meta<typeof SectionPanel> = {
  title: 'Main/Widgets/SectionPanel',
  component: SectionPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '1020px' }}>
      <SectionPanel {...args} />
    </div>
  ),
  args: {
    children: 'Популярное',
    actions: (
      <div style={{width: 'auto'}}>
        <ButtonUI
        variant="tertiary"
        title="Смотреть все"
        onClick={() => {}}
        iconRight={<IconChevronRight />}
      />
      </div>
      
    ),
  },
};
