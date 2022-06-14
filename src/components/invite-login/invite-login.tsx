import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './invite-login.module.scss';
//--------------------------------------------------------------------------------

const InviteLogin: FC = () => {
  const location = useLocation();

  return (
    <div className={styles.box}>
      <div className={styles.round}>
        <Link to="/login" state={{ from: location }}>
          <p className={styles.text}>
            Хотите написать комментарий?
            <span className={styles.round}>Авторизуйтесь!</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default InviteLogin;
