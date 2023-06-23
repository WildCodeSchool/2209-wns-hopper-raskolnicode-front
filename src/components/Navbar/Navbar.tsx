import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { AlertInfo } from "../../interfaces";

function Navbar(props: {
  onTokenChange: () => void;
  handleAlert: (alertObj: AlertInfo) => void;
}) {
  const user = useContext(UserContext);

  return (
    <nav className={styles.navbarmain}>
      <Link className={styles.linklogo} to={"/"}>
        <img className={styles.logo} src="/logo.png" alt="logo starBlog" />
      </Link>

      <div className={styles.link}>
        {user ? (
          <div className={styles.linknav_box}>
            <Link
              className={styles.linknav}
              to={""}
              onClick={() => {
                props.onTokenChange();
                props.handleAlert({
                  message: "Vous êtes déconnecté(e)",
                  variant: "warning",
                });
              }}
            >
              Déconnexion
            </Link>
            <Link className={styles.linknav} to={"/profile"}>
              Mon profil
            </Link>
          </div>
        ) : (
          <>
            <Link className={styles.linknav} to={"/signup"}>
              Inscription
            </Link>
            <Link className={styles.linknav} to={"/login"}>
              Connexion
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
