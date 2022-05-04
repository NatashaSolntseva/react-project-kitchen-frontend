import React, { FC } from 'react';
import styles from './main-page.module.scss';
import { useLocation, Link } from 'react-router-dom';
import { Button } from 'components/button/button';
import PlusIcon from 'components/icons/plus-icon';
import MinusIcon from 'components/icons/minus-icon';
import TrashIcon from 'components/icons/trash-icon';
//--------------------------------------------------------------------------------

const MainPage: FC = () => {
  const location = useLocation();
  return (
    <div className={styles.main}>
      <h1>UI Kit</h1>
      <p>Тест модалки</p>
      <Link
        to={`/modal`}
        state={{ backgroundLocation: location }}
        className={styles.main__link}
        children={'Открыть модалку'}
      />
      <p>Кнопки</p>
      <div
        style={{
          display: 'flex',
          gap: 20,
        }}>
        <Button
          type="primary"
          color="primary"
          icon={<PlusIcon />}
          children="Подписаться"
        />
        <Button
          type="primary"
          color="primary"
          icon={<MinusIcon />}
          children="Отписаться"
        />
        <Button type="primary" color="primary" children="Сохранить запись" />
        <Button color="secondary" children="Удалить запись" />
        <Button color="secondary" children="Удалить запись" disabled />
        <Button
          type="secondary"
          children="Удалить запись"
          icon={<TrashIcon />}
        />
        <Button
          type="secondary"
          children="Удалить запись"
          icon={<TrashIcon />}
          disabled
        />
      </div>
    </div>
  );
};

export default MainPage;
