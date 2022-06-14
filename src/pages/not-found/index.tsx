import { FC } from 'react';
import styles from './not-found-page.module.scss';
import { NavLink } from 'react-router-dom';
//--------------------------------------------------------------------------------

const NotFound: FC = () => {
  return (
    <div className={styles.notfound}>
      <h2 className={styles.notfound__title}>404</h2>
      <p className={styles.notfound__text}>Страница не найдена.</p>
      <p className={styles.notfound__text}>
        Чтобы читать блог, перейдите на{' '}
        <NavLink to="/" className={styles.notfound__link}>
          Главную
        </NavLink>
      </p>
    </div>
  );
};

export default NotFound;
