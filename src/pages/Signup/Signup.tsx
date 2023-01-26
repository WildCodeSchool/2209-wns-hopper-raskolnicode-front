import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./Signup.module.scss";
import { CREATE_USER } from "../../graphql/mutations";

function Signup() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");

  const [doSignupMutation, { data, loading, error }] = useMutation(CREATE_USER);

  async function doSignup() {
    try {
      await doSignupMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <main className={styles.signupMain}>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <div className={styles.form}>
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
        <div className={styles.password}>
          <input
            disabled={loading}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
          />
        </div>
        <div>
          <button disabled={loading} onClick={doSignup}>
            Inscription
          </button>
        </div>
        <div>
          <p>
            Avez-vous déja un <a href="X">compte?</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signup;
