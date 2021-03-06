import prisma from "../../utils/initPrisma";

const productResolvers = {
  Query: {
    allProducts: async () => {
      try {
        const products = await prisma.product.findMany();
        return products;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default productResolvers;
