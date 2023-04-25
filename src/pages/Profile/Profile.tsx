import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { UPDATE_USER } from "../../graphql/mutations";
import { GET_LOGGED_USER } from "../../graphql/queries";
import styles from "./Profile.module.scss";

function Profile() {
  const [email] = useState("");
  const [pseudo, setPseudo] = useState("");
  const { loading, data } = useQuery(GET_LOGGED_USER);

  const [doUpdateUserMutation] = useMutation(UPDATE_USER);

  async function doUpdtateUser(e: any) {
    e.preventDefault();
    console.log("pseudo", pseudo);
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
          <input
            disabled={loading}
            type="text"
            value={email}
            placeholder={data?.loggedUser.email}
          />
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
    </div>
  );
}

export default Profile;
