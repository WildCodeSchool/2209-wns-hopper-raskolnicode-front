import React, { useContext, useEffect } from "react";
import styles from "./Post.module.scss";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import { IPost } from "../../interfaces";
import { UserContext } from "../../UserContext";
import PostActions from "./PostActions";
import CommentCard from "../../components/Card/CommentCard";
import AddComment from "./AddComment";
import GoBack from "../../components/GoBack/GoBack";

function Post() {
  const { postId } = useParams();
  const user = useContext(UserContext);

  const { data } = useQuery<{ getPost: any }>(GET_POST, {
    variables: {
      postId,
    },
  });

  const post: IPost = data?.getPost;

  return (
    <main className={styles.postmain}>
      {post && (
        <>
          {post?.blog?.user.id === user?.id && <PostActions post={post} />}
          <GoBack />
          <h1>{post.title}</h1>
          <div className={styles.mainpicture}>
            {post.picture ? (
              <img src={post.picture.link} alt={post.picture.name} />
            ) : (
              <img src={"/default-post-img.png"} alt="Introuvable" />
            )}
            <div className={styles.content}>
              <p className="dateline">
                {moment(post.updated_at)
                  .locale("fr")
                  .format("dddd D MMMM YYYY [à] HH[h]mm")}
              </p>

              <p className={styles.contenttext}>{post.content}</p>
            </div>
          </div>
        </>
      )}
      <div className={styles.listComment}>
        <h2>Commentaires</h2>
        <div className={styles.commentsUsersContainer}>
          {post?.comments?.map((comment) => {
            return <CommentCard comment={comment} post={post} />;
          })}
          {postId && <AddComment postId={postId} />}
        </div>
      </div>
    </main>
  );
}

export default Post;
