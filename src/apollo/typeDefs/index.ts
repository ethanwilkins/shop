import { gql } from "apollo-server-micro";
import User from "./user";
import Image from "./image";
import Product from "./product";

export const typeDefs = gql`
  scalar FileUpload

  ${User}
  ${Image}
  ${Product}

  type Query {
    user(name: String!): User!
    allUsers: [User]
    allImages: [Image]
    allProducts: [Product]
  }

  type Mutation {
    signUp(input: SignUpInput!): UserPayload!
    signIn(input: SignInInput!): UserPayload!
    updateUser(id: ID!, input: UpdateUserInput!): UserPayload!
    deleteUser(id: ID!): Boolean!
    deleteImage(id: ID!): Boolean!
    uploadImage(image: FileUpload!, userId: ID!): ImagePayload!
  }
`;
