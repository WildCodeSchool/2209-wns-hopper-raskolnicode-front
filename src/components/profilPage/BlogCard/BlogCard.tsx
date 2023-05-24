import React from 'react'
import { IBlog, IPicture } from '../../../interfaces';
import styles from './BlogCard.module.scss';
import moment from "moment";
import { Link } from 'react-router-dom';


export type CardProps = {
  blog: IBlog
};


function BlogCard({
  blog }: CardProps): JSX.Element {
  return (
    <div className={styles.articlelist}>
      <button className={styles.listCard}>
        <div className={styles.card}>
          <Link to={`/blog/${blog.id}`}>
            <img src={blog.picture ? blog.picture.link : "https://picsum.photos/1200/400?random=2"}
              alt={blog.name}
            />
          </Link>
          <h4>{blog.name}</h4>
          <p>{blog.description}</p>
          <div className={styles.footerCard}>
            <p className="dateline">
              Last updated: {moment(blog.updated_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
            </p>
            <Link to={`/blog/${blog.id}/modifier`}>
              <button className={`${styles.editButton} btn btn-outline-secondary`}>Editer</button>
            </Link>
          </div>
        </div>
      </button>
    </div>
  );
}

export default BlogCard;