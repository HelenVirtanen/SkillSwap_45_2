import React from 'react';
import styles from './ProfileMenuItemUI.module.css';
import { NavLink } from 'react-router-dom';

type TItemProp = {
  title: string;
  route: string;
  Icon?: React.ReactNode;
};

const ProfileMenuItemUI = ({ title, route, Icon }: TItemProp) => {
  return (
    <NavLink to={route} className={styles.item}>
      {Icon}
      <span className={styles.link}>{title}</span>
    </NavLink>
  );
};

export default ProfileMenuItemUI;
