import React, { useEffect } from "react";
import styles from "./Post.module.scss";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import { IPost } from "../../interfaces";
import AddComment from "./AddComment";

function Post() {
  const { postId } = useParams()
  const { loading, data, refetch } = useQuery<{ getPost: any }>(GET_POST, {
    variables: {
      postId,
    },
  });
  const post: IPost = data?.getPost
  
  useEffect(() => {
    refetch()
  }, [])
 
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
      <div>
        <h2>Commentaires</h2>
        <div>
        {post?.comments?.map((comment, idx) => {
          return (
            <div key={idx}>
              <p>{comment?.text}</p>
            </div>
          );
        })}
        {
        postId &&
        <AddComment postId={postId} />
        }
        </div>
      </div>
    </main>
  );
}

export default Post;
