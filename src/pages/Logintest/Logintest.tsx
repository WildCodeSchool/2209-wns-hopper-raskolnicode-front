import FormSign from "../../components/FormSign/FormSign";
// import { ISign } from "../../interfaces";
// import styles from "./../../components/FormSign/formSign.module.scss"


import React from 'react'

export default function Logintest() {




  
  return (
        <>
            <FormSign 
            title="Login"  
            alternativeOption="Vous avez oublié votre mot de passe ?" 
            signAction="Se connecter"
            onSign={() => {}}
             />
        </>

  )
}
