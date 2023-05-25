import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import styles from "../Posts/createPost.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_POST } from "../../graphql/mutations";
import { GET_POST } from "../../graphql/queries";
import { IPicture, IPost } from "../../interfaces";
import UploadPicture from "../../components/UploadPicture/UploadPicture";
import { uploadCloudinary } from "../../components/UploadPicture/uploadCloudinary";

const EditPost = () => {
  const { blogId, postId } = useParams()
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState<IPicture | undefined>(undefined);
  const [pictureInForm, setPictureInForm] = useState<any>(undefined)
  const [isArchived, setIsArchived] = useState(false)

  const navigate = useNavigate();

  const { data: getPostData } = useQuery<{ getPost: any }>(GET_POST, {
    variables: {
      postId,
    },
  });

  const post: IPost = getPostData?.getPost;

  useEffect(() => {
    console.log(post)
    if (post) {
      console.log('useEffect isArchived', isArchived)
      setTitle(post.title)
      setSummary(post.summary)
      setContent(post.content)
      setIsArchived(post.isArchived)
      setPicture(post.picture)
    }
  }, [post])


  const [doUpdatePostMutation, { data, loading, error }] =
    useMutation(UPDATE_POST);

  async function doUpdatePost(e: any) {
    e.preventDefault()
    let cloudinaryPicture = null
    let newPost
    if (pictureInForm) {
      cloudinaryPicture = await uploadCloudinary(pictureInForm);
      newPost = {
        title,
        summary,
        content,
        isArchived,
        picture: {
          name: cloudinaryPicture?.original_filename,
          link: cloudinaryPicture?.secure_url,
        },
      }
    } else {
      newPost = { title, summary, content, isArchived }
    }

    await doUpdatePostMutation({
      variables: {
        postId,
        data: newPost
      },
    }).then(res => {
      navigate(`/blog/${blogId}/articles/${postId}`)
    })
  }

  return (
    <main className={styles.main} >
      <form onSubmit={e => doUpdatePost(e)} className={styles.form}>
        <h3>Modifier l'article</h3>
        <UploadPicture setPictureInForm={setPictureInForm} picture={picture} />
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
          <button type="submit" disabled={loading} className="btn btn-success" style={{ height: 'fit-content' }}>Sauvegarder</button>
          <button className="btn btn-secondary" style={{ height: 'fit-content' }} onClick={(e) => {
            setIsArchived(true)
            console.log('isArchived: true')
            doUpdatePost(e)
          }}>Archiver</button>
        </div>
      </form>
    </main>
  );
}

export default EditPost
