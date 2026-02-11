import ProfileMenuItemUI from '@shared/ui/ProfileMenuItemUI/ProfileMenuItemUI';
import { ProfileSidebarconfig } from './ProfileSidebar.config';
import styles from './ProfileSidebar.module.css';

const ProfileSidebar = () => {
  return (
    <ul className={styles.list}>
      {ProfileSidebarconfig.map((conItem) => (
        <li key={conItem.title}>
          <ProfileMenuItemUI
            title={conItem.title}
            route={conItem.route}
            Icon={conItem.icon}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProfileSidebar;
