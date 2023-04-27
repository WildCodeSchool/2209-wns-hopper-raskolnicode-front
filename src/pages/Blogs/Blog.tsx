import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { GET_BLOG } from "../../graphql/queries";
import styles from "./Blog.module.scss";
import AdBanner from "./AdBanner";
import Actions from "./Actions";
import { UserContext } from "../../UserContext";
import { getBlog } from "../../interfaces";

function Blog() {

  const { blogId } = useParams();
  const user = useContext(UserContext);

  const  { loading, data, refetch } = useQuery<{ getBlog: getBlog }>(GET_BLOG, {
    variables: {
      getBlogId: blogId,
    },
  });

  useEffect(() => {
    refetch()
  }, [])

  const blog = data?.getBlog
  
  return (
    <main className={styles.blogmain}>
      {/* place here condition if !user.isPremium */} <AdBanner />
      {
        blog?.user.id === user?.id && <Actions blogId={blogId} />
      }
      <h1>Bienvenue {blogId}</h1>
      <section className={styles.container}>
        {loading === true && "Chargement..."}
        {blog?.posts.map((post) => {
          return (
            <div key={post.id}>
              <Card
                title={post.title}
                description={post.summary}
                picture={post.picture}
                updated_at={post.updated_at}
                onClick={() => { }}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Blog;
