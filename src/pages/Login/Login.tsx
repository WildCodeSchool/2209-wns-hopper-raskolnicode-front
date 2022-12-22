import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "../Signup/Signup.module.scss";
import { SIGN_IN } from "../../graphql/mutations";
import { IUser } from "../../interfaces";
import { useNavigate } from "react-router-dom";

function Login(props: {
  user: IUser | null;
  onTokenChange: (token?: string) => void;
}) {
  // Redirects to dashboard if there's a user logged in
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");

  const [doSignInMutation, { data, loading, error }] = useMutation(SIGN_IN);

  async function doSignIn() {
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
        props.onTokenChange(result.data.signIn);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className={styles.signupMain}>
      <div className={styles.form}>
        <h3>Connexion</h3>
        <form onSubmit={doSignIn}>
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
          <div>
            <button disabled={loading} onClick={doSignIn}>
              Me connecter
            </button>
          </div>
        </form>
        <div>
          <p>
            Avez-vous déja un <a href="X">compte?</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
