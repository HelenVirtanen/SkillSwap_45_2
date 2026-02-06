// src/app/App.tsx
import React from 'react';
// Правильный путь - без папки ButtonUI
import ButtonUI from '../shared/ui/ButtonUI';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>SkillSwap</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <ButtonUI variant="primary" title="Войти" />
        <ButtonUI variant="secondary" title="Регистрация" />
        <ButtonUI variant="primary" title="Отправить" disabled={true} />
        <ButtonUI 
          variant="social" 
          title="Войти через Google" 
          iconLeft={<span>G</span>}
        />
        <ButtonUI variant="submit" title="Сохранить" />
      </div>
    </div>
  );
}

export default App;