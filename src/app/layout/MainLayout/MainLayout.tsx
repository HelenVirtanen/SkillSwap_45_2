import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import HeaderMain from '../Header/HeaderMain';
import Footer from '../Footer/Footer';
// import Loader from '@shared/ui/Loader/Loader';
// import { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@app/store/store';
// import { selectAuthUser, selectAuthStatus, selectAuthError } from '@app/store/slices/authUser/auth';
// import { fetchUsers } from '@app/store/slices/authUser/actions';

const MainLayout = () => {
// проверка фетчинга юзеров из стора
// const dispatch = useAppDispatch();
// const users = useAppSelector(selectAuthUser);
// const status = useAppSelector(selectAuthStatus);
// const error = useAppSelector(selectAuthError);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispath]);

  // console.log('USERS', users);

  // if (status === 'loading') return <Loader />;
  // if (error) return <p>Ошибка: {error}</p>;

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
