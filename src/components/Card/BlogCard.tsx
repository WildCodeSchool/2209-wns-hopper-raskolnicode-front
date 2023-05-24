import React from "react";
import styles from "./Card.module.scss";
import { getBlog } from "../../interfaces";
import { Link } from "react-router-dom";
import moment from "moment";

export type CardProps = {
  blog: Partial<getBlog>;
};

function BlogCard({ blog }: CardProps): JSX.Element {
  return (
    <section className={styles.articlelist}>
      <div className={styles.listCard}>
        <Link to={`/blog/${blog.id}`}>
          <div className={styles.card}>
            {blog.picture ? (
              <img src={blog.picture.link} alt={blog.picture.name} />
            ) : (
              <img src="/default-card-img.png" alt="Introuvable" />
            )}
            <h4>{blog.name}</h4>
            <p>{blog.description}</p>
            <p className={styles.dateCreated}>
              {moment(blog.updated_at)
                .locale("fr")
                .format("dddd D MMMM YYYY [à] HH[h]mm")}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default BlogCard;
