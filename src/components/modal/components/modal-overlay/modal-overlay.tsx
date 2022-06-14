import styles from './modal-overlay.module.scss';
import { FC } from 'react';
//--------------------------------------------------------------------------------

const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        onClose();
      }}></div>
  );
};

export default ModalOverlay;
