import React from "react";
import styles from "./Home.module.scss";

function ConditionGeneral() {
  return (
    <main className={styles.homeMain}>
      <div className={styles.bodyPrivacy}>
        <h1><strong>Conditions Générales</strong></h1>
        <p className={styles.introConditions}>Les présentes conditions générales régissent l'utilisation de ce site StarBlog.<br>
        </br>
        Ce site appartient et est géré par 3 étudiants de la WildCodeSchool.<br></br>
        En utilisant ce site, vous indiquez que vous avez lu et compris les conditions d'utilisation et que vous acceptez de les respecter en tout temps.
        </p>
        <h2><strong>Propriété intellectuelle</strong></h2>
        <p>Tout contenu publié et mis à disposition sur ce site est la propriété des créateurs de StarBlog. Cela comprend, mais n'est pas limité aux images,textes,logos,documents,fichiers téléchargeables et tout ce qui contribue à la composition de ce site.</p>
        <h2>Contributions d'utilisateur</h2>
        <p>Les utilisateurs peuvent publier les informations suivantes sur notre site:
            <ul>
                <li>Photos</li>
                <li>Texte</li>
                <li>Commentaires</li>
            </ul>
            En affichant publiquement sur notre site, vous acceptez de ne pas agir illégalement ou violer les conditions d'utilisation acceptable énumérées dans ce document.
        </p>
        <h2><strong>Comptes</strong></h2>
        <p>Lorsque vous créez un compte sur notre site, vous acceptez ce qui suit:</p>
        <ul>
            <li>Que vous êtes seul responsable de votre compte et de la sécurité et la confidentialité de votre compte, y compris les mots de passe ouu les renseignements de nature délicate joints à ce compte.</li>
            <li>Que tous les renseignements personnels que vous nous fournissez par l'entremise de votre compte sont à jour, exacts et véridiques et vous mettrez à jour vos renseignements personnels s'ils changent</li>
        </ul>
        <p>Nous nous réservons le droit de suspendre ou de résilier votre compte si vous utilisez notre site illégalement ou si vous violez les conditions générales d'utilisation acceptable.</p>
        <h2><strong>Indemnité</strong></h2>
        <p>En tant qu'utilisateur, vous indemnisez par les présentes les créateur du site Starblog de toute responsabilité, de tout coût, de toute cause d'action, de tout dommage ou de toute dépense découlant de votre utilisation de ce site ou de votre violation de l'une des disposition énoncées dans le présent document.</p>
        <h2><strong>Lois applicable</strong></h2>
        <p>Ce document est soumis aux lois applicables en France et vise à se conformer à ses règles et règlements nécessaires. Cela inclut la réglementation à l'"échelle de l'UE énoncée dans le RGPD</p>
        <h2><strong>Divisibilité</strong></h2>
        <p>Si, à tout moment, l'une des dispositions énoncées dans le présent document est jugée incompatible ou invalide en vertu des lois applicable, ces dispositions seront considérée comme nulles et seront retirées du présent document. Toutes les autres dispositions ne seront pas touchées par les lois et le reste du document sera toujours considérée comme valide.</p>
        <h2><strong>Modifications</strong></h2>
        <p>Ces conditions générales peuvents êtres modifiées de temsp à autre afin de maintenir le respect de la loi et de refléter tout changement à la façon dont nous gérons notre site et la façon dont nous nous attendons à ce que les utilisateurs se comportent sur notre site. Nous recommandons à nos utilisateurs de vérifier ces conditions générales de temps à autre pour assurer qu'ils sont informés de toutes mise à jour. Au besoin, nous informeron les utilisateurs par courriel des changements apportés à ces conditions ou nous afficherons un avis sur notre site.</p>
      </div>
    </main>
  );
}

export default ConditionGeneral;
