import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../../assets/images/home-icon.svg';
import { ReactComponent as LoginIcon } from '../../assets/images/login-icon.svg';
import styles from './header.module.scss';
import HeaderMenu from 'components/header-menu';
import { useAppSelector } from 'services/hooks';
//--------------------------------------------------------------------------------

const Header: FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.profile);

  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <Link className={styles.nav__link} to="/">
          <HomeIcon className={styles.nav__icon} />
          <span className={styles.nav__text}>Главная</span>
        </Link>
        {isAuth ? (
          <HeaderMenu image={user.image} name={user.username} />
        ) : (
          <Link className={styles.nav__link} to="/login">
            <LoginIcon className={styles.nav__icon} />
            <span className={styles.nav__text}>Войти</span>
          </Link>
        )}
      </nav>
      <div className={styles.text_box}>
        <h1 className={styles.title}>Когда вырасту</h1>
        <p className={styles.description}>
          Каково быть джуном в турбулентном мире
        </p>
      </div>
    </header>
  );
};

export default Header;
