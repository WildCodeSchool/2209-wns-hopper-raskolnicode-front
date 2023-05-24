import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_BLOG } from "../../graphql/queries";
import styles from "./Blog.module.scss";
import AdBanner from "./AdBanner";
import Actions from "./Actions";
import { UserContext } from "../../UserContext";
import { getBlog } from "../../interfaces";
import PostCard from "../../components/Card/PostCard";
import moment from "moment";

function Blog() {
  const { blogId } = useParams();
  const user = useContext(UserContext);

  const { loading, data, refetch } = useQuery<{ getBlog: getBlog }>(GET_BLOG, {
    variables: {
      getBlogId: blogId,
    },
  });

  useEffect(() => {
    refetch();
  });

  const blog = data?.getBlog;
  console.log(blog);

  return (
    <main className={styles.blogmain}>
      {/* place here condition if !user.isPremium */} <AdBanner />
      {blog?.user.id === user?.id && <Actions blogId={blogId} />}
      {blog?.user.id === user?.id ? (
        <h1>
          Bienvenue sur ton blog,{" "}
          {blog?.user.pseudo ? blog.user.pseudo : "anonyme"} !
        </h1>
      ) : (
        <h1>
          Bienvenue sur le blog de{" "}
          {blog?.user.pseudo ? blog.user.pseudo : "anonyme"}
        </h1>
      )}
      {loading === true && "Chargement..."}
      <div className={styles.mainpicture}>
        {<img src={blog?.picture?.link} alt={blog?.picture?.name}></img>}
        <p className="dateline">
          {moment(blog?.picture?.updated_at)
            .locale("fr")
            .format("dddd D MMMM YYYY [à] HH[h]mm")}
        </p>
      </div>
      <p>{blog?.description}</p>
      <section className={styles.container}>
        {blog?.posts.map((post, idx) => {
          return <PostCard key={idx} post={post} />;
        })}
      </section>
    </main>
  );
}

export default Blog;
