import chevronUp from "@assets/icons/chevron-up.svg"
import { useState } from "react";
import styles from './DropDown.module.css'


type SelectProps = {
	title: string;
  selected?: string | undefined
  options?: string[];
};


const DropDownUI = (
  props: SelectProps
) => {
  const { title , selected, options } = props;

  const [isOpen, setIsOpen] = useState(false)
   
  // TODO: Добавить пропс "начальное значение" или брать первое значение из options ?
  const [isSelected, setIsSelected] = useState<string | null>(null)
  

  function buttonToggle (){
    setIsOpen(!isOpen)
  }

  function setSelected (value:string) {
    setIsSelected(value)
    setIsOpen(false)
  }


  return (
   
    <div >
      {title && (
      <>
        <h4 className={`${styles.text} ${styles.title}`}>
          {title}
        </h4>
      </>
      )}
      <div className={`${styles.wrapperDrownList} ${isOpen ? styles.dropDownListOpen : ''}`}>
        <button type="button" aria-label="Открыть список" className={`${styles.buttonWithIcon}` } onClick={buttonToggle}>
          <span className={`${styles.textInButtonWithIcon} ${isSelected  ? '' : styles.placeholder} ${styles.text}`  }>{isSelected ? isSelected : options![0]}</span>
          <img src={chevronUp} alt='иконка стрелочки' className={isOpen ? styles.arrow : styles.arrowOpen }/>
        </button>
      {isOpen && (
					<ul className={styles.dropDownList }>
            {options && options.map((value)=>{
              if(isSelected == value) {
                return (
                  <li className={`${styles.dropDownItem} ${styles.dropDownItemSelected} ${styles.text}`} onClick={()=> setSelected(value)} key={value} >
                    {value}
                  </li>
              )
              }
              return (<li className={styles.dropDownItem} onClick={()=> setSelected(value)} key={value}>
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