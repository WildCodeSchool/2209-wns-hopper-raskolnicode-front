import { Link } from "react-router-dom";
import styles from "./notFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.main404}>
      <h2>Oops! Vous avez l'air perdu</h2>
      <Link to="/">Accueil</Link> <br />
      <Link to="/blogs">Blogs</Link> <br />
      <Link to="/signin">Connexion</Link> <br />
    </div>
  );
}
