export default `

type Image {
  _id: ID!
  userId: String!
  productId: String
  path: String!
  createdAt: String!
}

type ImagePayload {
  image: Image!
}

`;
