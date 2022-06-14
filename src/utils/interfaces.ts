export interface ICookieProps {
  [name: string]: string | number | boolean | Date | undefined;
  expires?: Date | number | string;
}

export interface IUserApi {
  user: { username?: string; email: string; password: string };
}

export interface ICommentApi {
  comment: { body: string };
}

export interface IArticleApi {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface IAuthor {
  username: string;
  image: string;
  date: string;
}
