import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login-page.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { signIn } from 'services/slices/profile';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { userErrors, isAuth } from 'services/selectors/profile';
import { Navigate } from 'react-router-dom';
import { Button } from 'components/button/button';
//--------------------------------------------------------------------------------

type TLoginFormData = {
  email: string;
  password: string;
};

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(isAuth);
  const location = useLocation();
  const state = location.state as { from?: Location };
  const loginErrors = useAppSelector(userErrors);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TLoginFormData>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const onLoginSubmit = ({ email, password }: TLoginFormData) => {
    dispatch(signIn({ user: { email: email, password: password } }));
  };

  if (auth) {
    return <Navigate to={state?.from || '/'} />;
  }

  return (
    <section className={styles.login}>
      <h2 className={styles.login__title}>Войти</h2>
      <Link to="/register" className={styles.login__link}>
        Зарегистрироваться
      </Link>
      <form
        className={styles.login__form}
        onSubmit={handleSubmit(onLoginSubmit)}>
        <fieldset className={styles.login__fieldset}>
          <label className={styles.login__label}>
            Email
            <input
              type="email"
              className={
                loginErrors['email or password']
                  ? `${styles.login__input} ${styles.login__input_error}`
                  : `${styles.login__input}`
              }
              {...register('email', {
                required: 'Пожалуйста, заполните это поле',
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Введите Email в формате username@example.com',
                },
              })}></input>
          </label>
          <div className={styles.login__errorsWrapper}>
            {errors?.email && (
              <p className={styles.login__errorText}>
                {errors?.email?.message}
              </p>
            )}
            {loginErrors['email or password'] && (
              <p className={styles.login__errorText}>
                {'Вы ввели неверный Email или пароль'}
              </p>
            )}
          </div>
          <label className={styles.login__label}>
            Пароль
            <input
              type="password"
              className={
                loginErrors['email or password']
                  ? `${styles.login__input} ${styles.login__input_error}`
                  : `${styles.login__input}`
              }
              {...register('password', {
                required: 'Пожалуйста, заполните это поле',
                minLength: {
                  value: 5,
                  message: 'Пароль должен быть не менее 5 символов',
                },
              })}></input>
          </label>
          <div className={styles.login__errorsWrapper}>
            {errors?.password && (
              <p className={styles.login__errorText}>
                {errors?.password?.message}
              </p>
            )}
            {loginErrors['email or password'] && (
              <p className={styles.login__errorText}>
                {'Вы ввели неверный Email или пароль'}
              </p>
            )}
          </div>
          <div className={styles.login__button}>
            <Button
              color="primary"
              type="primary"
              htmlType="submit"
              children="Войти"
              disabled={!isValid}
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default LoginPage;
