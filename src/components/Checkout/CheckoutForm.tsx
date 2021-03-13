import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import baseUrl from "../../utils/baseUrl";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      alert(`Stripe 23 | token generated! ${JSON.stringify(paymentMethod)}`);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`${baseUrl}/api/stripe/charge`, {
          amount: 999,
          id: id,
        });
        alert(`Stripe 35 | data ${response.data.success}`);
        if (response.data.success) {
          alert("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        alert(`CheckoutForm.js 28 | ${JSON.stringify(error)}`);
      }
    } else {
      alert(JSON.stringify(error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};

export default CheckoutForm;
