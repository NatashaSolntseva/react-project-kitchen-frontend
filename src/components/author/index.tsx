import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './author.module.scss';
import { IAuthor } from 'utils/interfaces';
//--------------------------------------------------------------------------------

const Author: FC<IAuthor> = ({ username, image, date }) => {
  return (
    <Link to={`/profile/@${username}`} className={styles.author}>
      <img
        className={styles.author__image}
        alt={`${username}-avatar`}
        src={image}
      />
      <div className={styles.author__personal}>
        <p className={styles.author__name}>{username}</p>
        <p className={styles.author__date}>{date}</p>
      </div>
    </Link>
  );
};

export default Author;
