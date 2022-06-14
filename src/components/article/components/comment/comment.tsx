import { FC, useCallback } from 'react';
import { TComment } from 'utils/types';
import styles from './comment.module.scss';
import { Button } from 'components/button/button';
import TrashIcon from 'components/icons/trash-icon';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { deleteComment } from 'services/slices/articles';
import { selectCurrentUser } from 'services/selectors/profile';
import { LikeButton } from 'components/like-button/like-button';
import Author from '../../../../components/author';
import { toLocalDate } from 'utils/date-time';
//--------------------------------------------------------------------------------

interface IComment {
  comment: TComment;
  slug: string | undefined;
}

const Comment: FC<IComment> = ({ comment, slug }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const showActions =
    currentUser && currentUser?.username === comment.author.username;
  const onCommentDelete = useCallback(() => {
    dispatch(deleteComment(slug, comment.id));
  }, [comment, dispatch, slug]);

  return (
    <div className={styles.container}>
      <div className={styles.smallcontainer}>
        <Author
          username={comment.author.username}
          image={comment.author.image}
          date={toLocalDate(comment.createdAt)}
        />
        {showActions ? (
          <div className={styles.box__trash}>
            <Button
              type="secondary"
              icon={<TrashIcon />}
              onClick={onCommentDelete}
            />
          </div>
        ) : (
          <LikeButton />
        )}
      </div>
      <div>
        <p className={styles.container__text}>{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;
