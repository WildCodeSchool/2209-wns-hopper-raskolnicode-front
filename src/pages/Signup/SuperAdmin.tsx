import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import styles from "../../styles/forms/forms.module.scss"
import { CREATE_SUPERADMIN } from "../../graphql/mutations";
import { Link } from "react-router-dom";
import { HAS_SUPERADMIN } from "../../graphql/queries";

const SuperAdminSignup = () => {
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
    <main className={styles.main}>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <div className={styles.form}>
        <h3>Création d'un Super Admin</h3>
        {
          adminData?.hasSuperAdmin ?
            <>
              <p className="text-center text-danger">Vous ne pouvez créer qu'un seul Super Admin depuis cette page</p>
              <p className="text-center">Veuillez vous <Link to={'/login'}>connecter</ Link></p>
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
            </>
        }
      </div>
    </main>
  );
}

export default SuperAdminSignup