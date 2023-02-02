import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import styles from "./formSign.module.scss"
import { CREATE_SUPERADMIN } from "../../graphql/mutations";
import { Link } from "react-router-dom";
import { HAS_SUPERADMIN } from "../../graphql/queries";

import { ISign } from "../../interfaces";

  


const FormSign = (props: ISign) : JSX.Element => {
  const [email, setEmail] = useState("superadmin@mail.com");
  const [password, setPassword] = useState("test1234");

  const [createSuperAdmin, { data, loading, error }] = useMutation(CREATE_SUPERADMIN);
  const { data: adminData } = useQuery(HAS_SUPERADMIN)

  async function doSignup() {
    try {
      await createSuperAdmin({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch { }
  }

  return (
    <main className={styles.signMain}>
      {/* {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )} */}
      <div className={styles.form}>
        <h3>{props.title}</h3>
        {
          adminData?.hasSuperAdmin ?
            <>
              <p className="text-center text-danger">{props.adminFirstMessage}</p>
              <p className="text-center">{props.adminSecondMessage}</p>
            </>
            :
            <>
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
              <div className={styles.buttonBox}>
                <button disabled={loading} onClick={doSignup}>
                  {props.signAction}
                </button>
              </div>
              <div>
                <p>
                  {props.alternativeOption}
                </p>
              </div>
            </>
        }
      </div>
    </main>
  );
}

export default FormSign