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
  const [blog, setBlog] = useState<any>(null)
  const user = useContext(UserContext);

  const  { loading, data } = useQuery<{ getBlog: getBlog }>(GET_BLOG, {
    variables: {
      getBlogId: blogId,
    },
    onCompleted: setBlog
  });
  

  useEffect(() => {
    console.log('BLOG STATE', blog)
  }, [blog])

  console.log('user', user)
  // console.log('blog', data?.getBlog)
  return (
    <main className={styles.blogmain}>
      {/* place here condition if !user.isPremium */} <AdBanner />
      {
        blog?.getBlog.user.id === user?.id && <Actions blogId={blogId} />
      }
      <h1>Bienvenue {blogId}</h1>
      <section className={styles.container}>
        {loading === true && "Chargement..."}
        {data?.getBlog.posts.map((post) => {
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
