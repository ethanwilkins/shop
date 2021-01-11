import Product from "../../../models/product.model";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};
