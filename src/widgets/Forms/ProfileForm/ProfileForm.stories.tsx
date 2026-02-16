import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import ProfileForm, { ProfileFormData } from './ProrileForm';

import { useEffect } from 'react';

const meta = {
  title: 'Main/Widgets/Forms/ProfileForm',
  component: ProfileForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Форма редактирования профиля пользователя',
      },
    },
  },
  argTypes: {
    cities: {
      description: 'Список доступных городов',
      control: 'object',
    },
    onSubmit: { action: 'submitted' },
    onChangePassword: { action: 'change password clicked' },
  },
} satisfies Meta<typeof ProfileForm>;

export default meta;

type Story = StoryObj<typeof ProfileForm>;

// Моковые данные
const mockCities = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Новосибирск',
  'Екатеринбург',
];

// Заполненная форма
export const Filled: Story = {
  render: () => {
    const form = useForm<ProfileFormData>({
      defaultValues: {
        email: 'ivan.ivanov@example.com',
        name: 'Иван Иванов',
        birthDate: '1990-02-02T00:00:00', // Формат с временем для стабильности
        gender: 'Мужской',
        city: 'Санкт-Петербург',
        about: 'Люблю путешествовать и изучать новые языки. Бла бла бла...',
      },
    });

    // Принудительно применяем defaultValues после монтирования
    useEffect(() => {
      form.reset(form.formState.defaultValues);
    }, [form]);

    return (
      <div style={{ width: 460, padding: '20px' }}>
        <ProfileForm
          form={form}
          cities={mockCities}
          onSubmit={() => console.log('onSubmit')}
          onChangePassword={() => console.log('onChangePassword')}
        />
      </div>
    );
  },
};

// Пустая форма
export const Empty: Story = {
  render: () => {
    const form = useForm<ProfileFormData>({
      defaultValues: {
        email: '',
        name: '',
        birthDate: null,
        gender: null,
        city: null,
        about: undefined,
      },
    });

    return (
      <div style={{ width: 460, padding: '20px' }}>
        <ProfileForm
          form={form}
          cities={mockCities}
          onSubmit={() => console.log('onSubmit')}
          onChangePassword={() => console.log('onChangePassword')}
        />
      </div>
    );
  },
};
