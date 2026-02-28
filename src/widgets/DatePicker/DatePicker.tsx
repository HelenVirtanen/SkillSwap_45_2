import React, { useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import DropDownUI from '@shared/ui/DropDownUI/DropDownUI';
import ButtonUI from '@shared/ui/ButtonUI/ButtonUI';

registerLocale('ru', ru);

const MONTHS_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface DatePickerProps {
  title?: string;
  placeholder?: string;
  language?: string;
  classNameInput?: string;
  classNameCalendar?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  placeholder,
  language = 'ru',
  classNameInput,
  classNameCalendar,
  selected,
  onChange,
}) => {
  const [tempDate, setTempDate] = useState<Date | null>(selected || null);
  const [isOpen, setIsOpen] = useState(false);

  const handleIconClick = () => {
    setTempDate(selected || null);
    setIsOpen(true);
  };

  const handleChange = (date: Date | null) => {
    if (isOpen) {
      // изменение внутри открытого календаря (клик по дню)
      setTempDate(date);
    } else {
      // ручной ввод — сразу подтверждаем
      onChange?.(date);
      setTempDate(date);
    }
  };

  const handleConfirm = () => {
    onChange?.(tempDate);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 11 }, (_, i) =>
    String(1900 + i)
  );

  return (
    <div className={styles.flex}>
      {title && <h4 className={`${styles.text} ${styles.title}`}>{title}</h4>}
      <ReactDatePicker
        placeholderText={placeholder}
        selected={selected}
        onChange={handleChange}
        open={isOpen}
        onClickOutside={handleClickOutside}
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
              type="secondary"
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
              type="secondary"
              onChange={(value) => {
                changeYear(Number(value));
              }}
            />
          </div>
        )}
      >
        <div className={styles.buttonContainer}>
          <ButtonUI
            variant="secondary"
            title={language === 'ru' ? 'Отменить' : 'Cancel'}
            onClick={handleCancel}
            className={styles.cancelButton}
          />
          <ButtonUI
            variant="primary"
            title={language === 'ru' ? 'Выбрать' : 'Select'}
            onClick={handleConfirm}
          />
        </div>
      </ReactDatePicker>
    </div>
  );
};

export default DatePicker;