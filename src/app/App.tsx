import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const MainLayout = lazy(() => import('@app/layout/MainLayout/MainLayout'));
const AuthLayout = lazy(() => import('@app/layout/AuthLayout/AuthLayout'));
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const SkillPage = lazy(() => import('@pages/SkillPage/SkillPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const ServerErrorPage = lazy(
  () => import('@pages/ServerErrorPage/ServerErrorPage'),
);
const RegisterPage = lazy(() => import('@pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const FavoritesPage = lazy(() => import('@pages/FavoritesPage/FavoritesPage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
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
          <Route path="step1" element={<RegisterPage />} />
          <Route path="step2" element={<RegisterPage />} />
          <Route path="step3" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
