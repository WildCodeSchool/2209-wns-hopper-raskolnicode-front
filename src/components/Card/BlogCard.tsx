import React from "react";
import styles from "./Card.module.scss";
import { IBlog } from "../../interfaces";
import { Link } from "react-router-dom";

export type CardProps = {
  blog: Partial<IBlog>
};

function BlogCard({ blog }: CardProps): JSX.Element {
  return (
    <section className={styles.articlelist}>
      <div className={styles.listCard}>
        <Link to={`/blog/${blog.id}`}>
        <div className={styles.card}>
          <img
            src="https://picsum.photos/1200/400?random=2"
            alt={blog.picture?.name}
          />
          <h4>{blog.name}</h4>
          <p>{blog.description}</p>
          <p className={styles.dateCreated}>{blog.updated_at}</p>
        </div>
        </Link>
      </div>
    </section>
  );
}

export default BlogCard;
