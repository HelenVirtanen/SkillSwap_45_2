import React, { useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI.tsx';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI.tsx';

registerLocale('ru', ru);

const MONTHS_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface DatePickerProps {
  placeholder?: string;
  language?: string;
  classNameInput?: string;
  classNameCalendar?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder,
  language = 'ru',
  classNameInput,
  classNameCalendar,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<ReactDatePicker>(null);

  const handleCancel = () => {
    setTempDate(startDate);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setStartDate(tempDate);
    setIsOpen(false);
  };

  const handleIconClick = () => {
    setTempDate(startDate);
    setIsOpen(true);
  };

  const handleChange = (date: Date | null) => {
    if (isOpen) {
      setTempDate(date);
    } else {
      setStartDate(date);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 11 }, (_, i) =>
    String(1900 + i),
  );

  return (
    <ReactDatePicker
      placeholderText={placeholder}
      selected={startDate}
      onChange={handleChange}
      open={isOpen}
      onClickOutside={() => setIsOpen(false)}
      locale={language}
      showIcon
      icon={
        <div onClick={handleIconClick} style={{ cursor: 'pointer' }}>
          <CalendarIcon />
        </div>
      }
      toggleCalendarOnIconClick={false}
      shouldCloseOnSelect={false}
      showPopperArrow={false}
      dropdownMode="select"
      peekNextMonth={false}
      calendarStartDay={1}
      calendarClassName={classNameCalendar}
      className={classNameInput}
      ref={datePickerRef}
      popperPlacement="bottom-start"
      highlightDates={tempDate ? [tempDate] : []}
      dateFormat="dd.MM.yyyy"
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div className={styles.dropdownsContainer}>
          <DropDownUI
            title=""
            value={
              language === 'ru'
                ? MONTHS_RU[date.getMonth()]
                : MONTHS_EN[date.getMonth()]
            }
            options={language === 'ru' ? MONTHS_RU : MONTHS_EN}
            widthDepOnContent={false}
            type={'secondary'}
            onChange={(value) => {
              const monthIndex = MONTHS_RU.indexOf(value);
              changeMonth(monthIndex);
            }}
          />
          <DropDownUI
            title=""
            value={String(date.getFullYear())}
            options={years}
            widthDepOnContent={false}
            type={'secondary'}
            onChange={(value) => {
              changeYear(Number(value));
            }}
          />
        </div>
      )}
    >
      {/* Кнопки внутри календаря через children */}
      <div className={styles.buttonContainer}>
        <ButtonUI
          variant={'secondary'}
          title={language === 'ru' ? 'Отменить' : 'Cancel'}
          onClick={handleCancel}
          className={styles.cancelButton}
        />
        <ButtonUI
          variant={'primary'}
          title={language === 'ru' ? 'Выбрать' : 'Select'}
          onClick={handleConfirm}
        />
      </div>
    </ReactDatePicker>
  );
};

export default DatePicker;
