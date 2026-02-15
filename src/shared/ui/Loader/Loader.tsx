import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => (
  <div className={styles.loaderWrapper}>
    <span className={styles.loader}></span>
    <h2 className={styles.loaderTitle}>Loading...</h2>
  </div>
);

export default Loader;