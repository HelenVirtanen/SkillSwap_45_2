import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import MainPage from '@pages/MainPage/MainPage';
import SkillPage from '@pages/SkillPage/SkillPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import ServerErrorPage from '@pages/ServerErrorPage/ServerErrorPage';
import RegisterPage from '@pages/RegisterPages/RegisterPage';
import RegisterPageStep1 from '@pages/RegisterPages/RegisterPageStep1/RegisterPageStep1';
import LoginPage from '@pages/LoginPage/LoginPage';
import ProfilePage from '@pages/ProfilePage/ProfilePage';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import AuthLayout from './layout/AuthLayout/AuthLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="skill/:id" element={<SkillPage />} />
        <Route path="server-error" element={<ServerErrorPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="/register" element={<AuthLayout />}>
        <Route index element={<RegisterPageStep1 />} />
      </Route>
    </Routes>
  );
}

export default App;
