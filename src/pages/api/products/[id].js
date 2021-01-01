import Product from "../../../models/product.model";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PATCH":
      await handlePatchRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
  }
};

// Get product by id
const handleGetRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    const product = await Product.findById(id);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

// Create new product
const handlePostRequest = async (req, res) => {
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
};

// Update product
const handlePatchRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  Product.findById(id)
    .then((product) => {
      product.name = req.body.name;
      product.description = req.body.description;

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// Delete product
const handleDeleteRequest = async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    await Product.deleteOne({ _id: id }).exec();
    res.status(200).json({ message: "Successfully deleted product." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
