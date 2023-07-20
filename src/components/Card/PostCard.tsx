import React from "react";
import styles from "./Card.module.scss";
import { IPost } from "../../interfaces";
import { Link } from "react-router-dom";
import moment from "moment";


export type CardProps = {
  post: Partial<IPost>
};

function PostCard({ post }: CardProps): JSX.Element {
  return (
    <div className={styles.articlelist}>
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
            <h3>{post.title}</h3>
            <p>{post.summary}</p>

            <p className={styles.dateCreated}>
              {moment(post.updated_at)
                .locale("fr")
                .format("dddd D MMMM YYYY [à] HH[h]mm")}
            </p>

          </div>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
