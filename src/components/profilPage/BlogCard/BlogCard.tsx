import React from 'react'
import { IPicture } from '../../../interfaces';
import styles from './BlogCard.module.scss';
import moment from "moment";


export type CardProps = {
  title: string;
  description: string;
  updated_at: string;
  picture?: IPicture;
  onClick?: () => void;
};


function BlogCard({
  title,
  description,
  updated_at,
  picture,
  onClick = () => {},
}: CardProps): JSX.Element {
  return (
    <div className={styles.articlelist}>
      <button className={styles.listCard} onClick={onClick}>
        <div className={styles.card}>
       
        <img src={picture ? picture.link : "https://picsum.photos/1200/400?random=2"}
            alt={title}
          />

          <h4>{title}</h4>
          <p>{description}</p>
          <div className={styles.footerCard}>
            <p className="dateline">
              Last updated: {moment(updated_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
            </p>
            <button className={`${styles.editButton} btn btn-outline-secondary`}>Editer</button>
          </div>
        </div>
      </button>
    </div>
  );
}

export default BlogCard;