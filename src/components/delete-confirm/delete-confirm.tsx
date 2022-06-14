import { FC, SyntheticEvent } from 'react';
import styles from './delete-confirm.module.scss';
import { Button } from 'components/button/button';
//--------------------------------------------------------------------------------

const DeleteConfirm: FC<{
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
}> = ({ onClick }) => {
  return (
    <>
      <p className={styles.text}>
        Нажимая кнопку «Удалить запись», материал будет удален без возможности
        восстановления.
      </p>
      <Button
        type="primary"
        color="secondary"
        children="Удалить запись"
        onClick={onClick}
      />
    </>
  );
};

export default DeleteConfirm;
