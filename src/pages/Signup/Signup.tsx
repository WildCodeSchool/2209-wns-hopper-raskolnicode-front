import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "../../styles/forms/forms.module.scss";
import { CREATE_USER } from "../../graphql/mutations";

function Signup() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");
  const [pseudo, setPseudo] = useState("Testdu34");

  const [doSignupMutation, { data, loading, error }] = useMutation(CREATE_USER);

  async function doSignup() {
    try {
      await doSignupMutation({
        variables: {
          data: {
            email,
            pseudo,
            password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <main className={styles.main}>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <form className={styles.form}>
        <h3>Inscription</h3>
        <div className={styles.email}>
          <input
            disabled={loading}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
        </div>
        <div className={styles.email}>
          <input
            disabled={loading}
            type="pseudo"
            value={email}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Votre pseudi"
          />
        </div>
        <div className={styles.password}>
          <input
            disabled={loading}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
          />
        </div>
        <div className={styles.buttonBox}>
          <button disabled={loading} onClick={doSignup}>
            Inscription
          </button>
        </div>
        <div>
          <p>
            Avez-vous déja un <a href="X">compte?</a>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Signup;
