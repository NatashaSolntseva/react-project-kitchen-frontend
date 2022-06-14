import { FC } from 'react';
import styles from './article-small-preview.module.scss';
import { Link } from 'react-router-dom';
import Author from '../../components/author';
import { toLocalDate } from 'utils/date-time';
import { LikeButton } from 'components/like-button/like-button';
//--------------------------------------------------------------------------------

interface IArticleSmallPreview {
  author: string;
  image: string;
  title: string;
  likes: number;
  date: string;
  slug: string;
  favorited: boolean;
}

const ArticleSmallPreview: FC<IArticleSmallPreview> = ({
  author,
  image,
  title,
  likes,
  date,
  slug,
  favorited,
}) => {
  return (
    <div className={styles.articleSmallPreview}>
      <div className={styles.articleSmallPreview__info}>
        <Author username={author} image={image} date={toLocalDate(date)} />
        <div className={styles.articleSmallPreview__likes}>
          <p className={styles.articleSmallPreview__likesCounter}>{likes}</p>
          <LikeButton active={favorited} />
        </div>
      </div>
      <Link
        to={`/articles/${slug}`}
        className={styles.articleSmallPreview__titleLink}>
        {title}
      </Link>
    </div>
  );
};

export default ArticleSmallPreview;
