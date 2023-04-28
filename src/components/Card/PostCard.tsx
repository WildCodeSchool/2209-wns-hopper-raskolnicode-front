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
            {
              post.picture ?
                <img
                  src={post.picture.link}
                  alt={post.picture.name}
                />
                :
                <img
                  src='/default-card-img.png'
                  alt='Introuvable'
                />
            }
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
