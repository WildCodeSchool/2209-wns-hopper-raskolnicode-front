import React from 'react'
import { IPicture } from '../../../interfaces';
import styles from './BlogCard.module.scss';

export type CardProps = {
  title: string;
  description: string;
  updated_at: string;
  picture?: IPicture;
  onClick?: () => void;
};

function BlogCard(props: CardProps): JSX.Element {
  return (
    <div className={styles.articlelist}>
      <div className={styles.listCard}>
        <div className={styles.card} onClick={props.onClick}>
          <img
            src="https://picsum.photos/1200/400?random=2"
            alt={props.title}
          />
          <h4>{props.title}</h4>
          <p>{props.description}</p>
          <div className={styles.footerCard}>
            <p className={styles.dateCreated}>{props.updated_at}</p>
            <button className={`${styles.editButton} btn btn-outline-secondary`} >Editer</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogCard
