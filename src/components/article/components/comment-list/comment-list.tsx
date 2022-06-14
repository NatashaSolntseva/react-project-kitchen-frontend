import { FC } from 'react';
import { TComment, TUser } from 'utils/types';
import Comment from '../comment/comment';
//--------------------------------------------------------------------------------

interface ICommentList {
  comments: TComment[];
  currentUser: TUser | null;
  slug: string | undefined;
}

const CommentList: FC<ICommentList> = ({ comments, currentUser, slug }) => {
  return (
    <>
      {comments?.map((comment: TComment) => (
        <Comment comment={comment} slug={slug} key={comment.id} />
      ))}
    </>
  );
};

export default CommentList;
