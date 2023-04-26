import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import { UPDATE_USER } from "../../graphql/mutations";
import { GET_LOGGED_USER } from "../../graphql/queries";

import styles from "./Profile.module.scss";

function Profile() {
  const [pseudo, setPseudo] = useState("");
  const { loading, data } = useQuery(GET_LOGGED_USER);
  const [doUpdateUserMutation] = useMutation(UPDATE_USER);
  const navigate = useNavigate();

  async function doUpdtateUser(e: any) {
    e.preventDefault();
    try {
      await doUpdateUserMutation({
        variables: {
          pseudo,
        },
      });
    } catch {}
  }

  return (
    <div className={styles.main}>
      <h1>Mon compte</h1>

      <form onSubmit={(e) => doUpdtateUser(e)} className={styles.form}>
        <label>
          Email
          <p>{data?.loggedUser.email}</p>
        </label>
        <label>
          <div>Pseudonyme</div>

          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder={data?.loggedUser.pseudo}
          />
        </label>
        <div className={styles.buttonBox}>
          <button disabled={loading} className={styles.button}>
            <div>Sauvegarder</div>
          </button>
        </div>
      </form>
      <div>
        <h1>Mes blogs</h1>
        <section className={styles.container}>
          {loading === true && "Chargement..."}
          {data?.loggedUser.blogs.map((blog: any) => {
            return (
              <Card
                title={blog.name}
                description={blog.description}
                image="futur lien image"
                updated_at={blog.updated_at}
                onClick={() => {
                  navigate(`/blog/${blog.id}`);
                }}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Profile;
