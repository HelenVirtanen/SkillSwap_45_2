import { selectUser, selectUserAuth } from "@app/store/slices/user/slice";
import { useSelector } from "@app/store/store";
import Loader from "@shared/ui/Loader/Loader";
import { useLocation, Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnauth?: boolean;
}

const ProtectedRoute = ({
  onlyUnauth = false,
  children
}: ProtectedRouteProps) => {
  const isAuth = useSelector(selectUserAuth);
  const user = useSelector(selectUser);
  const location = useLocation();

  // Показываем загрузку пока идет авторизация пользователя
  if (!isAuth) {
    return <Loader />
  }

  // Пользователь НЕ авторизован, но должен быть авторизован
  if (!onlyUnauth) {
    if(user) {
      return children
    }
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }

  // Пользователь авторизован, но должен быть НЕ авторизован
  if (onlyUnauth) {
    if (!user) {
      return children;
    }
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  return children;
}

export default ProtectedRoute;