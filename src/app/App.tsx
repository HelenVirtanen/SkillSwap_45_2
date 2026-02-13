import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '@shared/ui/Loader/Loader';

const MainLayout = lazy(() => import('@app/layout/MainLayout/MainLayout'));
const AuthLayout = lazy(() => import('@app/layout/AuthLayout/AuthLayout'));
const MainPage = lazy(() => import('@pages/MainPage/MainPage'));
const SkillPage = lazy(() => import('@pages/SkillPage/SkillPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage'));
const ServerErrorPage = lazy(
  () => import('@pages/ServerErrorPage/ServerErrorPage'),
);
const RegisterPageStep1 = lazy(() => import('@pages/RegisterPages/RegisterPageStep1/RegisterPageStep1'));
const LoginPage = lazy(() => import('@pages/LoginPage/LoginPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage/ProfilePage'));
const FavoritesPage = lazy(() => import('@pages/FavoritesPage/FavoritesPage'));
const AboutPage = lazy(() => import('@pages/AboutPage/AboutPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
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
          <Route path="step1" element={<RegisterPageStep1 />} />
          <Route path="step2" element={<RegisterPageStep1 />} />
          <Route path="step3" element={<RegisterPageStep1 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
