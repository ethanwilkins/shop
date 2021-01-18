export default `

type User {
  _id: ID!
  name: String!
  email: String!
  password: String!
  createdAt: String!
}

input SignUpInput {
  name: String!
  email: String!
  password: String!
  passwordConfirm: String!
}

input SignInInput {
  email: String!
  password: String!
}

input UpdateUserInput {
  name: String!
  email: String!
}

type UserPayload {
  user: User!
  token: String!
}

`;
