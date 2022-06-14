import { FC } from 'react';
import styles from './new-article-page.module.scss';
import { Button } from 'components/button/button';
import { useAppDispatch, useAppSelector } from 'services/hooks';
import { addArticle } from 'services/slices/articles';
import { useNavigate } from 'react-router-dom';
import { selectCurrentArticle } from 'services/selectors/articles';
import { useForm } from 'react-hook-form';
//--------------------------------------------------------------------------------

type TNewArticleFormData = {
  title: string;
  description: string;
  link: string;
  body: string;
  tags: string;
};

const NewArticlePage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const article = useAppSelector(selectCurrentArticle);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<TNewArticleFormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      link: '',
      body: '',
      tags: '',
    },
  });

  const handleNewArticleSubmit = ({
    title,
    description,
    body,
    link,
    tags,
  }: TNewArticleFormData) => {
    const newArticleData = {
      article: {
        title,
        description,
        body,
        link,
        tagList: Array.from(new Set(tags.split(','))),
      },
    };
    dispatch(addArticle(newArticleData));
    history(`/articles/${article?.slug}`);
  };

  return (
    <section className={styles.newArticle}>
      <h2 className={styles.newArticle__title}>Новая запись</h2>
      <form
        className={styles.newArticle__form}
        onSubmit={handleSubmit(handleNewArticleSubmit)}>
        <fieldset className={styles.newArticle__fieldset}>
          <label className={styles.newArticle__label}>
            Название статьи
            <input
              type="text"
              className={styles.newArticle__input}
              {...register('title', {
                required: 'Пожалуйста, заполните это поле',
              })}></input>
          </label>
          <div className={styles.newArticle__errorsWrapper}>
            {errors?.title && (
              <p className={styles.newArticle__errorText}>
                {errors?.title?.message}
              </p>
            )}
          </div>
          <label className={styles.newArticle__label}>
            О чем статья
            <input
              className={styles.newArticle__input}
              {...register('description', {
                required: 'Пожалуйста, заполните это поле',
              })}></input>
          </label>
          <div className={styles.newArticle__errorsWrapper}>
            {errors?.description && (
              <p className={styles.newArticle__errorText}>
                {errors?.description?.message}
              </p>
            )}
          </div>
          <label className={styles.newArticle__label}>
            URL изображения (опционально)
            <input
              type="url"
              className={styles.newArticle__input}
              {...register('link', {
                pattern: {
                  value:
                    /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
                  message: 'Неверный формат ссылки',
                },
              })}></input>
          </label>
          <div className={styles.newArticle__errorsWrapper}>
            {errors?.link && (
              <p className={styles.newArticle__errorText}>
                {errors?.link?.message}
              </p>
            )}
          </div>
          <label className={styles.newArticle__label}>
            Текст статьи
            <textarea
              className={`${styles.newArticle__input} ${styles.newArticle__input_wide}`}
              {...register('body', {
                required: 'Пожалуйста, заполните это поле',
              })}></textarea>
          </label>
          <div className={styles.newArticle__errorsWrapper}>
            {errors?.body && (
              <p className={styles.newArticle__errorText}>
                {errors?.body?.message}
              </p>
            )}
          </div>
          <label className={styles.newArticle__label}>
            Теги (через запятую)
            <input
              className={styles.newArticle__input}
              {...register('tags', {
                required: 'Пожалуйста, заполните это поле',
              })}></input>
          </label>
          <div className={styles.newArticle__errorsWrapper}>
            {errors?.tags && (
              <p className={styles.newArticle__errorText}>
                {errors?.tags?.message}
              </p>
            )}
          </div>
          <div className={styles.newArticle__button}>
            <Button
              color="primary"
              type="primary"
              htmlType="submit"
              children="Опубликовать запись"
              disabled={!isValid}
            />
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default NewArticlePage;
