import { FC } from 'react';
import { useAppSelector } from 'services/hooks';
import { selectArticles } from 'services/selectors/articles';
import { TArticle } from 'utils/types';
import ArticleSmallPreview from '../article-small-preview/article-small-preview';
import styles from './popular-articles.module.scss';
//--------------------------------------------------------------------------------

const PopularArticles: FC = () => {
  const articles = useAppSelector(selectArticles);

  const popularSort = (arr: Array<TArticle>): Array<TArticle> => {
    const pivot = arr[0];
    const less: Array<TArticle> = [];
    const greater: Array<TArticle> = [];

    if (arr.length < 2) return arr;

    arr
      .slice(1)
      .forEach((element: TArticle) =>
        element.favoritesCount > pivot.favoritesCount
          ? less.push(element)
          : greater.push(element)
      );

    return popularSort(less).concat(pivot, popularSort(greater));
  };

  const sortedArticlesByLikes = popularSort(articles).slice(0, 5);

  return (
    <>
      {!articles.length ? (
        <h2>Популярных статей пока нет</h2>
      ) : (
        <>
          <h1>Популярные материалы</h1>
          <ul className={styles.popularArticles__list}>
            {sortedArticlesByLikes.map((article: TArticle) => {
              return (
                <li
                  key={article.updatedAt}
                  className={styles.popularArticles__item}>
                  <ArticleSmallPreview
                    author={article.author.username}
                    image={article.author.image}
                    title={article.title}
                    likes={article.favoritesCount}
                    date={article.updatedAt}
                    slug={article.slug}
                    favorited={article.favorited}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default PopularArticles;
