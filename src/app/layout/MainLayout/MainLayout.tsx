import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import HeaderMain from '../Header/HeaderMain';
import Footer from '../Footer/Footer';
import Loader from '@shared/ui/Loader/Loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@app/store/store';
import { fetchUsers, selectUsers, selectUsersStatus, selectUsersError } from '@app/store/slices/user';

const MainLayout = () => {
  // проверка фетчинга юзеров из стора
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

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
