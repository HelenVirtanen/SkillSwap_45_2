import { useState } from 'react'
import { CheckboxUI, type CheckboxState } from '../../shared/CheckboxUI/CheckboxUI'

const MainPage: React.FC = () => {
  const [categoryState, setCategoryState] =
    useState<CheckboxState>('default')

  const [subState, setSubState] =
    useState<CheckboxState>('default')

  const nextCategoryState = (state: CheckboxState): CheckboxState =>
    state === 'default' ? 'remove' : 'default'

  const nextSubState = (state: CheckboxState): CheckboxState =>
    state === 'default' ? 'done' : 'default'

  return (
    <div style={{ padding: 24 }}>
      <h1>Главная страница</h1>

      <div style={{ marginTop: 24 }}>
        <CheckboxUI
          label="Категория"
          state={categoryState}
          onChange={(current) =>
            setCategoryState(nextCategoryState(current))
          }
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <CheckboxUI
          label="Подкатегория"
          state={subState}
          onChange={(current) =>
            setSubState(nextSubState(current))
          }
        />
      </div>
    </div>
  )
}

export default MainPage
