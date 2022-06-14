import LikeIcon from 'components/icons/like-icon';
import { FC, SyntheticEvent } from 'react';
import styles from './like-button.module.scss';
//--------------------------------------------------------------------------------

export const LikeButton: FC<{
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  active?: boolean;
}> = ({ onClick, active = false }) => {
  const likeButtonClass = active
    ? `${styles.like} ${styles.like__active}`
    : `${styles.like}`;

  return (
    <button onClick={onClick} className={likeButtonClass}>
      <LikeIcon active={active} />
    </button>
  );
};
