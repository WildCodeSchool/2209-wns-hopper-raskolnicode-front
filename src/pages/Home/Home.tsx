import React, { useContext,useState } from "react";
import { UserContext } from "../../UserContext";
import styles from "./Home.module.scss";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = (props: { onTokenChange: (token?: string) => void}) => {
  
  // Getting current user from context
  const user = useContext(UserContext)

  return (
    <main className={styles.homeMain}>
      <section className={styles.banniere}>
        <div className={styles.banniere_box_img}>
          <img src="./imgbanniere.png" alt="" />
        </div>
        <div className={styles.contentBanniere}>
          <h2>Créez votre <br></br>blog super facilement</h2>
          <button>Commencer mon blog</button>
        </div>
      </section>
      <section className={styles.carroussel}>
      <h2>Les blogs les plus aimés</h2>
       
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block"
            src="https://picsum.photos/1200/400?random=3"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Alan's Blog</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://picsum.photos/1200/400?random=2"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Félicie's Blog</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://picsum.photos/1200/400?random=2"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Soufiane's Blog</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block "
            src="https://picsum.photos/1200/400?random=5"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Clément's Blog</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      </section>
      <section className={styles.articlelist}>
        <h2>Parcourir les blogs</h2>
        
        <div className={styles.listCard}>
          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=2" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=4" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=6" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=9" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=13" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=7" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=12" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>

          <div className={styles.card}>
            <img src="https://picsum.photos/1200/400?random=3" alt="" />
            <h4>Easy ways to use alternative to plastic</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>
            <p className={styles.dateCreated}>12 August</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
