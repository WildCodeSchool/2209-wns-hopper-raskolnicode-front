import React, { useState } from "react";
import {useMutation} from "@apollo/client";
import './signup.scss'
import { createUser } from "../../graphql/mutations";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [doSignupMutation, { data, loading, error }] = useMutation(createUser);
  
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
      <main className='signupMain'>
        {error && (
          <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
        )}
        <div className="form">
          <h3>Inscription</h3>
          <div className="email">
          <input
            disabled={loading}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Votre email'
          />
          </div>
          <div className="password">
          <input
            disabled={loading}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Votre mot de passe'
          />
          </div>
          <div>
          <button disabled={loading} onClick={doSignup}>
            Inscription
          </button>
          </div>
          <div>
          <p>Avez-vous déja un <a href="X">compte?</a></p>
          </div>
        </div>
      </main>
    );
  }

  export default Signup;