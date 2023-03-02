import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations";
import styles from "../../components/FormSign/formSign.module.scss";
import uploadStyles from "./createBlog.module.scss"



function CreateBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [doCreateBlogMutation, { data, loading, error }] =
    useMutation(CREATE_BLOG);

  async function doCreateBlog(e: any) {
    e.preventDefault()

    console.log('blog', { name, description })
    try {
      await doCreateBlogMutation({
        variables: {
          data: {
            name,
            description,
          },
        },
      });
      setName("");
      setDescription("");
    } catch { }
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

        <div className={uploadStyles.upload_container}>
          <div className={uploadStyles.description_box}>
            <img src="/assets/images/icons/picturecon.png" alt="download indication" /><h2>Image</h2>
          </div>
          <div className={uploadStyles.buttonBox}>
            <button>Télécharger</button>
          </div>

          <div className={uploadStyles.box_actualiser_img}>
            <img src="" />

          </div>

        </div>


        <div className={styles.buttonBox}>
          <button disabled={loading}>Créer</button>
        </div>
      </form>
    </main>
  );
}

export default CreateBlog;
