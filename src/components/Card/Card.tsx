import React from "react";
import styles from "./Card.module.scss";

export interface IBlogProps {
  image: string;
  title: string;
  description: string;
  updated_at: string;
}

function Card(props: IBlogProps): JSX.Element {
  return (
    <section className={styles.articlelist}>
      <div className={styles.listCard}>
        <div className={styles.card}>
          <img
            src="https://picsum.photos/1200/400?random=2"
            alt={props.title}
          />
          <h4>{props.title}</h4>
          <p>{props.description}</p>
          <p className={styles.dateCreated}>{props.updated_at}</p>
        </div>
      </div>
    </section>
  );
}

export default Card;
