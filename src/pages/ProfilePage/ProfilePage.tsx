import React from 'react';
import { useForm } from 'react-hook-form';
import AvatarUI from '@shared/ui/AvatarUI/AvatarUI';
import styles from '@pages/ProfilePage/ProfilePage.module.css';
import ProfileSidebar from '@widgets/ProfileSidebar/ProfileSidebar';
import ProfileForm, {
  ProfileFormData,
} from '@features/forms/ProfileForm/ProrileForm';
import AddIcon from '@assets/icons/edit-photo.svg?react';


const ProfilePage: React.FC = () => {
  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск'];
  const src = "src/assets/avatars/user-photo.png";

  const form = useForm<ProfileFormData>({
    defaultValues: {
      email: 'Mariia@gmail.com',
      name: 'Мария',
      birthDate: null,
      gender: null,
      city: null,
      about:
        'Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем‑то интересным!',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Submitted data:', data);
  };

  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.profileSidebar}>
        <ProfileSidebar />
      </div>
      <div className={styles.profileWrapper}>
        <div className={styles.profileForm}>
          <ProfileForm
            form={form}
            cities={cities}
            onSubmit={form.handleSubmit(onSubmit)}
            onChangePassword={handleChangePassword}
          />
        </div>
        <div className={styles.avatarUI}>          
          <AvatarUI avatarSrc={src} addIconSrc={<AddIcon/>} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
