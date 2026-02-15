import InputUI from "@shared/ui/InputUI/InputUI"
import styles from "./Step2ProfileInfo.module.css"
import DropDownUI from "@shared/ui/DropDownUI/DropDownUI"
import { MultiSelectDropdownUI } from "@shared/ui/MultiSelectDropdownUI/MultiSelectDropdownUI"
import { useState } from "react"
import ButtonUI from "@shared/ui/ButtonUI/ButtonUI"
import AutoCompleteUI from "@shared/ui/AutoCompleteUI/AutoCompleteUI"


//
//
//3) Добавить datapicker потом 
//4) Убрать фейковые данные
//5) Подправить как для навыков DropDown
//6) Связать категории подкатегории (аля функция и на входи название приходит(категории или подкатегории)
// и значит пересчитываем выдаваемые значения для второго списка
//7) Сделать input для городов на основе моего DropDown
//8) 
//9) Ещё надо сделать label + input скорее всего но я хз
const optionsGenders = ['Не указан','Мужской', 'Женский'] //Для пола
const optionsCategorySkillsWantedToLearn = [
  {
    "id": 1,
    "label": "Бизнес и карьера",
    "value": "бизнес и карьера"
  },
  {
    "id": 2,
    "label": "Творчество и искусство",
    "value": "творчество и искусство"
  },
  {
    "id": 3,
    "label": "Иностранные языки",
    "value": "иностранные языки"
  },
  {
    "id": 4,
    "label": "Здоровье и лайфстайл",
    "value": "здоровье и лайфстайл"
  },
  {
    "id": 5,
    "label": "Дом и уют",
    "value": "дом и уют"
  }
]
const optionsSubCategorySkillsWantedToLearn = [
  {
    "id": 1,
    "label": "Рисование и иллюстрация",
    "value": "Рисование и иллюстрация"
  },
  {
    "id": 2,
    "label": "Фотография",
    "value": "Фотография"
  },
  {
    "id": 3,
    "label": "Видеомонтаж",
    "value": "Видеомонтаж"
  },
  {
    "id": 4,
    "label": "Музыка и звук",
    "value": "Музыка и звук"
  },
  {
    "id": 5,
    "label": "Актёрское мастерство",
    "value": "Актёрское мастерство"
  },
  {
    "id": 6,
    "label": "Креативное письмо",
    "value": "Креативное письмо"
  },
  {
    "id": 7,
    "label": "Арт-терапия",
    "value": "Арт-терапия"
  },
  {
    "id": 8,
    "label": "Декор и DIY",
    "value": "Декор и DIY"
  }
]
const optionsCity = [
  {
    "id": 1,
    "label": "Москва",
    "value": "Москва"
  },
  {
    "id": 2,
    "label": "Новосибирск",
    "value": "Новосибирск"
  },
  {
    "id": 3,
    "label": "Томск",
    "value": "Томск"
  },
  {
    "id": 4,
    "label": "Париж",
    "value": "Париж"
  },
  {
    "id": 6,
    "label": "Пекин",
    "value": "Пекин"
  },
]
//Убрать ширину form так как вдруг расстягиваться будет.

export type Step2Data = {
  firstName?: string;
  birthDate?: string;
  gender?: string;
  city?: string[];
  categorySkill?: string[];
  subcategorySkill?: string[];
}




type Step2ProfileInfoProps = {
  initialData?: Step2Data,
  onChangeOfWantedSkills?:() => void,
  onFieldChange: <K extends keyof Step2Data>(field: K, value: Step2Data[K]) => void;
}



const Step2ProfileInfo = (props:Step2ProfileInfoProps) => {

  const {initialData,onFieldChange} = props

  const [localData, setLocalData] = useState<Step2Data>(() => ({
    firstName: initialData?.firstName || '',
    birthDate: initialData?.birthDate || '',
    gender: initialData?.gender,
    city: initialData?.city || [],
    categorySkill: initialData?.categorySkill || [],
    subcategorySkill: initialData?.subcategorySkill || []
  }));

  const handleFieldChange = <K extends keyof Step2Data>(
    field: K, 
    value: Step2Data[K]
  ) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    onFieldChange(field, value); 
  };

  return (
    <div className={styles.form}>
      <InputUI value={localData.firstName} label={"Имя"} onChange={(e)=>{handleFieldChange('firstName',e.target.value) }} placeholder="Введите ваше имя"/>

      <div className={styles.inLineDataAndGender}>
        <DropDownUI title="Дата рождения" value={localData.birthDate}/>
        <DropDownUI title="Пол" options={optionsGenders} value={localData.gender} onChange={(value)=>handleFieldChange('gender',value)}/>
      </div>

      <AutoCompleteUI/>

      <MultiSelectDropdownUI placeholder='Выберите категорию' label='Категория навыка, которому хотите научиться'
      options={optionsCategorySkillsWantedToLearn} selected={localData.categorySkill ? localData.categorySkill : []} onChange={(value:string[])=>{handleFieldChange('categorySkill',value)}} />

      <MultiSelectDropdownUI placeholder='Выберите подкатегорию' label='Подкатегория навыка, которому хотите научиться'
      options={optionsSubCategorySkillsWantedToLearn} selected={localData.subcategorySkill ? localData.subcategorySkill : []} onChange={(value:string[])=>{handleFieldChange('subcategorySkill',value)}}/>

      <div className={styles.inLineButtons}>
        <ButtonUI variant='secondary' title="Назад"/>
        <ButtonUI variant='primary' title="Продолжить"/>
      </div>
    </div>
  )
}
export default Step2ProfileInfo