import React from "react";
import styles from "./blog.module.scss";
import "../../App.scss";

function Blog() {
  return (
    <main>
      <h1>Bienvenue sur le blog de Bidule</h1>
      <div className={styles.mainpicture}>
        <img src="https://picsum.photos/1200/400?random=2" alt="photos" />
        <h2>Du Côté de Chez Swann</h2>
        <p>21 novembre 2023</p>
      </div>
      <div className={styles.secondarypicture}>
        <img src="https://picsum.photos/1200/500?random=2" alt="photos" />
        <h2>A l'Ombre des Jeunes Filles en Fleurs</h2>
        <p>1 septembre 2023</p>
      </div>
      <div className={styles.secondarypicture}>
        <img src="https://picsum.photos/1000/500?random=2" alt="photos" />
        <h2>le sens de l'Histoire</h2>
        <p>21 décembre 2022</p>
      </div>
      <div className={styles.secondarypicture}>
        <img src="https://picsum.photos/100/500?random=2" alt="photos" />
        <h2>
          Cet oubli si vivace qui recouvre si rapidement le passé le plus récent
        </h2>
        <p>12 novembre 2022</p>
      </div>
      <div className={styles.secondarypicture}>
        <img src="https://picsum.photos/1200/420?random=2" alt="photos" />
        <h2>Sans doute, nous avons beau changer de milieu, de genre de vie</h2>
        <p>30 septembre 2022</p>
      </div>
      <div className={styles.secondarypicture}>
        <img src="https://picsum.photos/1000/500?random=2" alt="photos" />
        <h2>
          Détendus ou brisés, les ressorts de la machine refoulante ne
          fonctionnaient plus
        </h2>
        <p>2 août 2022</p>
      </div>
      <div className={styles.secondarypicture}>
        <img src="https://picsum.photos/100/500?random=2" alt="photos" />
        <h2>Vous me prenez pour ma mère</h2>
        <p>1 juillet 2022</p>
      </div>
    </main>
  );
}

export default Blog;
