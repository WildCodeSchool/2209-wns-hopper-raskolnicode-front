import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from "../../graphql/mutations";
import { GET_POST } from '../../graphql/queries';
import styles from "./Post.module.scss";
import { UserContext } from '../../UserContext';

const AddComment = ( props : {postId:string}) => {
  const [comment, setComment] = useState('');
  const [addComment] = useMutation(CREATE_COMMENT,{refetchQueries:[GET_POST]});
  const user = useContext(UserContext);
  const handleCommentChange = (event:any) => {
    setComment(event.target.value);
  };

  const handleFormSubmit = async (event:any) => {
    event.preventDefault();
    try {
      await addComment({
        variables: {
          postId: props.postId,
          data: { text: comment },
        },
      });
      setComment('');
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'ajout du commentaire :', error);
    }
  };

  return (
    <>
    { user &&
    <form className={styles.formComment} onSubmit={handleFormSubmit}>
      <input
        className={styles.inputComment}
        value={comment}
        onChange={handleCommentChange}
        placeholder="Ajouter votre commentaire..."
      ></input>
      <div className={styles.buttonBox}>
      <button type="submit">Ajouter</button>
      </div>
    </form>
    }
    </>
  );
};

export default AddComment;