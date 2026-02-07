import type { FC } from 'react'
import styles from './CheckboxUI.module.css'

export type CheckboxState = 'default' | 'done' | 'remove'

export interface CheckboxUIProps {
  label: string
  state: CheckboxState
  onChange: (state: CheckboxState) => void
  disabled?: boolean
  name?: string
  className?: string
}

export const CheckboxUI: FC<CheckboxUIProps> = ({
  label,
  state,
  onChange,
  disabled,
  name,
  className,
}) => {
  const rootClassName = [
    styles.root,
    styles[state],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={rootClassName}>
      <input
        type="checkbox"
        className={styles.input}
        name={name}
        disabled={disabled}
        checked={state !== 'default'}
        aria-checked={
          state === 'remove' ? 'mixed' : state === 'done'
        }
        onChange={() => onChange(state)}
      />

      <span className={styles.icon} />

      <span className={styles.label}>{label}</span>
    </label>
  )
}


//ЧТОБ ПРВЕРИТЬ РАБОТУ КОМПОНЕНТА ЗАМЕНИ СОДЕРЖИМОЕ ФАЙЛА MainPage.tsx на следующий код
// import { useState } from 'react'
// import { CheckboxUI, type CheckboxState } from '../../shared/CheckboxUI/CheckboxUI'

// const MainPage: React.FC = () => {
//   const [categoryState, setCategoryState] =
//     useState<CheckboxState>('default')

//   const [subState, setSubState] =
//     useState<CheckboxState>('default')

//   const nextCategoryState = (state: CheckboxState): CheckboxState =>
//     state === 'default' ? 'remove' : 'default'

//   const nextSubState = (state: CheckboxState): CheckboxState =>
//     state === 'default' ? 'done' : 'default'

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Главная страница</h1>

//       <div style={{ marginTop: 24 }}>
//         <CheckboxUI
//           label="Категория"
//           state={categoryState}
//           onChange={(current) =>
//             setCategoryState(nextCategoryState(current))
//           }
//         />
//       </div>

//       <div style={{ marginTop: 16 }}>
//         <CheckboxUI
//           label="Подкатегория"
//           state={subState}
//           onChange={(current) =>
//             setSubState(nextSubState(current))
//           }
//         />
//       </div>
//     </div>
//   )
// }

// export default MainPage
