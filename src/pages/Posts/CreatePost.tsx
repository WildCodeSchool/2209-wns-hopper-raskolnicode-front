import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "../Posts/createPost.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import { CREATE_POST } from "../../graphql/mutations";
import UploadPicture from "../../components/UploadPicture/UploadPicture";
import { uploadCloudinary } from "../../components/UploadPicture/uploadCloudinary";

const CreatePost = () => {
  const { blogId } = useParams()
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [isArchived, setIsArchived] = useState(false)

  const navigate = useNavigate();

  const [doCreatePostMutation, { data, loading, error }] = useMutation(CREATE_POST);

  async function doCreatePost(e: any) {
    e.preventDefault()

    const cloudinaryPicture = await uploadCloudinary(picture);
    console.log('*****', cloudinaryPicture)

    await doCreatePostMutation({
      variables: {
        blogId: blogId,
        data: {
          title,
          summary,
          content,
          picture: {
            name: cloudinaryPicture?.original_filename,
            link: cloudinaryPicture?.secure_url,
          },
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
        <UploadPicture setPictureInForm={setPicture} />
        <br />
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
          <button type="submit" disabled={loading}  className={`btn btn-success ${styles.validation}`} style={{ height: 'fit-content' }}>Créer</button>
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
