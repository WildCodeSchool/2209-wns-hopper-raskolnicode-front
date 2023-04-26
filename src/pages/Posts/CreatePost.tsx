import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "../Posts/createPost.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_POST } from "../../graphql/mutations";

const CreatePost = () => {
  const { blogId } = useParams()
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image] = useState("");
  const [isArchived, setIsArchived] = useState(false)

  const navigate = useNavigate();

  const [doCreatePostMutation, { data, loading, error }] =
    useMutation(CREATE_POST);

  async function doCreatePost(e: any) {
    e.preventDefault()

    /*** CLOUDINARY IMAGE UPLOAD ***/
    // setImage(link from cloudinary)

    await doCreatePostMutation({
      variables: {
        blogId: blogId,
        data: {
          title,
          summary,
          content,
          image,
          isArchived,
        },
      },
    }).then(res => {
      const postId = res.data.createPost.id
      navigate(`/blog/${blogId}`)
    })
  }

  return (
    <main className={styles.main} >
      <form onSubmit={e => doCreatePost(e)} className={styles.form}>
        <h3>Rédiger un article</h3>
        <input
          disabled={loading}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de l'article"
        />
        <textarea
          disabled={loading}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Résumé"
        />
        <textarea
          disabled={loading}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: '20rem' }}
          placeholder="Contenu"
        />
        {/* HERE UPLOAD IMAGE INPUT */}
        {error && (
          <p style={{ color: "red" }}>Quelque chose s'est mal passé</p>
        )}
        <div className="d-flex justify-content-center p-3 gap-3">
          <button type="submit" disabled={loading} className="btn btn-success" style={{ height: 'fit-content' }}>Créer</button>
          <button className="btn btn-secondary" style={{ height: 'fit-content' }} onClick={(e) => {
            setIsArchived(true)
            doCreatePost(e)
          }}>Archiver</button>
        </div>
      </form>
    </main>
  );
}

export default CreatePost
