import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import MainPage from '../pages/MainPage/MainPage';
import SkillPage from '../pages/SkillPage/SkillPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ServerErrorPage from '../pages/ServerErrorPage/ServerErrorPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <MainPage />
          </MainLayout>
        }
      />

      <Route
        path="/skill"
        element={
          <MainLayout>
            <SkillPage />
          </MainLayout>       
        }
      />

      <Route
        path="/not-found"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>       
        }
      />

      <Route
        path="/server-error"
        element={
          <MainLayout>
            <ServerErrorPage />
          </MainLayout>       
        }
      />

      <Route
        path="/register"
        element={
          <RegisterPage />      
        }
      />

      <Route
        path="/login"
        element={
          <LoginPage />      
        }
      />

      <Route
        path="/profile"
        element={
          <ProfilePage />      
        }
      />
    </Routes>
  );
}

export default App;
