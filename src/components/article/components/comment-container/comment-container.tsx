import CommentInput from '../comment-input/comment-input';
import CommentList from '../comment-list/comment-list';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { TUser, TComment } from 'utils/types';
import styles from './comment-container.module.scss';
//--------------------------------------------------------------------------------

interface ICommentContainer {
  comments: TComment[];
  slug: string | undefined;
  currentUser: TUser | null;
}

const CommentContainer: FC<ICommentContainer> = ({
  comments,
  slug,
  currentUser,
}) => {
  return currentUser ? (
    <div className={styles.container}>
      <p className={styles.container__header}>Комментарии</p>
      <div className={styles.inputbox}>
        <CommentInput slug={slug} />
      </div>
      <CommentList comments={comments} slug={slug} currentUser={currentUser} />
    </div>
  ) : (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Sign in</Link>
        &nbsp;or&nbsp;
        <Link to="/register">sign up</Link>
        &nbsp;to add comments on this article.
      </p>
      <CommentList comments={comments} slug={slug} currentUser={currentUser} />
    </div>
  );
};

export default CommentContainer;
