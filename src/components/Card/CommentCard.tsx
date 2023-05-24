import React, { useContext } from "react";
import styles from "./Card.module.scss";
import { DELETE_COMMENT } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { GET_POST } from "../../graphql/queries";
import { UserContext } from "../../UserContext";

function CommentCard({ comment,post }:any): JSX.Element {
    const [deleteComment] = useMutation(DELETE_COMMENT,{refetchQueries:[GET_POST]});
    const user = useContext(UserContext);
    console.log(post)
    const handleDelete = async () => {
        const yes = window.confirm('Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?');
        if(yes){
        try {
          await deleteComment({
            variables: {
                deleteCommentId: comment.id,
            },
          });
    
        } catch (error) {
          console.error("Une erreur s'est produite lors de la suppression du commentaire :", error);
        }
    }else{
        
    }
}
  return (
    <>
    <div className={styles.comment}>
        <p className={styles.commentText}>"{comment?.text}"</p>
        <div className={styles.flexcontainer}>
        <p className={styles.commentPseudo}>{comment?.user?.pseudo}</p>
        {user?.id === comment.user.id || user?.id === post.blog.user.id ? 
        <button onClick={handleDelete}>Supprimer</button>
        :
         ''}
        </div>
    </div>
    </>
  );
}

export default CommentCard;
