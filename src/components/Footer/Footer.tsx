import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footermain}>
      <div className={styles.logoImageBox}>
        <Link className={styles.linklogo} to={"/"}>
          <img className={styles.logo} src="/whiteLogo.png" alt="" />
        </Link>
      </div>
      <div className={styles.containerLink}>
        <Link className={styles.linknav} to={"/condition"}>
          Conditions Générales
        </Link>
        <Link className={styles.linknav} to={"/mentions"}>
          Mentions légales
        </Link>
        <Link className={styles.linknav} to={"/privacy"}>
          Politique de confidentialité
        </Link>
      </div>
      <p className={styles.copyright}>Copyright © 2023 StarBlog, Inc.</p>
    </footer>
  );
}

export default Footer;
