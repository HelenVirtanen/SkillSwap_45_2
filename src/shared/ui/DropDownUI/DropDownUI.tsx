import chevronUp from "@assets/icons/chevron-up.svg"
import { useEffect, useRef, useState } from "react";
import styles from './DropDown.module.css'

type SelectProps = {
  title: string;
  value?: string | undefined;
  widthDepOnContent?: boolean;
  options?: string[];
  type?: 'primary' | 'secondary';
  onChange?: (value: string) => void;
};

const DropDownUI = (
  props: SelectProps
) => {
  const { title, value, widthDepOnContent = true, options, type = 'primary', onChange } = props;

  const [isOpen, setIsOpen] = useState(false)
  const [selected,setSelected] = useState(value)
  const [minWidth, setMinWidth] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  function buttonToggle (){
    setIsOpen(!isOpen)
  }

  function handleSelect (value:string) {
    onChange?.(value)
    setSelected(value)
    setIsOpen(false)
  }

  useEffect(() => {
    if (measureRef.current && options) {
      const maxWidth = Math.max(
        ...Array.from(measureRef.current.children).map(
          (child) => (child as HTMLElement).offsetWidth,
        ),
      );
      setMinWidth(maxWidth + 40 + 20 + 24); // padding(40) + gap(10) + icon(~24)
    }
  }, [options]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
    return (
      <div ref={ref} className={`${styles.dropDownContainer}`}>
        {/* Скрытый элемент для измерения ширины */}
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
          className={styles.text}
        >
          {options?.map((option) => (
            <span key={option} style={{ padding: '0 20px' }}>
              {option}
            </span>
          ))}
        </div>

        {title && (
          <>
            <h4 className={`${styles.text} ${styles.title}`}>{title}</h4>
          </>
        )}
        <button
          type="button"
          aria-label="Открыть список"
          className={`${
            type === 'primary'
              ? `${styles.buttonWithIcon} ${isOpen ? styles.buttonWithIconIsOpen : ''}`
              : styles.buttonWithIconSecondary
          }`}
          onClick={buttonToggle}
          style={
            widthDepOnContent
              ? { minWidth: minWidth > 0 ? `${minWidth}px` : 'auto' }
              : undefined
          }
        >
          <span
            className={`${styles.textInButtonWithIcon} ${selected ? '' : styles.placeholder} ${styles.text}`}
          >
            {selected ? selected : options?.[0]}
          </span>
          <img
            src={chevronUp}
            alt={isOpen ? 'Закрыть список' : 'Открыть список'}
            className={isOpen ? styles.arrow : styles.arrowOpen}
          />
        </button>
        {isOpen && (
          <ul
            className={
              type === 'primary'
                ? styles.dropDownList
                : styles.dropDownListSecondary
            }
          >
            {options?.map((value) => {
              if (selected == value) {
                return (
                  <li
                    className={`${styles.dropDownItem} ${styles.dropDownItemSelected} ${styles.text}`}
                    onClick={() => handleSelect(value)}
                    key={value}
                  >
                    {value}
                  </li>
                );
              }
              return (
                <li
                  className={styles.dropDownItem}
                  onClick={() => handleSelect(value)}
                  key={value}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
}

export default DropDownUI;
