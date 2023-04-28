import React, { useEffect } from "react";
import styles from "./Post.module.scss";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import { IPost } from "../../interfaces";

function Post() {
  const { postId } = useParams();

  const { loading, data, refetch } = useQuery<{ getPost: any }>(GET_POST, {
    variables: {
      postId,
    },
  });

  const post: IPost = data?.getPost;

  useEffect(() => {
    console.log(post);
  }, [post]);

  return (
    <main className={styles.postmain}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <div className={styles.mainpicture}>
            {post.picture ? (
              <img src={post.picture.link} alt={post.picture.name} />
            ) : (
              <img src={"/default-post-img.png"} alt="Introuvable" />
            )}
            <p className="dateline">
              {moment(post.updated_at)
                .locale("fr")
                .format("dddd D MMMM YYYY [à] HH[h]mm")}
            </p>
            <p>{post.content}</p>
          </div>
        </>
      )}
    </main>
  );
}

export default Post;
