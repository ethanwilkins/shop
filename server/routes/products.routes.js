const express = require("express");
const router = new express.Router();

const Product = require("../models/product.model");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

router.post("/stripe/charge", async (req, res) => {
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
});

router.get("/", async (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", async (req, res) => {
  const description = req.body.description;
  const name = req.body.name;

  const newProduct = new Product({
    description,
    name,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", async (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/:id", async (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/update/:id", async (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.name = req.body.name;
      product.description = req.body.description;

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
