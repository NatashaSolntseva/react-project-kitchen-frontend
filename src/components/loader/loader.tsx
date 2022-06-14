import { FC } from 'react';
import styles from './loader.module.scss';
//--------------------------------------------------------------------------------

const Loader: FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div className={styles.wrapper} style={{ transform: `scale(${scale})` }}>
      <div className={styles.loader}>
        <div className={`${styles.item} ${styles.item1}`}></div>
        <div className={`${styles.item} ${styles.item2}`}></div>
        <div className={`${styles.item} ${styles.item3}`}></div>
        <div className={`${styles.item} ${styles.item4}`}></div>
      </div>
    </div>
  );
};

export default Loader;
