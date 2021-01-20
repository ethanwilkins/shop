import gql from "graphql-tag";

export const USER = gql`
  query($name: String!) {
    user(name: $name) {
      id
      name
      email
      createdAt
    }
  }
`;

export const USERS = gql`
  {
    allUsers {
      id
      name
      email
      createdAt
    }
  }
`;

export const IMAGES = gql`
  {
    allImages {
      id
      userId
      path
    }
  }
`;

export const PRODUCTS = gql`
  {
    allProducts {
      id
      name
      description
    }
  }
`;
