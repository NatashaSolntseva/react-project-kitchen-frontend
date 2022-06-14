import { FC } from 'react';
import styles from './footer.module.scss';
//--------------------------------------------------------------------------------

const Footer: FC = () => {
  return (
    <footer className={styles.box}>
      <div className={styles.container}>
        <p className={styles.container__text}>© Когда вырасту</p>
        <p className={styles.container__text}>
          Сделано студентами Яндекс.Практикума
        </p>
      </div>
    </footer>
  );
};

export default Footer;
