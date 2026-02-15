import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import HeaderMain from '../Header/HeaderMain';
import Footer from '../Footer/Footer';
import Loader from '@shared/ui/Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@app/store/store';
import { selectUser, selectUserStatus, selectUserError } from '@app/store/slices/user/slice';
import { fetchUsers } from '@app/store/slices/user/actions';

const MainLayout = () => {
  // проверка фетчинга юзеров из стора
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log('USERS', users);

  if (status === 'loading') return <Loader />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={styles.wrapper}>
      <HeaderMain />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
