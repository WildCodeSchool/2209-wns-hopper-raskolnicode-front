import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
// import '../Signup/signup.scss'
import { SIGN_IN } from "../../graphql/mutations";
import { GET_LOGGED_USER } from "../../graphql/queries";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);

  const [getLoggedUser] = useLazyQuery(GET_LOGGED_USER);

  const [doSignInMutation, { data, loading, error }] = useMutation(SIGN_IN);

  async function doSignIn() {
    try {
      await doSignInMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      setToken(data.signIn);
      localStorage.setItem("token", data.signIn);
    } catch {}
  }

  useEffect(() => {
    async function fetchLoggedUser() {
      try {
        if (token) {
          const { data } = await getLoggedUser({
            variables: { token },
          });
          console.log("getLoggedUser", data);
          console.log("current Token", token);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedUser();
  }, [token]);

  return (
    <main className="signupMain">
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <div className="form">
        <h3>Connexion</h3>
        <div className="email">
          <input
            disabled={loading}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
        </div>
        <div className="password">
          <input
            disabled={loading}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
          />
        </div>
        <div>
          <button disabled={loading} onClick={doSignIn}>
            Me connecter
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

export default SignIn;
