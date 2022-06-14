import { ChangeEvent, FC, SyntheticEvent, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'components/button/button';
import TrashIcon from 'components/icons/trash-icon';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { selectCurrentArticle } from 'services/selectors/articles';
import { editArticle, getCurrentArticle } from 'services/slices/articles';
import styles from './editor-page.module.scss';
//--------------------------------------------------------------------------------

const EditorPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const location = useLocation();
  const article = useAppSelector(selectCurrentArticle);
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setAbout] = useState('');
  const [link, setImage] = useState('');
  const [body, setText] = useState('');
  const [tags, setTags] = useState('');
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    dispatch(getCurrentArticle(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (article && !inProgress) {
      setTitle(article.title);
      setAbout(article.description);
      setImage(article.link);
      setText(article.body);
      setTags(article.tagList.map((tag: string) => tag.trim()).join(', '));
    }
  }, [article, inProgress]);

  const onTitleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTitle(evt.target.value);
    setInProgress(true);
  };
  const onAboutChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(evt.target.value);
    setInProgress(true);
  };
  const onImageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setImage(evt.target.value);
    setInProgress(true);
  };
  const onTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
    setInProgress(true);
  };
  const onTagsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setTags(evt.target.value);
    setInProgress(true);
  };

  const onEditComfirm = (evt: SyntheticEvent) => {
    evt.preventDefault();
    const editedArticleData = {
      article: {
        title,
        description,
        body,
        link,
        tagList: Array.from(new Set(tags?.split(','))),
      },
    };
    dispatch(editArticle(article?.slug, editedArticleData));
    history(`/articles/${article?.slug}`);
  };

  return (
    <div className={styles.editArticle}>
      <h1 className={styles.editArticle__title}>Редактировать запись</h1>
      <form className={styles.editArticle__form} onSubmit={onEditComfirm}>
        <label className={styles.editArticle__label}>
          <p className={styles.editArticle__labelText}>Название статьи</p>
          <input
            className={styles.editArticle__input}
            name="title"
            onChange={onTitleChange}
            value={title}
            required
          />
        </label>
        <label className={styles.editArticle__label}>
          <p className={styles.editArticle__labelText}>О чем статья</p>
          <textarea
            onChange={onAboutChange}
            name="about"
            className={`${styles.editArticle__input} ${styles.editArticle__input_textarea}`}
            rows={4}
            value={description}
            required
          />
        </label>
        <label className={styles.editArticle__label}>
          <p className={styles.editArticle__labelText}>
            URL изображения (опционально)
          </p>
          <input
            className={styles.editArticle__input}
            onChange={onImageChange}
            name="link"
            value={link}
          />
        </label>
        <label className={styles.editArticle__label}>
          <p className={styles.editArticle__labelText}>Текст статьи</p>
          <textarea
            onChange={onTextChange}
            name="body"
            className={`${styles.editArticle__input} ${styles.editArticle__input_textarea}`}
            rows={24}
            value={body}
            required
          />
        </label>
        <label className={styles.editArticle__label}>
          <p className={styles.editArticle__labelText}>Теги (через запятую)</p>
          <input
            className={styles.editArticle__input}
            onChange={onTagsChange}
            name="tags"
            value={tags}
          />
        </label>
        <div className={styles.editArticle__buttons}>
          <Button
            type="primary"
            htmlType="submit"
            children="Сохранить запись"
            icon={<TrashIcon />}
          />
          <Link to={`/modal`} state={{ backgroundLocation: location }}>
            <Button
              type="secondary"
              children="Удалить запись"
              icon={<TrashIcon />}
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditorPage;
