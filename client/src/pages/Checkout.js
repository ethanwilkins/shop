import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/Checkout/CheckoutForm";

const stripeTestPromise = loadStripe(
  process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY
);

const Checkout = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
