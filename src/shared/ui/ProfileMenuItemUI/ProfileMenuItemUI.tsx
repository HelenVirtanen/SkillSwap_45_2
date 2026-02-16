import React from 'react';
import styles from './ProfileMenuItemUI.module.css';
import { NavLink } from 'react-router-dom';

type TItemProp = {
  title: string;
  route: string;
  Icon?: React.ReactNode;
  disabled: boolean;
};

const ProfileMenuItemUI = ({ title, route, Icon, disabled }: TItemProp) => {
  return (
    <NavLink
      to={route}
      className={`${styles.item} ${disabled ? styles.disabled : ''}`}
    >
      {Icon}
      <span className={styles.link}>{title}</span>
    </NavLink>
  );
};

export default ProfileMenuItemUI;
