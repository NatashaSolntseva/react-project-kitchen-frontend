import { FC } from 'react';
import styles from './register-page.module.scss';
import { Link } from 'react-router-dom';
import { registerUser } from 'services/slices/profile';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { userErrors, isAuth } from 'services/selectors/profile';
import { Navigate } from 'react-router-dom';
import { Button } from 'components/button/button';
import { useForm } from 'react-hook-form';
//--------------------------------------------------------------------------------

type TRegisterFormData = {
  username: string;
  email: string;
  password: string;
};

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(isAuth);
  const registerErrors = useAppSelector(userErrors);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TRegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onRegisterSubmit = ({
    username,
    email,
    password,
  }: TRegisterFormData) => {
    dispatch(
      registerUser({
        user: { username: username, email: email, password: password },
      })
    );
  };

  if (auth) {
    return <Navigate to={{ pathname: '/' }} />;
  }

  return (
    <section className={styles.register}>
      <h2 className={styles.register__title}>Зарегистрироваться</h2>
      <Link to="/login" className={styles.register__link}>
        Войти
      </Link>
      <form
        className={styles.register__form}
        onSubmit={handleSubmit(onRegisterSubmit)}>
        <fieldset className={styles.register__fieldset}>
          <label className={styles.register__label}>
            Имя пользователя
            <input
              className={
                registerErrors.username
                  ? `${styles.register__input} ${styles.register__input_error}`
                  : `${styles.register__input}`
              }
              {...register('username', {
                required: 'Пожалуйста, заполните это поле',
                minLength: {
                  value: 2,
                  message: 'Имя пользователя должно быть не менее 2 символов',
                },
              })}></input>
          </label>
          <div className={styles.register__errorsWrapper}>
            {errors?.username && (
              <p className={styles.register__errorText}>
                {errors?.username?.message}
              </p>
            )}
            {registerErrors.username && (
              <p className={styles.register__errorText}>
                {'Такое имя пользователя уже занято'}
              </p>
            )}
          </div>
          <label className={styles.register__label}>
            Email
            <input
              type="email"
              className={
                registerErrors.email
                  ? `${styles.register__input} ${styles.register__input_error}`
                  : `${styles.register__input}`
              }
              {...register('email', {
                required: 'Пожалуйста, заполните это поле',
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Введите Email в формате username@example.com',
                },
              })}></input>
          </label>
          <div className={styles.register__errorsWrapper}>
            {errors?.email && (
              <p className={styles.register__errorText}>
                {errors?.email?.message}
              </p>
            )}
            {registerErrors.email && (
              <p className={styles.register__errorText}>
                {'Такой e-mail уже зарегистрирован'}
              </p>
            )}
          </div>
          <label className={styles.register__label}>
            Пароль
            <input
              type="password"
              className={styles.register__input}
              {...register('password', {
                required: 'Пожалуйста, заполните это поле',
                minLength: {
                  value: 5,
                  message: 'Пароль должен быть не менее 5 символов',
                },
              })}></input>
          </label>
          <div className={styles.register__errorsWrapper}>
            {errors?.password && (
              <p className={styles.register__errorText}>
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className={styles.register__button}>
            <Button
              color="primary"
              type="primary"
              htmlType="submit"
              children="Зарегистрироваться"
              disabled={!isValid}
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default RegisterPage;
