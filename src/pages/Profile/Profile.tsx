import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import { UPDATE_USER } from "../../graphql/mutations";
import { GET_LOGGED_USER } from "../../graphql/queries";

import styles from "./Profile.module.scss";

function Profile() {
  const [pseudo, setPseudo] = useState("");
  const { loading, data } = useQuery(GET_LOGGED_USER);
  const [doUpdateUserMutation] = useMutation(UPDATE_USER);
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  async function doUpdtateUser(e: any) {
    e.preventDefault();
    try {
      await doUpdateUserMutation({
        variables: {
          pseudo,
        },
      });
    } catch { }
  }

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };


  useEffect(() => {
    if (data?.loggedUser?.pseudo) {
      setPseudo(data.loggedUser.pseudo);
    }
  }, [data]);


  return (
    <div className={styles.main}>
      <h1>Mon compte</h1>

      <form onSubmit={(e) => doUpdtateUser(e)} className={styles.form}>
        <div className={styles.globalContainer}>
          <div className={styles.boxForm}>
            <div className={styles.infoBox}>
              <label>Email</label>
              <p>{data?.loggedUser.email}</p>
            </div>
            {/* <div className={styles.editBox}>
            <button className="btn btn-secondary">Editer</button>
            </div> */}
          </div>

          <div className={styles.boxForm}>
            <div className={styles.infoBox}>
              <label className={styles.pseudoLabel}>Pseudonyme</label>
              <input className={`${isEditable ? '' : styles.editableDisable}`}
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder={data?.loggedUser.pseudo}
                disabled={!isEditable}
              />
            </div>
            <div className={styles.editBox}>
              <button className="btn btn-outline-secondary" onClick={toggleEdit}>{isEditable ? 'Valider' : 'Editer'}</button>
            </div>
          </div>

        </div>
        <div className={styles.buttonBox}>
          <button disabled={loading} className={styles.button}>
            <div>Sauvegarder</div>
          </button>
        </div>
      </form>
      <div>
        <h1>Mes blogs</h1>
        <section className={styles.container}>
          {loading === true && "Chargement..."}
          {data?.loggedUser.blogs.map((blog: any) => {
            return (
              <Card
                title={blog.name}
                description={blog.description}
                image="futur lien image"
                updated_at={blog.updated_at}
                onClick={() => {
                  navigate(`/blog/${blog.id}`);
                }}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Profile;
