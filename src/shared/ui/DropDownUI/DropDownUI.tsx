import chevronUp from "@assets/icons/chevron-up.svg"
import { useEffect, useRef, useState } from "react";
import styles from './DropDownUI.module.css'

type SelectProps = {
  title: string;
  value?: string | undefined
  options?: string[];
  onChange?: (value: string) => void; 
};

const DropDownUI = (
  props: SelectProps
) => {
  const { title , value, options, onChange } = props;

  const [isOpen, setIsOpen] = useState(false)
  
  const [selected,setSelected] = useState(value)
  
  const ref = useRef<HTMLDivElement>(null);

  function buttonToggle (){
    setIsOpen(!isOpen)
  }

  function handleSelect (value:string) {
    onChange?.(value)
    setSelected(value)
    setIsOpen(false)
  }


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
   
    <div ref={ref} >
      {title && (
      <>
        <h4 className={`${styles.text} ${styles.title}`}>
          {title}
        </h4>
      </>
      )}
      <div className={`${styles.wrapperDrownList} ${isOpen ? styles.dropDownListOpen : ''}`}>
        <button type="button" aria-label="Открыть список" className={`${styles.buttonWithIcon}` } onClick={buttonToggle}>
          <span className={`${styles.textInButtonWithIcon} ${selected ? styles.text : styles.placeholder} `  }>{selected ? selected : options?.[0]}</span>
          <img src={chevronUp} alt={isOpen ? "Закрыть список" : "Открыть список"} className={isOpen ? styles.arrow : styles.arrowOpen }/>
        </button>
      {isOpen && (
          <ul className={styles.dropDownList }>
            {options?.map((value)=>{
              if(selected == value) {
                return (
                  <li className={`${styles.dropDownItem} ${styles.text} ${styles.dropDownItemSelected} `} onClick={()=> handleSelect(value)} key={value} >
                    {value}
                  </li>
              )
              }
              return (<li className={styles.dropDownItem} onClick={()=> handleSelect(value)} key={value}>
                {value}
              </li>)
            })}
          </ul>
        )}
      </div>  
    </div>
  )
}

export default DropDownUI;