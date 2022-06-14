import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './article-meta.module.scss';
import { LikeButton } from '../../../like-button/like-button';
import { toLocalDate } from 'utils/date-time';
import { TArticle } from 'utils/types';
import { useAppDispatch } from 'services/hooks';
import { likeArticle, unlikeArticle } from 'services/slices/articles';
//--------------------------------------------------------------------------------

interface IArticleMeta {
  article: TArticle | null | undefined;
}

const ArticleMeta: FC<IArticleMeta> = ({ article }) => {
  const dispatch = useAppDispatch();
  const currentDate = toLocalDate(article?.createdAt);

  const onLikeClick = () => {
    if (article && !article.favorited) {
      dispatch(likeArticle(article.slug));
    } else {
      if (article && article.favorited) dispatch(unlikeArticle(article.slug));
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.info}>
        <Link
          to={`/@${article?.author?.username}`}
          className={styles.info__link}>
          <p className={styles.info__text}>{article?.author?.username}</p>
        </Link>
        <p className={styles.info__text}>{currentDate}</p>
        <div className={styles.info__likes}>
          <span>{article?.favoritesCount}</span>
          <LikeButton onClick={onLikeClick} active={article?.favorited} />
        </div>
      </div>
    </div>
  );
};

export default ArticleMeta;
