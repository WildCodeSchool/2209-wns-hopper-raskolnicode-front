import React from "react";
import styles from "./Home.module.scss";

function Mentions() {
  return (
    <main className={styles.homeMain}>
      <div className={styles.bodyPrivacy}>
        <h1><strong>Mentions légale</strong></h1>
        <p className={styles.introConditions}>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique,<br /> dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs, ci-après l"Utilisateur", du site starblog , ci-après le "Site", les présentes mentions légales <br />
        La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</p>
        <h2><strong>Article 1 - L'editeur</strong></h2>
        <p>L’édition et la direction de la publication du Site est assurée par raskol, domiciliée 3 rue du charme, dont le numéro de téléphone est 0774747474, et l'adresse e-mail ras@gmail.com</p>
        <h2><strong>Article 2 - L'hebergeur</strong></h2>
        <p>L'hébergeur du Site est la société raskolHeberg, dont le siège social est situé au 23 rue gourmand , avec le numéro de téléphone : 0247656565 + adresse mail de contact</p>
        <h2><strong>Article 3 - Accès au site</strong></h2>
        <p>Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, interruption programmée ou non et pouvant découlant d’une nécessité de maintenance.</p>
        <p>En cas de modification, interruption ou suspension du Site, l'Editeur ne saurait être tenu responsable.</p>
        <h2><strong>Article 4 - Collecte des données</strong></h2>
        <p>Le Site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés. </p>
        <p>En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :
        ·via son espace personnel ;</p>
        <p>Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site﻿, sans autorisation de l’Editeur est prohibée et pourra entraînée des actions et poursuites judiciaires telles que notamment prévues par le Code de la propriété intellectuelle et le Code civil.</p>
        <p>Pour plus d’informations, se reporter aux CGU du site starblog accessible à la rubrique "CGU" </p>
      </div>
    </main>
  );
}

export default Mentions;
