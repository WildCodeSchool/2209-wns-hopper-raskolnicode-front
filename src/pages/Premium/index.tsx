import {
  Elements,
} from "@stripe/react-stripe-js";
import styles from "./Premium.module.scss";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";

export function Premium() {
  const stripePromise = loadStripe(
    "pk_test_51NBaCOCySemsTPW1ZI3EU69Uvb65QY51AiOB7Xlr5Fyd9jTD4Ng6zNwZ42Qfe3LlsXbDBF1AUo6yP5EFGGKoiEpS00PRoPdut6"
  );

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
      <Elements
        stripe={stripePromise}
        options={options as StripeElementsOptions}
      >
        <CheckoutForm />
      </Elements>
    </section>
  );
}
