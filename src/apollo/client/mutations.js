import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUpMutation(
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    signUp(
      input: {
        name: $name
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserMutation($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, input: { name: $name, email: $email }) {
      user {
        _id
        name
        email
      }
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUserMutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImageMutation($image: FileUpload!, $userId: ID!) {
    uploadImage(image: $image, userId: $userId) {
      image {
        _id
        path
      }
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation DeleteImageMutation($id: ID!) {
    deleteImage(id: $id)
  }
`;
