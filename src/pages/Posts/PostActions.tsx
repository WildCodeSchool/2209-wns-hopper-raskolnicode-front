import { useMutation } from '@apollo/client'
import { faArchive, faCheck, faPenToSquare, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DELETE_POST, TOGGLE_POST_IS_ARCHIVED, UPDATE_POST } from '../../graphql/mutations'
import { IPost } from '../../interfaces'

interface PostActionsProps {
  post: IPost
}

const PostActions = ({ post }: PostActionsProps) => {

  const [doToggleIsArchived] = useMutation(TOGGLE_POST_IS_ARCHIVED);
  const [doDeletePost] = useMutation(DELETE_POST)

  const navigate = useNavigate()

  const toggleIsArchived = useCallback(async () => {
    await doToggleIsArchived({
      variables: {
        postId: post.id,
      },
    })
  }, [])

  const deletePost = useCallback(async () => {
    await doDeletePost({
      variables: {
        postId: post.id
      }
    }).catch(err => navigate(`/blog/${post.blog.id}`))
  }, [])

  return (
    <section className="actions text-center p-3 bg-secondary">
      <p className='h5 mb-4 text-light'>Modifier l'article</p>
      <div className="d-flex justify-content-center gap-2">
        <Link to={`/blog/${post.blog.id}/articles/${post.id}/modifier`}>
          <button className='btn btn-light'><FontAwesomeIcon icon={faPencil} /> Editer</button>
        </Link>
        {
          post.isArchived ?
            <button className='btn btn-success' onClick={() => toggleIsArchived()}><FontAwesomeIcon icon={faCheck} />&nbsp;&nbsp;Publier</button>
            :
            <button className='btn btn-dark' onClick={() => toggleIsArchived()}><FontAwesomeIcon icon={faArchive} />&nbsp;&nbsp;Archiver</button>

        }
        <button className='btn btn-danger' onClick={() => deletePost()}><FontAwesomeIcon icon={faTrash} />&nbsp;&nbsp;Supprimer</button>
      </div>
    </section>
  )
}

export default PostActions