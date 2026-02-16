import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckboxGroupUI } from '../CityGroupUI/CityGroupUI';

const meta: Meta<typeof CheckboxGroupUI> = {
  title: 'Main/UI/CheckboxGroupUI',
  component: CheckboxGroupUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroupUI>;

const citiesMock = [
  { id: 'moscow', label: 'Москва' },
  { id: 'spb', label: 'Санкт-Петербург' },
  { id: 'kazan', label: 'Казань' },
  { id: 'sochi', label: 'Сочи' },
  { id: 'ekb', label: 'Екатеринбург' },
  { id: 'novosib', label: 'Новосибирск' },
  { id: 'samara', label: 'Самара' },
  { id: 'rostov', label: 'Ростов-на-Дону' },
  { id: 'ufa', label: 'Уфа' },
  { id: 'perm', label: 'Пермь' },
];

export const Default: Story = {
  render: () => {
    const [selectedCities, setSelectedCities] = useState<string[]>([]);

    const handleCityToggle = (id: string) => {
      setSelectedCities((prev) =>
        prev.includes(id)
          ? prev.filter((cityId) => cityId !== id)
          : [...prev, id],
      );
    };

    return (
      <CheckboxGroupUI
        title="Город"
        items={citiesMock}
        selectedItems={selectedCities}
        onItemToggle={handleCityToggle}
      />
    );
  },
};
