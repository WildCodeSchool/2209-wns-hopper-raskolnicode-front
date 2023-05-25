import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_BLOG } from "../../graphql/queries";
import styles from "./Blog.module.scss";
import AdBanner from "./AdBanner";
import Actions from "./BlogActions";
import { UserContext } from "../../UserContext";
import { getBlog } from "../../interfaces";
import PostCard from "../../components/Card/PostCard";

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
  }, []);

  const blog = data?.getBlog;

  return (
    <main className={styles.blogmain}>
      {/* place here condition if !user.isPremium */} <AdBanner />
      {blog?.user.id === user?.id && <Actions blogId={blogId} />}
      <h1>Bienvenue {blogId}</h1>
      <section className={styles.container}>
        {loading === true && "Chargement..."}
        {blog?.posts.map((post, idx) => {
          return <PostCard key={idx} post={post} />;
        })}
      </section>
    </main>
  );
}

export default Blog;
