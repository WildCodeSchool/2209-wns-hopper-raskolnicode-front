import React from "react";
import styles from "./Card.module.scss";
import { IPost } from "../../interfaces";
import { Link } from "react-router-dom";

export type CardProps = {
  post: Partial<IPost>
};

function PostCard({ post }: CardProps): JSX.Element {
  return (
    <section className={styles.articlelist}>
      <div className={styles.listCard}>
        <Link to={`articles/${post.id}`}>
          <div className={styles.card}>
            <img
              src="https://picsum.photos/1200/400?random=2"
              alt={post.picture?.name}
            />
            <h4>{post.title}</h4>
            <p>{post.summary}</p>
            <p className={styles.dateCreated}>{post.updated_at}</p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default PostCard;
