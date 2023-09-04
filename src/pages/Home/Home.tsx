import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import styles from "./Home.module.scss";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { GET_BLOGS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import BlogCard from "../../components/Card/BlogCard";

export type PictureProps = {
  id: number;
  name: string;
  link: string;
  updated_at: string;
};


export type BlogProps = {
  user: any;
  name: string;
  description: string;
  updated_at: string;
  id: number;
  picture?: PictureProps;
};

function TruncateTitle(props: any) {
  const words = props.title.split(/\s+/);
  let truncatedTitle = words.slice(0, 5).join(' ');

  if (words.length > 8) {
    truncatedTitle += '...';
  }

  return <h3>{truncatedTitle}</h3>;
}

function Home() {
  const user = useContext(UserContext);
  const { loading, data } = useQuery<{ getBlogs: BlogProps[] }>(GET_BLOGS);

  let blogsSorted: BlogProps[] = [];

  let lastBlogs: BlogProps[] = [];

  if (data?.getBlogs) {
    blogsSorted = [...data.getBlogs].sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    const usersBlogs: { [key: string]: BlogProps } = {};
    let getBlogReversed = Object.keys(data.getBlogs).reverse();

    getBlogReversed.forEach(key => {
      let index = parseInt(key);
      console.log(index, data.getBlogs[index]);
    });

    for (const blog of data.getBlogs) {
      lastBlogs.push(blog);
      if (lastBlogs.length === 3) {
        break;
      }
    }
  }

  return (
    <main className={styles.homeMain}>
      <section className={styles.banniere}>
        <div className={styles.banniere_box_img}>
          <img src="./imgbanniere.png" alt="" />
        </div>
        <div className={styles.contentBanniere}>
          <h1>
            Créez votre <br></br>blog super facilement
          </h1>
          <Link to={user ? "/blog/create" : "/login"}>
            <button>Commencer mon blog</button>
          </Link>
        </div>  
      </section>
      <section className={styles.carroussel}>
        <h2 className={styles.titleBlogList}>Les derniers blogs</h2>

        <Carousel>
          {!loading && lastBlogs.map((blog, index) => (
            <Carousel.Item key={index}>
              {blog.picture && (
                <img
                  className={`d-block w-100 ${styles.imageStyle}`}
                  src={blog.picture.link}
                  alt={blog.name}
                />
              )}
              <Carousel.Caption>
                <TruncateTitle title={blog.name} />
                <p className={styles.carrousselDescription}>
                  {blog.description.slice(0, 35)}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

      </section>

      <h1>Parcourir les blogs</h1>
      <section className={styles.container}>
        {loading && <div>Chargement...</div>}
        {!loading && blogsSorted.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}

        <div className={`${styles.articlelist} ${styles.heightZero}`}></div>
        <div className={`${styles.articlelist} ${styles.heightZero}`}></div>
        <div className={`${styles.articlelist} ${styles.heightZero}`}></div>

      </section>
    </main>
  );
}

export default Home;
