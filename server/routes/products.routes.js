const express = require("express");
let Product = require("../models/product.model");

const router = new express.Router();

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
