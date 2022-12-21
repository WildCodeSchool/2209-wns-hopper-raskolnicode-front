import React from "react";
import styles from "./Blog.module.scss";

function HomeBlog() {
  return (
    <main>
      this is the homepage
      <div className={styles.imagescontainer}>
        <div className={styles.mainpicture}>
          <img src="https://picsum.photos/1200/400?random=2" alt="photos" />
          <h1>Du Côté de Chez Swann</h1>
          <p>21 novembre 2023</p>
        </div>
        <div className={styles.secondarypicture}>
          <img src="https://picsum.photos/1200/500?random=2" alt="photos" />
          <h1>A l'Ombre des Jeunes Filles en Fleurs</h1>
          <p>1 septembre 2023</p>
        </div>
        <div className={styles.secondarypicture}>
          <img src="https://picsum.photos/1000/500?random=2" alt="photos" />
          <h1>le sens de l'Histoire</h1>
          <p>21 décembre 2022</p>
        </div>
        <div className={styles.secondarypicture}>
          <img src="https://picsum.photos/100/500?random=2" alt="photos" />
          <h1>
            Cet oubli si vivace qui recouvre si rapidement le passé le plus
            récent
          </h1>
          <p>12 novembre 2022</p>
        </div>
        <div className={styles.secondarypicture}>
          <img src="https://picsum.photos/1200/420?random=2" alt="photos" />
          <h1>
            Sans doute, nous avons beau changer de milieu, de genre de vie
          </h1>
          <p>30 septembre 2022</p>
        </div>
        <div className={styles.secondarypicture}>
          <img src="https://picsum.photos/1000/500?random=2" alt="photos" />
          <h1>
            Détendus ou brisés, les ressorts de la machine refoulante ne
            fonctionnaient plus
          </h1>
          <p>2 août 2022</p>
        </div>
        <div className={styles.secondarypicture}>
          <img src="https://picsum.photos/100/500?random=2" alt="photos" />
          <h1>Vous me prenez pour ma mère</h1>
          <p>1 juiller 2022</p>
        </div>
      </div>
    </main>
  );
}

export default HomeBlog;
