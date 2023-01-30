import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

function Navbar(props: { onTokenChange: () => void }) {
  const user = useContext(UserContext);

  return (
    <nav className={styles.navbarmain}>
        <Link className={styles.linklogo} to={'/'}><img className={styles.logo} src="./logo.png" alt="" /></Link>
        
        <div className={styles.link}>
          {
            user ?
            <Link className={styles.linknav} to={''} onClick={() => props.onTokenChange()}>Déconnexion</Link>
            :
            <>
            <Link className={styles.linknav} to={'/signup'}>Inscription</Link>
            <Link className={styles.linknav} to={'/login'}>Connexion</Link>
            </>
          }

        </div>
    </nav>

  );
}

export default Navbar;
