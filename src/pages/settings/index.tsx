import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { selectCurrentUser, userErrors } from 'services/selectors/profile';
import { patchUser } from 'services/slices/profile';
import styles from './settings-page.module.scss';
import { Button } from 'components/button/button';
import { useForm } from 'react-hook-form';
//--------------------------------------------------------------------------------

type TSettingsFormData = {
  avatar: string;
  username: string;
  email: string;
  password: string;
};

const SettingsPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const settingsErrors = useAppSelector(userErrors);
  const [passwordInput, setPasswordInput] = useState('');
  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TSettingsFormData>({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      password: '',
      avatar: user.image,
    },
  });

  const onSettingsSubmit = ({
    username,
    email,
    password,
    avatar,
  }: TSettingsFormData) => {
    dispatch(
      patchUser({
        user: {
          username: username,
          email: email,
          image: avatar,
          ...(passwordInput ? { password: password } : {}),
        },
      })
    );
    navigate(`/profile/@${username}`);
  };

  return (
    <section className={styles.settings}>
      <h2 className={styles.settings__title}>Ваши настройки</h2>
      <form
        className={styles.settings__form}
        onSubmit={handleSubmit(onSettingsSubmit)}>
        <fieldset className={styles.settings__fieldset}>
          <label className={styles.settings__label}>
            URL изображения профиля
            <input
              type="url"
              className={styles.settings__input}
              {...register('avatar', {
                pattern: {
                  value:
                    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                  message: 'Неверный формат ссылки',
                },
              })}></input>
          </label>
          <div className={styles.settings__errorsWrapper}>
            {errors?.avatar && (
              <p className={styles.settings__errorText}>
                {errors?.avatar?.message}
              </p>
            )}
          </div>
          <label className={styles.settings__label}>
            Имя пользователя
            <input
              type="text"
              className={
                settingsErrors.username
                  ? `${styles.settings__input} ${styles.settings__input_error}`
                  : `${styles.settings__input}`
              }
              {...register('username', {
                required: 'Пожалуйста, заполните это поле',
                minLength: {
                  value: 2,
                  message: 'Имя пользователя должно быть не менее 2 символов',
                },
              })}
            />
          </label>
          <div className={styles.settings__errorsWrapper}>
            {errors?.username && (
              <p className={styles.settings__errorText}>
                {errors?.username?.message}
              </p>
            )}
            {settingsErrors.username && (
              <p className={styles.settings__errorText}>
                {'Такое имя пользователя уже занято'}
              </p>
            )}
          </div>
          <label className={styles.settings__label}>
            E-mail
            <input
              type="email"
              className={
                settingsErrors.email
                  ? `${styles.settings__input} ${styles.settings__input_error}`
                  : `${styles.settings__input}`
              }
              {...register('email', {
                required: 'Пожалуйста, заполните это поле',
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Введите Email в формате username@example.com',
                },
              })}
            />
          </label>
          <div className={styles.settings__errorsWrapper}>
            {errors?.email && (
              <p className={styles.settings__errorText}>
                {errors?.email?.message}
              </p>
            )}
            {settingsErrors.email && (
              <p className={styles.settings__errorText}>
                {'Такой e-mail уже зарегистрирован'}
              </p>
            )}
          </div>
          <label className={styles.settings__label}>
            Новый пароль
            <input
              type="password"
              className={styles.settings__input}
              {...register('password', {
                onChange: (evt) => {
                  setPasswordInput(evt.target.value);
                },
                minLength: {
                  value: 5,
                  message: 'Пароль должен быть не менее 5 символов',
                },
              })}
              value={passwordInput}
            />
          </label>
          <div className={styles.settings__errorsWrapper}>
            {errors?.password && (
              <p className={styles.settings__errorText}>
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className={styles.settings__button}>
            <Button
              color="primary"
              type="primary"
              htmlType="submit"
              children="Обновить настройки"
              disabled={!isValid}
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default SettingsPage;
