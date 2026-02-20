import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loader from '@shared/ui/Loader/Loader';
import ProtectedRoute from '@features/navigation/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './store/store';
import {
  fetchCities,
  fetchCategories,
} from './store/slices/staticData/staticDataSlice';
import { fetchLikes } from './store/slices/likes/likesSlice';
import { checkAuth } from './store/slices/authUser/auth'; 
import { ModalManager } from '@widgets/modals/ModalManager';

const MainLayout = lazy(() => import('@app/layout/MainLayout/MainLayout'));
const AuthLayout = lazy(() => import('@app/layout/AuthLayout/AuthLayout'));
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const SkillPage = lazy(() => import('@pages/SkillPage/SkillPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const ServerErrorPage = lazy(
  () => import('@pages/ServerErrorPage/ServerErrorPage'),
);
const RegisterPageStep1 = lazy(
  () => import('@pages/RegisterPages/RegisterPageStep1/RegisterPageStep1'),
);
const RegisterPageStep2 = lazy(
  () => import('@pages/RegisterPages/RegisterPageStep2/RegisterPageStep2'),
);
const RegisterPageStep3 = lazy(
  () => import('@pages/RegisterPages/RegisterPageStep3/RegisterPageStep3'),
);
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const FavoritesPage = lazy(() => import('@pages/FavoritesPage/FavoritesPage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));

function App() {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked);

  // Проверка авторизации при запуске приложения
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Загрузка статических данных и лайков после проверки
  useEffect(() => {
    if (isAuthChecked) {
      dispatch(fetchCities());
      dispatch(fetchCategories());
      dispatch(fetchLikes());
    }
  }, [dispatch, isAuthChecked]);

  // Пока проверка авторизации не завершена — лоадер
  if (!isAuthChecked) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Публичные роуты — доступны всем */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} /> {/* Главная — открыта */}
          <Route path="about" element={<AboutPage />} />
          <Route path="skill/:id" element={<SkillPage />} /> {/* Просмотр чужих */}
          <Route path="server-error" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Страницы авторизации */}
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<AuthLayout />}>
          <Route path="step1" element={<RegisterPageStep1 />} />
          <Route path="step2" element={<RegisterPageStep2 />} />
          <Route path="step3" element={<RegisterPageStep3 />} />
        </Route>

        {/* Защищённые роуты — ТОЛЬКО они внутри ProtectedRoute */}
        <Route path="profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />

        <Route path="favorites" element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } />
      </Routes>
      <ModalManager />
    </Suspense>
  );
}

export default App;