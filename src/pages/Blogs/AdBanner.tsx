import React from 'react'
import styles from "./Blog.module.scss";
import { Link } from 'react-router-dom';

const AdBanner = () => {
  return (
    <div className={styles.ad_banner}>
      <p>Ce blog est propulsé par <Link to={'/'}><b>Starblog</b></Link></p>
    </div>
  )
}

export default AdBanner