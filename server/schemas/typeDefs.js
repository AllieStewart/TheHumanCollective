// Start of JS file
// Model, Auth, Query, and Mutation definitions here.
const typeDefs = `
  # Model type definitions
  type User {
    _id: ID
    username: String
    email: String
    password: String
    logs: [Log]!
  }

  type Log {
    _id: ID
    logText: String
    logAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  # Authentication
  type Auth {
    token: ID!
    user: User
  }

  # Combined Query type
  type Query {
    users: [User]
    user(username: String!): User
    logs(username: String): [Log]
    log(logId: ID!): Log
    me: User
  }

  # Mutation type
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLog(postText: String!): Log
    addComment(postId: ID!, commentText: String!): Log
    removeLog(postId: ID!): Log
    removeComment(postId: ID!, commentId: ID!): Log
  }
`;

module.exports = typeDefs;
// End of JS file