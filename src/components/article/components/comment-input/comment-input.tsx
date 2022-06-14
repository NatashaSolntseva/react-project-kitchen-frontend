import { FC, ChangeEvent, SyntheticEvent, useCallback } from 'react';
import { useState } from 'react';
import styles from './comment-input.module.scss';
import { Button } from 'components/button/button';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { postComment } from 'services/slices/articles';
import { toLocalDate } from 'utils/date-time';
import Author from '../../../../components/author';
import noAvatarImg from '../../../../assets/images/Intersect.svg';
//--------------------------------------------------------------------------------

interface ICommentInput {
  slug: string | undefined;
}

const CommentInput: FC<ICommentInput> = ({ slug }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.profile);
  const currentDate = toLocalDate();

  const [body, setBody] = useState('');

  const changeBody = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(evt.target.value);
  };

  const createComment = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      dispatch(postComment(slug, { comment: { body } }));
      setBody('');
    },
    [dispatch, slug, body]
  );

  return (
    <form onSubmit={createComment}>
      <div className={styles.line}>
        <textarea
          className={styles.textarea}
          placeholder="Напишите свой комментарий..."
          value={body}
          onChange={changeBody}
        />
      </div>
      <div className={styles.info}>
        <Author
          username={user.username}
          image={user.image ? user.image : noAvatarImg}
          date={currentDate}
        />
        <Button
          type="primary"
          color="primary"
          children="Отправить комментарий"
          disabled={body ? false : true}
        />
      </div>
    </form>
  );
};

export default CommentInput;
