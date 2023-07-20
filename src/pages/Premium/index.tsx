import {
  Elements,
} from "@stripe/react-stripe-js";
import styles from "./Premium.module.scss";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { useQuery } from "@apollo/client";
import { GET_STRIPE_PUBLIC_KEY } from "../../graphql/queries";
import { useEffect, useState } from "react";

export function Premium() {

  const { data } = useQuery(GET_STRIPE_PUBLIC_KEY)
  const [publicKey, setPublicKey] = useState()

  useEffect(() => {
    if (data) {
      // console.log(data)
      setPublicKey(data.getStripePublicKey.publicKey)
    }
  }, [data])

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "eur",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  return (
    <section className={styles.premium}>
      <h1 className="px-5">Deviens premium en une seule et simple étape</h1>
      <h3>Change ton expérience Sarblog avec un paiement unique de 29,90€</h3>
      {
        publicKey &&  <Elements
          stripe={loadStripe(publicKey)}
          options={options as StripeElementsOptions}
        >
          <CheckoutForm />
        </Elements>
      }

    </section>
  );
}
