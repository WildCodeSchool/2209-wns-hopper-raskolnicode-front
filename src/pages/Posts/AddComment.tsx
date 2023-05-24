import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from "../../graphql/mutations";
import { GET_POST } from '../../graphql/queries';

const AddComment = ( props : {postId:string}) => {
  const [comment, setComment] = useState('');
  const [addComment] = useMutation(CREATE_COMMENT,{refetchQueries:[GET_POST]});
  
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
    <form onSubmit={handleFormSubmit}>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Ajouter un commentaire..."
        rows={4}
        cols={50}
      ></textarea>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddComment;