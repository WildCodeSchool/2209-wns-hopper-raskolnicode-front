import styles from './Footer.module.scss'
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer className={styles.footermain}>
        <Link className={styles.linklogo} to={'/'}><img className={styles.logo} src="./whiteLogo.png" alt="" /></Link>
        <p>Copyright © 2023 StarBlog, Inc.</p>

        <div className={styles.containerLink}>
        <Link className={styles.linknav} to={'/mentions'}>Mentions légale</Link>
        <Link className={styles.linknav} to={'/politique'}>Politique de confidentialité</Link>
        </div>
    </footer>
  );
}

export default Footer;
