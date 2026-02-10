import React, { useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import CalendarIcon from '../../assets/icons/calendar.svg?react';

interface DatePickerProps {
  placeholder?: string;
  language?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  placeholder,
  language = 'ru',
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<ReactDatePicker>(null);

  const formatWeekDay = (nameOfDay: string) => {
    const short = nameOfDay.slice(0, 2);
    return short.charAt(0).toUpperCase() + short.charAt(1).toLowerCase();
  };

  const handleCancel = () => {
    setTempDate(startDate);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setStartDate(tempDate);
    setIsOpen(false);
  };

  return (
    <ReactDatePicker
      placeholderText={placeholder}
      selected={tempDate}
      onChange={(date) => setTempDate(date)}
      open={isOpen}
      onInputClick={() => setIsOpen(true)}
      onClickOutside={() => setIsOpen(false)}
      locale={language}
      // formatWeekDay={formatWeekDay}
      showIcon
      icon={<CalendarIcon />}
      toggleCalendarOnIconClick
      shouldCloseOnSelect={false}
      showMonthDropdown
      showYearDropdown
      showPopperArrow={false}
      dropdownMode="select"
      peekNextMonth={false}
      calendarStartDay={1}
      calendarClassName={styles.calendar}
      wrapperClassName={styles.wrapper}
      className={styles.input}
      ref={datePickerRef}
      popperPlacement="bottom-start"
    >
      {/* Кнопки внутри календаря через children */}
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={handleCancel}
        >
          Отменить
        </button>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={handleConfirm}
        >
          Выбрать
        </button>
      </div>
    </ReactDatePicker>
  );
};

export default DatePicker;
