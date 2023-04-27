import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UPDATE_USER } from "../../graphql/mutations";
import { GET_LOGGED_USER } from "../../graphql/queries";
import BlogCard from "../../components/profilPage/BlogCard/BlogCard";

import styles from "./Profile.module.scss";

function Profile() {
  const [pseudo, setPseudo] = useState("");
  const { loading, data } = useQuery(GET_LOGGED_USER);
  const [doUpdateUserMutation] = useMutation(UPDATE_USER);
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });

  async function doUpdtateUser(e: any) {
    e.preventDefault();
    try {
      await doUpdateUserMutation({
        variables: {
          pseudo,
        },
      });
      
      
      setAlert({ message: 'Informations mises à jour !', type: 'success' });
      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 3000);
      // window.location.reload();
    }

    catch {
      setAlert({ message: 'Une erreur est apparue', type: 'error' });
      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 3000);

    }
  }

  // async function doUpdateBlog(e: any) {
  //   e.preventDefault();
  //   try {
  //     await doUpdateUserMutation({
  //       variables: {
  //         pseudo,
  //       },
  //     });
  //     setAlert({ message: 'Informations mises à jour !', type: 'success' });
  //     // window.location.reload();

  //   }

  //   catch {
  //     setAlert({ message: 'Une erreur est apparue', type: 'error' });

  //   }
  // }



  const toggleEdit = (event: any) => {
    event.preventDefault();
    setIsEditable(!isEditable);
  };


  useEffect(() => {
    if (data?.loggedUser?.pseudo) {
      setPseudo(data.loggedUser.pseudo);
    }
  }, [data]);


  return (
    <div className={styles.main}>

      <section className={styles.accountSection}>
        <h1>Mon compte</h1>

        {
          alert.message && (
            <div className={`alert ${alert.type === 'success' ? styles.alertSuccess : styles.alertDanger}  ${styles.alert}`} role="alert">
              {alert.message}
            </div>
          )
        }

        <form onSubmit={(e) => doUpdtateUser(e)} className={styles.form}>
          <div className={styles.globalContainer}>
            <div className={styles.boxForm}>
              <div className={styles.infoBox}>
                <label>Email</label>
                <p>{data?.loggedUser.email}</p>
              </div>
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
      </section>



      <div>


        <section className={styles.blogSection}>

          <h1>Mes blogs</h1>
          <div className={styles.blogContainer}>
            {loading === true && "Chargement..."}
            {data?.loggedUser.blogs.map((blog: any) => {
              return (
                <div>
                  <BlogCard
                    title={blog.name}
                    description={blog.description}
                    updated_at={blog.updated_at}
                    onClick={() => {
                      navigate(`/blog/${blog.id}`);
                    }}
                  />
                </div>
              );
            })}
          </div>

        </section>

      </div>
    </div>

  );
}

export default Profile;
