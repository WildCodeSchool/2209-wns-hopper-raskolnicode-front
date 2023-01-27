import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations";
import styles from "./Blog.module.scss";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [doCreateBlogMutation, { data, loading, error }] =
    useMutation(CREATE_BLOG);

  async function doCreateBlog() {
    try {
      await doCreateBlogMutation({
        variables: {
          data: {
            title,
            description,
          },
        },
      });
      setTitle("");
      setDescription("");
    } catch {}
  }

  return (
    <main className={styles.blogmain}>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <div className={styles.form}>
        <h1>Créez votre blog</h1>
        <form>
          <label>
            <div>Titre</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre"
            />
          </label>
          <label>
            <div>Description</div>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </label>
          <button disabled={loading} onClick={doCreateBlog}>
            Créer
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateBlog;
