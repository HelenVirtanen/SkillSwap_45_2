import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MultiSelectDropdownUI } from './MultiSelectDropdownUI';

const meta: Meta<typeof MultiSelectDropdownUI> = {
  title: 'Main/UI/MultiSelectDropdownUI',
  component: MultiSelectDropdownUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelectDropdownUI>;

// Данные для тестирования
const options = [
  { id: 1, label: 'Бизнес и карьера', value: 'бизнес и карьера' },
  { id: 2, label: 'Творчество и искусство', value: 'творчество и искусство' },
  { id: 3, label: 'Иностранные языки', value: 'иностранные языки' },
  { id: 4, label: 'Здоровье и лайфстайл', value: 'здоровье и лайфстайл' },
  { id: 5, label: 'Дом и уют', value: 'дом и уют' },
];

// Обёртка для управления состоянием
const MultiSelectDropdownWrapper = (args: any) => {
  const [selected, setSelected] = useState<string[]>(args.selected || []);

  return (
    <div style={{ width: '320px', padding: '20px' }}>
      <MultiSelectDropdownUI
        {...args}
        options={args.options}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
};

// Базовый вариант
export const Default: Story = {
  render: (args) => <MultiSelectDropdownWrapper {...args} />,
  args: {
    options,
    placeholder: 'Выберите категорию',
    label: 'Категория навыка, которому хотите научиться',
  },
};

// С выбранными значениями
export const WithSelectedValues: Story = {
  render: (args) => <MultiSelectDropdownWrapper {...args} />,
  args: {
    options,
    selected: ['бизнес и карьера', 'творчество и искусство'],
    placeholder: 'Выберите категорию',
    label: 'Категория навыка, которому хотите научиться',
  },
};

// С ошибкой
export const WithError: Story = {
  render: (args) => <MultiSelectDropdownWrapper {...args} />,
  args: {
    options,
    placeholder: 'Выберите категорию',
    label: 'Категория навыка, которому хотите научиться',
    error: 'Пожалуйста, выберите хотя бы одну категорию',
  },
};

// Отключённый
export const Disabled: Story = {
  render: (args) => <MultiSelectDropdownWrapper {...args} />,
  args: {
    options,
    selected: ['Дом и уют'],
    placeholder: 'Выберите категорию',
    label: 'Категория навыка, которому хотите научиться',
    disabled: true,
  },
};