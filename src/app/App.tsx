import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import MainPage from '../pages/MainPage/MainPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Главная страница */}
      <Route
        path="/"
        element={
          <MainLayout>
            <MainPage />
          </MainLayout>
        }
      />
      
      {/* Страница 404 - должна быть ПОСЛЕДНЕЙ */}
      <Route
        path="*"
        element={
          
            <NotFoundPage />
          
        }
      />
    </Routes>
  );
}

export default App;