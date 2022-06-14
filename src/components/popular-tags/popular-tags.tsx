import { FC } from 'react';
import { useAppSelector } from 'services/hooks';
import { selectArticles } from 'services/selectors/articles';
import styles from './popular-tags.module.scss';
//--------------------------------------------------------------------------------

const PopularTags: FC = () => {
  const articles = useAppSelector(selectArticles);
  const tagsLists: Array<string[]> = [];
  articles.forEach(article => tagsLists.push(article.tagList));
  const uniqueTags: Array<string> = [];
  tagsLists.forEach(tagsList => tagsList[0].split(' ').forEach(tag => {
    if (!uniqueTags.includes(tag)) uniqueTags.push(tag)
  }))

  const activeLocalTags: Array<string> = ['опыт'];

  return (
    <div className={styles.popularTags}>
      <h1 className={styles.popularTags__title}>Популярные теги</h1>
      <ul className={styles.popularTags__tagsList}>
        {uniqueTags.map((tag, i) => (
          <li
            key={i}
            className={`
                  ${styles.popularTags__tagsItem}
                  ${
                    activeLocalTags.includes(tag)
                      ? styles.popularTags__tagsItem_active
                      : ''
                  }
                `}>
            {`#${tag}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTags;
