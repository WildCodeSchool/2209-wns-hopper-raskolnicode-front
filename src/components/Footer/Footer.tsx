import styles from './Footer.module.scss'
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer className={styles.footermain}>
      <div className={styles.logoImageBox}>
        <Link className={styles.linklogo} to={'/'}><img className={styles.logo} src="./whiteLogo.png" alt="" /></Link>
      </div>
        <div className={styles.containerLink}>
        <p className={styles.copyright}>Copyright © 2023 StarBlog, Inc.</p>
        <Link className={styles.linknav} to={'/mentions'}>Mentions légale</Link>
        <Link className={styles.linknav} to={'/politique'}>Politique de confidentialité</Link>
        </div>
    </footer>
  );
}

export default Footer;
