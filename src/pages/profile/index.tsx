import { FC, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import api from 'utils/api';
import { selectLazyArticles } from 'services/selectors/articles';
import { getLazyArticles, setLazyArticles } from 'services/slices/articles';
import {
  getProfile,
  resetSelectedProfile,
  followUser,
  unfollowUser,
} from 'services/slices/profile';
import ArticlePreview from 'components/article-preview/article-preview';
import styles from './profile.module.scss';
import { Button } from 'components/button/button';
import PlusIcon from 'components/icons/plus-icon';
import MinusIcon from 'components/icons/minus-icon';
import Loader from 'components/loader/loader';
//--------------------------------------------------------------------------------

const ProfilePage: FC = () => {
  const { username } = useParams();
  const { isAuth, user, selectedProfile } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();
  const articles = useAppSelector(selectLazyArticles);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const articlesByPage = 6;

  useEffect(() => {
    dispatch(getProfile(username));
    return () => {
      dispatch(resetSelectedProfile());
    };
  }, [dispatch, username]);

  useEffect(() => {
    selectedProfile?.username &&
      dispatch(
        getLazyArticles(articlesByPage, 'author', `${selectedProfile.username}`)
      );
  }, [dispatch, selectedProfile]);

  const fetchArticles = async () => {
    const res = api.getArticlesBy(
      'author',
      `${selectedProfile?.username}`,
      articlesByPage,
      page
    );
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

  return (
    <>
      {!selectedProfile ? (
        <div
          style={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader />
        </div>
      ) : (
        <div className={styles.profile}>
          <div className={styles.usercontainer}>
            <div className={styles.avatar}>
              <img
                src={selectedProfile.image}
                className={styles.avatar__img}
                alt={selectedProfile.username}
              />
            </div>
            <h4 className={styles.usercontainer__text}>
              {selectedProfile ? selectedProfile.username : ''}
            </h4>
            {isAuth && username !== user.username && (
              <Button
                type="primary"
                color="primary"
                icon={selectedProfile.following ? <MinusIcon /> : <PlusIcon />}
                children={
                  selectedProfile.following ? 'Отписаться' : 'Подписаться'
                }
                onClick={() => {
                  selectedProfile.following
                    ? dispatch(unfollowUser(username))
                    : dispatch(followUser(username));
                }}
              />
            )}
          </div>
          {articles.length === 0 ? (
            <p className={styles.msg}>
              Пока статей нет, но мы работаем над их появлением!
            </p>
          ) : (
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<Loader scale={0.5} />}
              endMessage={<p className={styles.msg}>Теперь ты знаешь все!</p>}>
              <ul className={styles.list}>
                {articles.map((article) => {
                  return (
                    <ArticlePreview article={article} key={article.slug} />
                  );
                })}
              </ul>
            </InfiniteScroll>
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
