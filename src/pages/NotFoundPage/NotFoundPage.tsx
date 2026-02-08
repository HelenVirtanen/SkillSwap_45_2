import React from 'react';
import MainLayout from '../../app/layout/MainLayout/MainLayout';
import ErrorContent from '../../widgets/ErrorContent/ErrorContent';
import notFoundIcon from "../../assets/illustrations/error-404.svg";

const NotFoundPage: React.FC = () => (
  <MainLayout>
    <main>
      <ErrorContent
        image={<img src={notFoundIcon} alt="404 Not Found" />}
        title="Страница не найдена"
        description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже."
      />
    </main>
  </MainLayout>
);

export default NotFoundPage;