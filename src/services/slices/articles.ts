import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'services/store';
import api from 'utils/api';
import { IArticleApi, ICommentApi } from 'utils/interfaces';
import { TArticle, TComment, TStatus, TBy } from 'utils/types';

type TInitialState = {
  currentArticle: TArticle | null | undefined;
  articles: TArticle[];
  lazyArticles: TArticle[];
  fetchLazyArticles: TArticle[];
  fetchLazyStatus: TStatus;
  tags: string[];
  tag: string | null;
  lazyArticlesRequest: boolean;
  lazyArticlesSuccess: boolean;
  lazyArticlesFailed: boolean;
  articlesRequest: boolean;
  articlesFailed: boolean;
  currentArticlesRequest: boolean;
  currentArticlesFailed: boolean;
  addCommentRequest: boolean;
  addCommentFailed: boolean;
  deleteCommentRequest: boolean;
  deleteCommentFailed: boolean;
};

export const initialState: TInitialState = {
  currentArticle: null,
  articles: [],
  lazyArticles: [],
  fetchLazyArticles: [],
  fetchLazyStatus: 'success',
  tags: [],
  tag: null,
  lazyArticlesRequest: false,
  lazyArticlesSuccess: false,
  lazyArticlesFailed: false,
  articlesRequest: false,
  articlesFailed: false,
  currentArticlesRequest: false,
  currentArticlesFailed: false,
  addCommentRequest: false,
  addCommentFailed: false,
  deleteCommentRequest: false,
  deleteCommentFailed: false,
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    getLazyArticlesRequest(state) {
      state.lazyArticlesRequest = true;
    },
    getLazyArticlesSuccess(state, action: PayloadAction<TArticle[]>) {
      state.lazyArticles = action.payload;
      state.lazyArticlesSuccess = true;
      state.lazyArticlesFailed = false;
      state.lazyArticlesRequest = false;
    },
    getLazyArticlesFailed(state) {
      state.lazyArticlesSuccess = false;
      state.lazyArticlesFailed = true;
      state.lazyArticlesRequest = false;
    },
    setLazyArticles(state, action: PayloadAction<TArticle[]>) {
      state.lazyArticles = [...state.lazyArticles, ...action.payload];
    },
    fetchLazyArticlesPending(state) {
      state.fetchLazyStatus = 'pending';
    },
    fetchLazyArticlesSuccess(state, action: PayloadAction<TArticle[]>) {
      state.fetchLazyStatus = 'success';
    },
    fetchLazyArticlesFailed(state) {
      state.fetchLazyStatus = 'failed';
    },
    resetLazyArticles(state) {
      state.lazyArticles = [];
    },
    getArticlesRequest(state) {
      state.articlesRequest = true;
    },
    getArticlesSuccess(state, action: PayloadAction<TArticle[]>) {
      state.articles = action.payload;
      state.articlesFailed = false;
      state.articlesRequest = false;
    },
    getArticlesFailed(state) {
      state.articlesFailed = true;
      state.articlesRequest = false;
    },
    getCurrentArticleSuccess(
      state,
      action: PayloadAction<[TArticle, TComment[]]>
    ) {
      state.currentArticle = action.payload[0];
      state.currentArticle.comments = action.payload[1];
      state.currentArticlesRequest = false;
    },
    getCurrentArticleRequest(state) {
      state.currentArticlesRequest = true;
    },
    getCurrentArticleFailed(state) {
      state.currentArticlesFailed = true;
      state.currentArticlesRequest = false;
    },
    resetCurrentArticle(state) {
      state.currentArticle = null;
    },
    addCommentRequest(state) {
      state.addCommentRequest = true;
    },
    addCommentFailed(state) {
      state.addCommentFailed = true;
      state.addCommentRequest = false;
    },
    addCommentSuccess(state, action: PayloadAction<TComment>) {
      state.currentArticle?.comments.unshift(action.payload);
    },
    deleteCommentRequest(state) {
      state.deleteCommentRequest = true;
    },
    deleteCommentFailed(state) {
      state.deleteCommentFailed = true;
      state.deleteCommentRequest = false;
    },
    deleteCommentSuccess(state, action: PayloadAction<string>) {
      if (state.currentArticle) {
        state.currentArticle.comments = state.currentArticle?.comments.filter(
          (comment) => comment.id !== action.payload
        );
      } else {
        return initialState;
      }
    },
    toggleArticleSuccess(state, action: PayloadAction<TArticle>) {
      state.articles.forEach((article) => {
        if (state.currentArticle && article?.slug === action.payload.slug) {
          state.currentArticle.favorited = action.payload.favorited;
          state.currentArticle.favoritesCount = action.payload.favoritesCount;
          article.favorited = action.payload.favorited;
          article.favoritesCount = action.payload.favoritesCount;
        }
      });
      state.lazyArticles.forEach((article) => {
        if (state.currentArticle && article?.slug === action.payload.slug) {
          article.favorited = action.payload.favorited;
          article.favoritesCount = action.payload.favoritesCount;
        }
      });
    },
    deleteArticleSuccess(state, action: PayloadAction<string>) {
      state.currentArticle = initialState.currentArticle;
      state.articles = state.articles.filter(
        (article) => article?.slug !== action.payload
      );
      state.lazyArticles = state.articles.filter(
        (article) => article?.slug !== action.payload
      );
    },
    addArticleSuccess(state, action: PayloadAction<TArticle>) {
      state.currentArticle = action.payload;
      state.articles.unshift(action.payload);
      state.lazyArticles.unshift(action.payload);
    },
    editArticleSuccess(state, action: PayloadAction<TArticle>) {
      state.articles.forEach((article) => {
        if (state.currentArticle && article?.slug === action.payload.slug) {
          state.currentArticle = action.payload;
          const editedArticleIndex = state.articles.findIndex(
            (article) => article?.slug === action.payload.slug
          );
          state.articles[editedArticleIndex] = action.payload;
          state.lazyArticles[editedArticleIndex] = action.payload;
        }
      });
      state.currentArticle = initialState.currentArticle;
    },
    resetArticles() {
      return initialState;
    },
  },
});

export const {
  getLazyArticlesRequest,
  getLazyArticlesSuccess,
  getLazyArticlesFailed,
  setLazyArticles,
  resetLazyArticles,
  getArticlesRequest,
  getArticlesSuccess,
  getArticlesFailed,
  getCurrentArticleSuccess,
  getCurrentArticleRequest,
  getCurrentArticleFailed,
  resetCurrentArticle,
  addCommentRequest,
  addCommentFailed,
  addCommentSuccess,
  deleteCommentRequest,
  deleteCommentFailed,
  deleteCommentSuccess,
  toggleArticleSuccess,
  deleteArticleSuccess,
  addArticleSuccess,
  editArticleSuccess,
  resetArticles,
} = articleSlice.actions;

export const getLazyArticles: AppThunk =
  (
    articlesByPage: number,
    by: TBy | undefined = undefined,
    value: string | undefined = undefined
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(getLazyArticlesRequest());
    api
      .getArticlesBy(by, value, articlesByPage, 1)
      .then((data) => dispatch(getLazyArticlesSuccess(data)))
      .catch((err) => {
        dispatch(getLazyArticlesFailed());
        console.log(`Ошибка загрузки списка статей: ${err}`);
      });
  };

export const getArticlesData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getArticlesRequest());
  api
    .getArticlesBy()
    .then((data) => {
      dispatch(getArticlesSuccess(data));
    })
    .catch((err) => {
      dispatch(getArticlesFailed());
      console.log(`Ошибка загрузки списка статей: ${err}`);
    });
};

export const getCurrentArticle: AppThunk =
  (slug: string) => (dispatch: AppDispatch) => {
    dispatch(getCurrentArticleRequest());
    Promise.all([api.getArticle(slug), api.getComments(slug)])
      .then((data) => {
        dispatch(getCurrentArticleSuccess(data));
      })
      .catch((err) => {
        dispatch(getCurrentArticleFailed());
        console.log(`Ошибка загрузки статьи: ${err}`);
      });
  };

export const postComment: AppThunk =
  (slug: string, comment: ICommentApi) => (dispatch: AppDispatch) => {
    dispatch(addCommentRequest());
    api
      .addComment(slug, comment)
      .then((data) => {
        dispatch(addCommentSuccess(data));
      })
      .catch((err) => {
        dispatch(addCommentFailed());
        console.log(`Ошибка добавления комментария: ${err}`);
      });
  };

export const deleteComment: AppThunk =
  (slug: string, commentId: string) => (dispatch: AppDispatch) => {
    dispatch(deleteCommentRequest());
    api
      .deleteComment(slug, commentId)
      .then(() => {
        dispatch(deleteCommentSuccess(commentId));
      })
      .catch((err) => {
        dispatch(deleteCommentFailed());
        console.log(`Ошибка удаления комментария: ${err}`);
      });
  };

export const likeArticle: AppThunk =
  (slug: string) => (dispatch: AppDispatch) => {
    api
      .favoriteArticle(slug)
      .then((article) => {
        dispatch(toggleArticleSuccess(article));
      })
      .catch((err) => {
        console.log(`Ошибка лайка статьи: ${err}`);
      });
  };

export const unlikeArticle: AppThunk =
  (slug: string) => (dispatch: AppDispatch) => {
    api
      .unfavoriteArticle(slug)
      .then((article) => {
        dispatch(toggleArticleSuccess(article));
      })
      .catch((err) => {
        console.log(`Ошибка удаления лайка статьи: ${err}`);
      });
  };

export const deleteArticle: AppThunk =
  (slug: string) => (dispatch: AppDispatch) => {
    api
      .deleteArticle(slug)
      .then(() => {
        dispatch(deleteArticleSuccess(slug));
      })
      .catch((err) => {
        console.log(`Ошибка удаления статьи: ${err}`);
      });
  };

export const addArticle: AppThunk =
  (data: IArticleApi) => (dispatch: AppDispatch) => {
    api
      .createArticle(data)
      .then((article) => {
        dispatch(addArticleSuccess(article));
      })
      .catch((err) => {
        console.log(`Ошибка публикации статьи: ${err}`);
      });
  };

export const editArticle: AppThunk =
  (slug: string, data: IArticleApi) => (dispatch: AppDispatch) => {
    api
      .updateArticle(slug, data)
      .then((article) => {
        dispatch(editArticleSuccess(article));
      })
      .catch((err) => {
        console.log(`Ошибка обновления статьи: ${err}`);
      });
  };

export default articleSlice.reducer;
