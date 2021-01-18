import userResolvers from "./user";
import imageResolvers from "./image";
import productResolvers from "./product";
import connectDb from "../../utils/connectDb";

connectDb();

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...imageResolvers.Query,
    ...productResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...imageResolvers.Mutation,
  },
};
