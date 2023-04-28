import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations";
import styles from "../../styles/forms/forms.module.scss"
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const [doCreateBlogMutation, { data, loading, error }] =
    useMutation(CREATE_BLOG);

  async function doCreateBlog(e: any) {
    e.preventDefault()
    await doCreateBlogMutation({
      variables: {
        data: {
          name,
          description,
        },
      },
    }).then(res => {
      const id = res.data.createBlog.id
      navigate(`/blog/${id}`)
    })

  }

  return (
    <main className={styles.main} >
      <form onSubmit={e => doCreateBlog(e)} className={styles.form}>
        <h3>Créer mon blog</h3>
        <input
          disabled={loading}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du blog"
        />
        <textarea
          disabled={loading}
          // type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {error && (
          <p style={{ color: "red" }}>Quelque chose s'est mal passé</p>
        )}
        <div className={styles.buttonBox}>
          <button disabled={loading}>Créer</button>
        </div>
      </form>
    </main>
  );
}

export default CreateBlog;
