import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import HeaderMain from '../Header/HeaderMain';
import Footer from '../Footer/Footer';
import Loader from '@shared/ui/Loader/Loader';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@app/store/store';
import { fetchAllUsers, selectAllUsers, selectUsersStatus, selectUsersError } from '@app/store/slices/User/usersSlise';
// import { selectAuthUser, selectAuthStatus, selectAuthError } from '@app/store/slices/authUser/auth';

const MainLayout = () => {
// проверка фетчинга юзеров из стора
const dispatch = useAppDispatch();
// const users = useSelector(selectAuthUser);
// const status = useSelector(selectAuthStatus);
// const error = useSelector(selectAuthError);
const [searchQuery, setSearchQuery] = useState('');

const users = useAppSelector(selectAllUsers);
const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);
  useEffect(() => {
  if (status === 'idle') {
    dispatch(fetchAllUsers());
  }
}, [dispatch, status]);

  console.log('USERS', users);

  if (status === 'loading') return <Loader />;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={styles.wrapper}>
      <HeaderMain onSearchChange={setSearchQuery}/>
      <main className={styles.main}>
        <Outlet context={{ searchQuery }}/>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
