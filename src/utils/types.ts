export type TErrors = {
  [name: string]: string;
};

export type TStatus = 'pending' | 'success' | 'failed';
export type TBy = 'author' | 'tag' | 'favorited';

export type TArticle = {
  author: TAuthor;
  body: string;
  link: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
  comments: TComment[];
};

export type TAuthor = {
  username: string;
  image: string;
  bio?: string;
  following: boolean;
};

export type TComment = {
  id: string;
  body: string;
  createdAt: string;
  author: TAuthor;
};

export type TUser = {
  username: string;
  email: string;
  bio?: string;
  image: string;
};

export type TProfile = {
  username: string;
  image: string;
  bio?: string;
  following: boolean;
};
