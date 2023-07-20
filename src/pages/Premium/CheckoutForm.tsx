import { useMutation, useQuery } from "@apollo/client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { GET_STRIPE_CLIENT_SECRET } from "../../graphql/queries";
import { BECOME_PREMIUM } from "../../graphql/mutations";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function getBaseUrl(url: string) {
  let baseUrl = url.replace(/^https?:\/\//, "");

  const slashIndex = baseUrl.indexOf("/");

  if (slashIndex !== -1) {
    baseUrl = baseUrl.substring(0, slashIndex);
  }

  const protocol = url.startsWith("https") ? "https://" : "http://";

  return protocol + baseUrl;
}

export function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const location = getBaseUrl(window.location.href);

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const [clientSecret, setClientSecret] = useState();

  const { data, refetch } = useQuery(GET_STRIPE_CLIENT_SECRET);

  useEffect(() => {
    if (data && !clientSecret) {
      setClientSecret(data.createPaymentIntent.clientSecret);
    }
  }, [data]);


  useEffect(() => {
  }, [clientSecret]);


  useEffect(() => {
    if (errorMessage) {
      refetch();
    }
  }, [errorMessage]);

  const user = useContext(UserContext);
  const [becomePremium] = useMutation(BECOME_PREMIUM);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }


    console.log("stripe ", stripe); 
    console.log("client secret ", clientSecret); 

    if (stripe && clientSecret) {
      const { paymentIntent, error } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        clientSecret,
        confirmParams: {
          return_url: location + "/merci-pour-votre-paiement",
        },
        redirect: "if_required",
      });

      
      if (error) {
        setErrorMessage(error.message);
      } else {
        if (user) {
          const userId = user.id.toString();
          try {
            await becomePremium({
              variables: {
                userId: parseFloat(userId),
                paymentIntent: JSON.stringify(paymentIntent),
              },
            });
            navigate("/merci-pour-votre-paiement");
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else {
      setErrorMessage("Stripe n'est pas initialisé");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <PaymentElement />
      <button className="btn btn-info mt-3" type="submit" disabled={!stripe || !elements}>
        Démarrer mon abonnement
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </form>
  );
}
