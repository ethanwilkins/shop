import gql from "graphql-tag";

export const USER = gql`
  query($name: String!) {
    user(name: $name) {
      _id
      name
      email
      createdAt
    }
  }
`;

export const USERS = gql`
  {
    allUsers {
      _id
      name
      email
      createdAt
    }
  }
`;

export const IMAGES = gql`
  {
    allImages {
      _id
      userId
      path
    }
  }
`;

export const PRODUCTS = gql`
  {
    allProducts {
      _id
      name
      description
    }
  }
`;
