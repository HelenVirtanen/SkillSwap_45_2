import './App.css';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Loader from '@shared/ui/Loader/Loader';
import RegisterPageStep2 from '@pages/RegisterPages/RegisterPageStep2/RegisterPageStep2';
import RegisterPageStep3 from '@pages/RegisterPages/RegisterPageStep3/RegisterPageStep3';
import ProtectedRoute from '@features/navigation/ProtectedRoute';
import { useDispatch } from './store/store';
import { checkUserAuth } from './store/slices/authUser/actions';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="skill/:id" element={<SkillPage />} />
          <Route path="server-error" element={<ServerErrorPage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<AuthLayout />}>
          <Route path="step1" element={<RegisterPageStep1 />} />
          <Route path="step2" element={<RegisterPageStep2 />} />
          <Route path="step3" element={<RegisterPageStep3 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
