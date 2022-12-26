import React from "react";
import styles from "./Blog.module.scss";

function CreateBlog() {
  return (
    <main className={styles.blogmain}>
      <h1>Créez votre blog</h1>
      <form>
        <label>
          Titre
          <input type="text" name="title" />
        </label>
        <label>
          Description
          <input type="textarea" name="description" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}

export default CreateBlog;
