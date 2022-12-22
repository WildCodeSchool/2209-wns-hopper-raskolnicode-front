import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss'
function Navbar() {


  return (
    <main className={styles.navbarmain}>
        <Link className={styles.linklogo} to={'/'}><img className={styles.logo} src="./logo.png" alt="" /></Link>
        
        <div className={styles.link}>
        <Link className={styles.linknav} to={'/signup'}>Inscription</Link>
        <Link className={styles.linknav} to={'/login'}>Connection</Link>
        </div>
        
    </main>
  );
}

export default Navbar;