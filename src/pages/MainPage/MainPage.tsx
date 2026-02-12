import '../../styles/index.css';
import { ModalConfirmOffer } from '@widgets/modals/ModalConfirmOffer/ModalConfirmOffer';

import image1 from '@assets/image for test/image.jpg';
import image2 from '@assets/image for test/Image (1).png';
import image3 from '@assets/image for test/Image (2).png';
import image4 from '@assets/image for test/3aaa87619f4111f05c60657e37b8861a7166ae17.jpg';

const MainPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <ModalConfirmOffer
        title="Подтверждение предложения"
        description="Проверьте информацию перед отправкой предложения."

        aboutSkillProps={{
          title: 'Обучение Figma',
          category: 'Дизайн',
          subcategory: 'UI/UX',
          description:
            'Научу работать в Figma с нуля. Разберём автолейауты, компоненты и прототипирование.',
        }}

        galleryProps={{
          images: [image1, image2, image3, image4],
        }}

        onEdit={() => console.log('Редактировать')}
        onConfirm={() => console.log('Готово')}
      />
    </div>
  );
};

export default MainPage;

