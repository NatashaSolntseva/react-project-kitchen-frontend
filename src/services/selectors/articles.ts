import { RootState } from 'services/store';

export const selectArticles = (state: RootState) => state.articles.articles;
export const selectArticlesRequest = (state: RootState) =>
  state.articles.articlesRequest;
export const selectArticlesFailed = (state: RootState) =>
  state.articles.articlesFailed;
export const selectCurrentArticle = (state: RootState) =>
  state.articles.currentArticle;
export const selectCurrentArticleFailed = (state: RootState) =>
  state.articles.currentArticlesFailed;
export const selectCurrentArticleRequest = (state: RootState) =>
  state.articles.currentArticlesRequest;
export const currentArticleRequest = (state: RootState) =>
  state.articles.currentArticlesRequest;
export const selectLazyArticles = (state: RootState) =>
  state.articles.lazyArticles;
export const selectLazyArticlesSuccess = (state: RootState) =>
  state.articles.lazyArticlesSuccess;
