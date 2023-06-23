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
    <div className={styles.card}>
      <Link to={`/blog/${blog.id}`}>
        <img  className={styles.blogCardImg} src={blog.picture ? blog.picture.link : "https://picsum.photos/1200/400?random=2"}
          alt={blog.name}
        />
      </Link>
      <div>
        <div className={styles.boxCardContent}>
          <h4>{blog.name}</h4>
          <p>{blog.description}</p>
        </div>
        <div className={styles.footerCard}>
          <p className="dateline">
            Dernière édition: {moment(blog.updated_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
          </p>
        </div>
        <div className={styles.editeBox}>
          <Link to={`/blog/${blog.id}/modifier`}>
            <button className={`${styles.editButton} btn btn-outline-secondary`}>Editer</button>
          </Link>
        </div>
      </div>
    </div>
  );
}


export default BlogCard;