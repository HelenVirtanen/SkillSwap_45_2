import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AvatarUI from '@shared/ui/AvatarUI/AvatarUI';
import styles from '@pages/ProfilePage/ProfilePage.module.css';
import ProfileSidebar from '@widgets/ProfileSidebar/ProfileSidebar';
import ProfileForm, {
  ProfileFormData,
} from '@features/forms/ProfileForm/ProrileForm';
import AddIcon from '@assets/icons/edit-photo.svg?react';
import { useAppSelector } from '@app/store/store';
import { selectUserById } from '@app/store/slices/User/usersSlise';
import { selectAuthUser } from '@app/store/slices/authUser/auth';
import { getMyProfileApi, updateMyProfileApi, type TProfile } from '@api/api';
import { selectCities } from '@app/store/slices/staticData/staticDataSlice';
import DefaultAvatar from '@assets/avatars/user-photo.png';

const ProfilePage: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser);
  const user = useAppSelector((state) =>
    authUser ? selectUserById(state, authUser.id) : null,
  );
  const citiesFromStore = useAppSelector(selectCities);
  const cityOptions = citiesFromStore.map((city) => city.name);
  const [apiProfile, setApiProfile] = useState<TProfile | null>(null);
  const avatarSrc = apiProfile?.avatar || user?.avatar || DefaultAvatar;

  const form = useForm<ProfileFormData>({
    defaultValues: {
      email: apiProfile?.email || user?.email || authUser?.email || '',
      name: apiProfile?.name || user?.name || authUser?.name || '',
      birthDate: apiProfile?.birthDate || user?.birthDate || null,
      gender: apiProfile?.gender || user?.gender || null,
      city: apiProfile?.city || user?.city || authUser?.city || null,
      about: apiProfile?.about || user?.about || '',
    },
  });

  useEffect(() => {
    if (!authUser) return;

    const loadMyProfile = async () => {
      try {
        const profile = await getMyProfileApi();
        setApiProfile(profile);
      } catch (error) {
        console.error('Ошибка загрузки профиля', error);
      }
    };

    loadMyProfile();
  }, [authUser]);

  useEffect(() => {
    form.reset({
      email: apiProfile?.email || user?.email || authUser?.email || '',
      name: apiProfile?.name || user?.name || authUser?.name || '',
      birthDate: apiProfile?.birthDate || user?.birthDate || null,
      gender: apiProfile?.gender || user?.gender || null,
      city: apiProfile?.city || user?.city || authUser?.city || null,
      about: apiProfile?.about || user?.about || '',
    });
  }, [form, apiProfile, user, authUser]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updatedProfile = await updateMyProfileApi({
        name: data.name,
        birthDate: data.birthDate || undefined,
        gender: data.gender || undefined,
        city: data.city || undefined,
        about: data.about || undefined,
      });

      setApiProfile(updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
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
            cities={cityOptions}
            onSubmit={form.handleSubmit(onSubmit)}
            onChangePassword={handleChangePassword}
          />
        </div>
        <div className={styles.avatarUI}>
          <AvatarUI avatarSrc={avatarSrc} addIconSrc={<AddIcon />} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
