import Product from "../../models/product.model";

const productResolvers = {
  Query: {
    allProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default productResolvers;
