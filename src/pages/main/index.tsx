import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticlePreview from '../../components/article-preview/article-preview';
import styles from './main.module.scss';
import { useAppSelector, useAppDispatch } from 'services/hooks';
import { selectLazyArticles } from 'services/selectors/articles';
import { getLazyArticles, setLazyArticles } from 'services/slices/articles';
import PopularArticles from 'components/popular-articles/popular-articles';
import PopularTags from 'components/popular-tags/popular-tags';
import api from 'utils/api';
import Loader from 'components/loader/loader';
//--------------------------------------------------------------------------------

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectLazyArticles);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const articlesByPage = 6;

  useEffect(() => {
    dispatch(getLazyArticles(articlesByPage));
  }, [dispatch]);

  const fetchArticles = async () => {
    const res = api.getArticlesBy(undefined, undefined, articlesByPage, page);
    const data = await res;
    return data;
  };

  const fetchData = async () => {
    const articlesFormServer = await fetchArticles();

    dispatch(setLazyArticles(articlesFormServer));
    if (
      articlesFormServer.length === 0 ||
      articlesFormServer.length < articlesByPage
    ) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  if (articles.length === 0) {
    return (
      <div className={styles.msg}>
        Пока статей нет, но мы работаем над их появлением!
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader scale={0.5} />}
      endMessage={<p className={styles.msg}>Теперь ты знаешь все!</p>}>
      <div className={styles.container}>
        <ul className={styles.main}>
          {articles.map((article) => {
            return <ArticlePreview article={article} key={article.slug} />;
          })}
        </ul>
        <div className={styles.rightbord}>
          <PopularTags />

          <div>
            <PopularArticles />
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default MainPage;
