import React, { FormEventHandler, useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./Login.module.scss";
import { LOGIN } from "../../graphql/mutations";
import { IUser } from "../../interfaces";
import { useNavigate } from "react-router-dom";

function Login(props: {
  onTokenChange: (token?: string) => void;
}) {
  // Redirects to dashboard if there's a user logged in
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");

  const [doSignInMutation, { data, loading, error }] = useMutation(LOGIN);

  async function doSignIn(e: any) {
    e.preventDefault()
    try {
      const result = await doSignInMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (result.data) {
        props.onTokenChange(result.data.login);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.logingMain}>
        <form onSubmit={e => doSignIn(e)} className={styles.form}>
        <h3>Connexion</h3>
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
          {error && (
            <p style={{ color: "red" }}>Quelque chose s'est mal passé</p>
          )}
          <div className={styles.buttonBox}>
            <button disabled={loading} onClick={doSignIn}>
              Me connecter
            </button>
          </div>
          <div>
          <p className={styles.forbidenMdpLink}>
            Avez-vous déja un <a href="X">compte?</a>
          </p>
        </div>
        </form>
        
    </main>
  );
}

export default Login;
