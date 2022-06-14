import { FC, lazy, Suspense, useEffect } from 'react';
import NotFound from 'pages/not-found';
import Loader from '../loader/loader';
import Modal from '../modal/modal';
import DeleteConfirm from 'components/delete-confirm/delete-confirm';
import Layout from '../layout';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import RequireAuth from '../../hoc/require-auth';
import '../../scss/_fonts.scss';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { deleteArticle, getArticlesData } from 'services/slices/articles';
import {
  selectCurrentArticle,
  selectArticlesRequest,
} from 'services/selectors/articles';
import { getUser } from 'services/slices/profile';
const MainPage = lazy(() => import('../../pages/main'));
const LoginPage = lazy(() => import('../../pages/login'));
const RegisterPage = lazy(() => import('../../pages/register'));
const SettingsPage = lazy(() => import('../../pages/settings'));
const ArticlePage = lazy(() => import('../../pages/article'));
const NewArticlePage = lazy(() => import('../../pages/new-article'));
const EditorPage = lazy(() => import('../../pages/editor'));
const ProfilePage = lazy(() => import('../../pages/profile'));
//--------------------------------------------------------------------------------

const App: FC = () => {
  const location = useLocation();
  const history = useNavigate();
  const state = location.state as { backgroundLocation?: Location };
  const article = useAppSelector(selectCurrentArticle);
  const request = useAppSelector(selectArticlesRequest);
  const dispatch = useAppDispatch();

  const handleArticleDelete = () => {
    dispatch(deleteArticle(article?.slug));
    history('/', { replace: true });
  };

  useEffect(() => {
    dispatch(getArticlesData());
    dispatch(getUser());
  }, [dispatch]);

  const onModalClose = () => {
    history(-1);
  };

  return (
    <>
      {request ? (
        <Loader />
      ) : (
        <>
          <Routes location={state?.backgroundLocation || location}>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <Suspense fallback={<Loader />}>
                    <MainPage />
                  </Suspense>
                }
              />
              <Route
                path="articles/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <ArticlePage />
                  </Suspense>
                }
              />
              <Route
                path="profile/@:username"
                element={
                  <Suspense fallback={<Loader />}>
                    <ProfilePage />
                  </Suspense>
                }
              />
              <Route
                path="login"
                element={
                  <Suspense fallback={<Loader />}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="register"
                element={
                  <Suspense fallback={<Loader />}>
                    <RegisterPage />
                  </Suspense>
                }
              />
              <Route
                path="settings"
                element={
                  <RequireAuth
                    children={
                      <Suspense fallback={<Loader />}>
                        <SettingsPage />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="new-article"
                element={
                  <RequireAuth
                    children={
                      <Suspense fallback={<Loader />}>
                        <NewArticlePage />
                      </Suspense>
                    }
                  />
                }
              />
              <Route
                path="editor/:id"
                element={
                  <RequireAuth
                    children={
                      <Suspense fallback={<Loader />}>
                        <EditorPage />
                      </Suspense>
                    }
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          {state?.backgroundLocation && (
            <Routes>
              <Route
                path="modal"
                element={
                  <Modal
                    onClose={onModalClose}
                    title="Удалить запись"
                    children={<DeleteConfirm onClick={handleArticleDelete} />}
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </>
  );
};

export default App;
