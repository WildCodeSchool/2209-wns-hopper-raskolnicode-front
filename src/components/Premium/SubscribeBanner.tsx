import { Link } from "react-router-dom";
import styles from "./Banner.module.scss";


export function SubscribeBanner () {
  return <div className={styles.banner}>
      <p className="mb-0 fw-bold">Obtiens un compte premium <Link to={'/devenir-premium'} className="text-warning">dès maintenant</Link></p>
  </div>
}