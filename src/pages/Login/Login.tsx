import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./../../components/FormSign/formSign.module.scss";
import { LOGIN } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

function Login(props: { onTokenChange: (token?: string) => void }) {
  // Redirects to dashboard if there's a user logged in
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState('')

  const [doSignInMutation, { loading }] = useMutation(LOGIN);

  async function doSignIn(e: any) {
    e.preventDefault();
      await doSignInMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      }).then(res => {
        if (res.data.login) {
          props.onTokenChange(res.data.login);
          navigate("/");
        } else {
          setError('Veuillez vérifier votre adresse mail et votre mot de passe')
        }
      })
  }

  return (
    <main className={styles.main}>
      <form onSubmit={(e) => doSignIn(e)} className={styles.form}>
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
        {error && <p className="text-danger text-center">{error}</p>}
        <div className={styles.buttonBox}>
          <button disabled={loading} onClick={doSignIn}>
            Me connecter
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
