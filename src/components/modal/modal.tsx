import styles from './modal.module.scss';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from './components/modal-overlay/modal-overlay';
import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
//--------------------------------------------------------------------------------

const Modal: FC<{
  children?: ReactElement;
  title?: string;
  onClose: () => void;
}> = ({ children, title, onClose }) => {
  const navigate = useNavigate();
  const rootModal = document.getElementById('root-modal');

  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && navigate(-1);
    };
    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, [navigate]);

  return createPortal(
    <div className={styles.popup}>
      <div className={styles.popup__wrapper}>
        <button
          onClick={() => {
            onClose();
          }}
          className={styles.popup__closeButton}
        />
        <h2 className={styles.popup__title}>{title}</h2>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    rootModal!
  );
};
export default Modal;
