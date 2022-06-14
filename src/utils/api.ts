import axios from 'axios';
import { IUserApi, ICommentApi, IArticleApi } from './interfaces';
import { TBy } from './types';
import { getCookie } from './cookie';
const BASE_URL = 'http://localhost:3000/api';

type TBaseUrl = { baseUrl: string };

class Api {
  _baseUrl: string;
  constructor({ baseUrl }: TBaseUrl) {
    this._baseUrl = baseUrl;
  }

  _limit(limit: number, page: number): string {
    return `limit=${limit}&offset=${page * limit}`;
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++AUTH
  signIn(data: IUserApi) {
    return axios
      .post(`${BASE_URL}/users/login`, {
        ...data,
      })
      .then((res) => res.data);
  }

  register(data: IUserApi) {
    return axios
      .post(`${BASE_URL}/users`, {
        ...data,
      })
      .then((res) => res.data);
  }

  patchUser(data: IUserApi) {
    return axios
      .put(
        `${BASE_URL}/user`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((res) => res.data);
  }

  getUser() {
    return axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((res) => res.data);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++PROFILE
  getProfile(username: string) {
    return axios
      .get(`${BASE_URL}/profiles/${username}`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((res) => res.data);
  }

  followUser(username: string) {
    return axios
      .post(
        `${BASE_URL}/profiles/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((res) => res.data);
  }

  unfollowUser(username: string) {
    return axios
      .delete(`${BASE_URL}/profiles/${username}/follow`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((res) => res.data);
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++COMMENTS
  getComments(slug: string) {
    return axios
      .get(`${BASE_URL}/articles/${slug}/comments/`)
      .then((response) => response.data.comments);
  }

  addComment(slug: string, data: ICommentApi) {
    return axios
      .post(
        `${BASE_URL}/articles/${slug}/comments`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((response) => response.data.comment);
  }

  deleteComment(slug: string, commentId: string) {
    return axios.delete(`${BASE_URL}/articles/${slug}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++TAGS
  getTags() {
    return axios.get(`${BASE_URL}/tags`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ARTICLES
  createArticle(data: IArticleApi) {
    return axios
      .post(
        `${BASE_URL}/articles`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((response) => response.data.article);
  }

  updateArticle(slug: string, data: IArticleApi) {
    return axios
      .put(
        `${BASE_URL}/articles/${slug}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((response) => response.data.article);
  }

  getArticle(slug: string) {
    return axios
      .get(`${BASE_URL}/articles/${slug}`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => response.data.article);
  }

  getArticlesBy(
    by?: TBy,
    value: string = '',
    limit: number = 0,
    page: number = 0
  ) {
    return axios
      .get(
        `${BASE_URL}/articles?${by ? by : ''}=${encodeURIComponent(
          value
        )}&${this._limit(limit, page === 0 || page < 0 ? 0 : page - 1)}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((response) => response.data.articles);
  }

  deleteArticle(slug: string) {
    return axios.delete(`${BASE_URL}/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
  }

  favoriteArticle(slug: string) {
    return axios
      .post(
        `${BASE_URL}/articles/${slug}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      )
      .then((response) => response.data.article);
  }

  unfavoriteArticle(slug: string) {
    return axios
      .delete(`${BASE_URL}/articles/${slug}/favorite`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      })
      .then((response) => response.data.article);
  }

  getFeed(limit: number = 10, page: number = 0) {
    return axios.get(
      `${BASE_URL}/articles/feed?${this._limit(
        limit,
        page === 0 || page < 0 ? 0 : page - 1
      )}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      }
    );
  }
}

export default new Api({
  baseUrl: BASE_URL,
});
