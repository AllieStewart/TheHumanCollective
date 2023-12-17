// Start of JS file
// Model, Auth, Query, and Mutation definitions here.
const typeDefs = `
  # Model type definitions
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]!
  }

  # Log/Comment?

  # Authentication
  type Auth {
    token: ID!
    user: User
  }

  # Combined Query type
  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
  }

  # Mutation type
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
// End of JS file