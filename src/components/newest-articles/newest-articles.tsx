import { FC } from 'react';
import { useAppSelector } from 'services/hooks';
import { selectArticles } from 'services/selectors/articles';
import { TArticle } from 'utils/types';
import ArticleSmallPreview from '../article-small-preview/article-small-preview';
import styles from './newest-articles.module.scss';
//--------------------------------------------------------------------------------

const NewestArticles: FC = () => {
  const articles = useAppSelector(selectArticles);

  const dateSort = (arr: Array<TArticle>): Array<TArticle> => {
    const pivot = arr[0];
    const less: Array<TArticle> = [];
    const greater: Array<TArticle> = [];

    if (arr.length < 2) return arr;

    arr
      .slice(1)
      .forEach((element: TArticle) =>
        element.updatedAt > pivot.updatedAt
          ? less.push(element)
          : greater.push(element)
      );

    return dateSort(less).concat(pivot, dateSort(greater));
  };

  const sortedArticlesByDate = dateSort(articles).slice(0, 5);

  return (
    <>
      {!articles.length ? (
        <h2>Новых статей пока нет</h2>
      ) : (
        <>
          <h2>Свежие материалы</h2>
          <ul className={styles.newestArticles__list}>
            {sortedArticlesByDate.map((article: TArticle) => {
              return (
                <li key={article.slug} className={styles.newestArticles__item}>
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

export default NewestArticles;
