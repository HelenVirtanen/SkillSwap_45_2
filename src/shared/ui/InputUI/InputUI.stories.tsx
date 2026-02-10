import type { Meta, StoryObj } from '@storybook/react-vite';
import InputUI from './InputUI';
import React from 'react';

// Метаданные компонента
const meta: Meta<typeof InputUI> = {
  title: 'Components/InputUI',
  component: InputUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст метки поля ввода',
    },
    value: {
      control: 'text',
      description: 'Значение поля ввода',
    },
    onChange: {
      action: 'changed',
      description: 'Обработчик изменения значения',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика по полю',
    },
    onBlur: {
      action: 'blurred',
      description: 'Обработчик потери фокуса',
    },
    onFocus: {
      action: 'focused',
      description: 'Обработчик получения фокуса',
    },
    onKeyDown: {
      action: 'keydown',
      description: 'Обработчик нажатия клавиши',
    },
    error: {
      control: { type: 'text' },
      description: 'Текст ошибки или булево значение',
    },
    helperText: {
      control: 'text',
      description: 'Вспомогательный текст',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'textarea'],
      description: 'Тип поля ввода',
    },
    placeholder: {
      control: 'text',
      description: 'Текст placeholder',
    },
    name: {
      control: 'text',
      description: 'Имя поля для формы',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключено ли поле',
    },
    autoComplete: {
      control: 'text',
      description: 'Автозаполнение поля',
    },
    rows: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Количество строк для textarea',
    },
    className: {
      control: 'text',
      description: 'Дополнительные CSS классы',
    },
    rightAddon: {
      control: 'text',
      description: 'Дополнительный элемент справа от поля',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputUI>;

// Базовая история
export const Default: Story = {
  args: {
    label: 'Имя пользователя',
    placeholder: 'Введите ваше имя',
    type: 'text',
    onChange: () => {},
  },
};

// Поле с значением
export const WithValue: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    type: 'email',
    placeholder: 'Введите ваш email',
    onChange: () => {},
  },
};

// Поле с паролем
export const Password: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    onChange: () => {},
  },
};

// Поле с ошибкой
export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Введите корректный email адрес',
    type: 'email',
    placeholder: 'Введите ваш email',
    onChange: () => {},
  },
};

// Поле с булевой ошибкой
export const WithBooleanError: Story = {
  args: {
    label: 'Обязательное поле',
    error: true,
    placeholder: 'Это поле обязательно для заполнения',
    onChange: () => {},
  },
};

// Поле с вспомогательным текстом
export const WithHelperText: Story = {
  args: {
    label: 'Номер телефона',
    helperText: 'Введите номер в формате +7 (XXX) XXX-XX-XX',
    placeholder: '+7 (___) ___-__-__',
    type: 'tel',
    onChange: () => {},
  },
};

// Отключенное поле
export const Disabled: Story = {
  args: {
    label: 'Отключенное поле',
    value: 'Нельзя изменить',
    disabled: true,
    placeholder: 'Это поле отключено',
    onChange: () => {},
  },
};

// Textarea
export const Textarea: Story = {
  args: {
    label: 'Комментарий',
    type: 'textarea',
    placeholder: 'Введите ваш комментарий...',
    rows: 4,
    onChange: () => {},
  },
};

// Textarea с большим количеством строк
export const TextareaLarge: Story = {
  args: {
    label: 'Большой текст',
    type: 'textarea',
    placeholder: 'Введите много текста...',
    rows: 8,
    value: 'Это пример длинного текста, который занимает несколько строк в textarea.',
    onChange: () => {},
  },
};

// Поле с правым дополнением
export const WithRightAddon: Story = {
  args: {
    label: 'Сумма',
    placeholder: '0.00',
    type: 'number',
    rightAddon: '₽',
    onChange: () => {},
  },
};

// Комбинация всех состояний
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <InputUI
        label="Обычное поле"
        placeholder="Введите текст"
        onChange={() => {}}
      />
      <InputUI
        label="Поле с ошибкой"
        placeholder="Введите email"
        error="Некорректный email"
        onChange={() => {}}
      />
      <InputUI
        label="Поле с подсказкой"
        placeholder="Введите пароль"
        helperText="Минимум 8 символов"
        type="password"
        onChange={() => {}}
      />
      <InputUI
        label="Отключенное поле"
        value="Неактивно"
        disabled
        onChange={() => {}}
      />
      <InputUI
        label="Textarea"
        type="textarea"
        placeholder="Введите много текста..."
        rows={4}
        onChange={() => {}}
      />
    </div>
  ),
};

// История с контролем состояния
export const ControlledInput: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <InputUI
          label="Контролируемое поле"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите текст..."
          helperText={`Длина: ${value.length} символов`}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Текущее значение: <strong>{value || '(пусто)'}</strong>
        </div>
      </div>
    );
  },
};

// История с валидацией
export const WithValidation: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState<string | boolean>(false);
    
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      
      if (newValue && !validateEmail(newValue)) {
        setError('Введите корректный email адрес');
      } else {
        setError(false);
      }
    };
    
    const handleBlur = () => {
      if (value && !validateEmail(value)) {
        setError('Введите корректный email адрес');
      }
    };
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <InputUI
          label="Email с валидацией"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="user@example.com"
          type="email"
          error={error}
          helperText={!error ? 'Введите ваш email' : undefined}
        />
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Статус: {error ? '❌ Ошибка' : value ? '✅ Корректный email' : '⏳ Ожидание ввода'}
        </div>
      </div>
    );
  },
};