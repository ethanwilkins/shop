const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

// Sends a charge to stripe account
export default async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);

  const { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });

    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);

    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
};
